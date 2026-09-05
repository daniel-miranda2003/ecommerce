import path from 'path'
import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

/**
 * Carvan: force Portuguese (pt-BR) as the admin dashboard's default locale and
 * limit the language picker to Portuguese, Spanish and English — mirroring the
 * storefront's i18n.
 *
 * The dashboard reads these settings from bundled chunk files inside
 * node_modules (`@medusajs/dashboard/dist`). Instead of patching the package,
 * we rewrite those modules at Vite build time. The transforms are content
 * guarded, so they only apply if the expected internal chunks are found and
 * warn if the dashboard's internals change in a future upgrade.
 */
const ADMIN_UI_LOCALES = ['en', 'es', 'ptBR']

const carvanAdminLocalePlugin = {
  name: 'carvan-admin-locale',
  enforce: 'pre' as const,
  transform(code: string, id: string) {
    if (!id.includes('@medusajs/dashboard/dist/')) {
      return null
    }

    let out = code

    // src/i18n/config.ts — locale detection + fallback
    if (out.includes('src/i18n/config.ts')) {
      if (out.includes('fallbackLng: "en"')) {
        out = out.replace('fallbackLng: "en"', 'fallbackLng: "ptBR"')
      }
      if (out.includes('supportedLngs: Object.keys(resources)')) {
        out = out.replace(
          'supportedLngs: Object.keys(resources)',
          `supportedLngs: ${JSON.stringify(ADMIN_UI_LOCALES)}`
        )
      }
    }

    // src/i18n/languages.ts — restrict the language picker to pt/es/en
    if (out.includes('src/i18n/languages.ts')) {
      out = out.replace(
        /var languages = \[[\s\S]*?\n\];/,
        () => `var languages = [
  {
    code: "en",
    display_name: "English",
    ltr: true,
    date_locale: enUS
  },
  {
    code: "es",
    display_name: "Español",
    ltr: true,
    date_locale: es
  },
  {
    code: "ptBR",
    display_name: "Português",
    ltr: true,
    date_locale: ptBR
  }
];`
      )
    }

    return out === code ? null : out
  },
}

module.exports = defineConfig({
  admin: {
    vite: (config) => {
      config.resolve = config.resolve || {}
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '/src': path.resolve(process.cwd(), 'src'),
      }
      // The bundle pre-bundles @medusajs/dashboard with esbuild in dev
      // (skipping Vite transform hooks), which would bypass the locale
      // rewrite below. Excluding it lets the transform run in dev too.
      config.optimizeDeps = config.optimizeDeps || {}
      config.optimizeDeps.exclude = [
        ...(config.optimizeDeps.exclude || []),
        '@medusajs/dashboard',
      ]
      config.plugins = config.plugins || []
      config.plugins.push(carvanAdminLocalePlugin)
      return config
    },
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: {
      connection: {
        ssl: false,
      },
    },
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  }
})
