# Carvan - E-commerce Headless (Medusa v2 + Next.js 15)

Proyecto base de e-commerce **headless** totalmente dockerizado para desarrollo local.

- **Storefront (frontend)**: Next.js 15.2.0 + React 19
- **Backend / motor comercial**: Medusa.js v2 (2.19.0)
- **Base de datos**: PostgreSQL 16.4-alpine
- **Cache / colas**: Redis 7.4-alpine

Todo corre con **Docker Compose**. Una vez levantado, **no necesitas comandos para usarlo**: los 4 servicios se auto-arrancan con Docker Engine (`restart: unless-stopped`).

> **Nota de seguridad**: `next@15.2.0` está **deprecado** en el registro pnpm por la **CVE-2025-66478**. La versión más estable de la rama 15 sería `15.5.25`. Está fijado a `15.2.0` por requisito del proyecto; se recomienda subirlo cuando sea posible.

---

## Índice

1. [Arquitectura y estructura](#arquitectura-y-estructura)
2. [Stack y versiones](#stack-y-version-fijada)
3. [Requisitos previos](#requisitos-previos)
4. [Montar el proyecto paso a paso](#montar-el-proyecto-paso-a-paso)
5. [Primer arranque (migraciones + seed)](#primer-arranque-migraciones--seed)
6. [Uso diario](#uso-diario)
7. [Accesos: URLs y credenciales](#accesos-urls-y-credenciales)
8. [Personalizar el proyecto](#personalizar-el-proyecto)
9. [Solución de problemas](#solucion-de-problemas)
10. [Configuración de los ficheros sensibles](#configuracion-de-los-ficheros-sensibles)

---

## Arquitectura y estructura

```
carvan/
├── docker-compose.yml       # Orquesta: postgres, redis, server, client
├── .env                     # Credenciales de PostgreSQL (usa Compose)
├── .gitignore
├── README.md
│
├── server/                  # Backend - Medusa.js v2
│   ├── Dockerfile           #   imagen de desarrollo (node:22-alpine)
│   ├── medusa-config.ts     #   configuración (DB, SSL, admin Vite alias)
│   ├── .env                 #   variables de entorno del backend
│   ├── package.json
│   ├── pnpm-workspace.yaml
│   └── src/
│       ├── admin/i18n/      # traducciones del panel admin
│       ├── modules/         # módulos de negocio personalizados
│       └── migration-scripts/initial-data-seed.ts   # datos de arranque
│
└── client/                  # Storefront - Next.js 15
    ├── Dockerfile           #   imagen de desarrollo (node:22-alpine)
    ├── .env.local           #   variables del storefront
    ├── package.json
    ├── pnpm-workspace.yaml
    └── src/
        ├── app/             # páginas (rutas App Router)
        ├── lib/data/        # Server Actions (llaman a Medusa)
        ├── modules/         # componentes (ui, product, cart, checkout...)
        ├── styles/
        └── types/
```

### Cómo se conectan los servicios

```
        browser
          |
  8000 ---| (http://localhost:8000)
   carvan-client  (Next.js 15, puerto interno 8000)
          |  Server Actions - usa la publishable key
          v  URL: http://server:9000
   carvan-server  (Medusa v2 API + Admin, puerto 9000)
          |
          |----> postgres:5432   (DATABASE_URL)
          |----> redis:6379      (REDIS_URL)
```

Dentro de la red Docker de Compose, los servicios se referencian por su **nombre de servicio** (`postgres`, `redis`, `server`), no por `localhost`. Todo el tráfico hacia el navegador se expone por los puertos del host (`8000` y `9000`).

---

## Stack y versión fijada

Sin etiquetas `latest`. Versiones **pineadas** exactas:

| Componente | Imagen / Paquete | Versión |
|---|---|---|
| PostgreSQL | `postgres` | `16.4-alpine` |
| Redis | `redis` | `7.4-alpine` |
| Medusa core | `@medusajs/medusa`, `@medusajs/framework`, `@medusajs/cli`, etc. | `2.19.0` |
| Next.js | `next` | `15.2.0` |
| React / React DOM | `react`, `react-dom` | `19.0.0` |
| pnpm | (manejador de paquetes) | `11.21.0` |
| Node (en imagen) | `node` | `22-alpine` |

Los `Dockerfile` usan `pnpm install --frozen-lockfile` con `pnpm-lock.yaml` fijado, por lo que **la instalación es reproducible** en cualquier máquina.

---

## Requisitos previos

Antes de montar el proyecto, la máquina debe tener:

1. **Docker Desktop** (Windows/Mac) o **Docker Engine + Docker Compose** (Linux)
   - Verifica: `docker --version` y `docker compose version`.
   - En Windows, asegúrate de que Docker Desktop **esté corriendo** (motor arrancado al iniciar sesión).
2. **Git** (para clonar el repo).
3. *(Opcional)* **Node.js 20+ y pnpm 11** - solo si vas a ejecutar comandos de Medusa/Next fuera de los contenedores.

> No hace falta instalar PostgreSQL, Redis ni Node manualmente: viven dentro de Docker.

---

## Montar el proyecto paso a paso

### 1. Clonar el repositorio

**Aclaración importante sobre el nombre de la carpeta**: `git clone` crea la carpeta con el **nombre del repositorio** (`ecommerce`) por defecto. Para que la carpeta local se llame `carvan` (y coincida con el resto de este documento y con `docker-compose.yml`), añade `carvan` como último argumento:

```bash
git clone https://github.com/daniel-miranda2003/ecommerce.git carvan
cd carvan
```

> Si prefieres que la carpeta se llame `ecommerce`, omite el último argumento:
>
> ```bash
> git clone https://github.com/daniel-miranda2003/ecommerce.git
> cd ecommerce
> ```
>
> En ese caso, sustituye mentalmente `carvan` por `ecommerce` en los comandos y rutas de este documento (las rutas `carvan/server/...` pasan a ser `ecommerce/server/...`). El `docker-compose.yml` es agnóstico del nombre de la carpeta, así que el proyecto funciona igual en ambos casos.

### 2. Crear los ficheros de entorno

El repositorio **no contiene** los `.env` (están en `.gitignore`). Cada fichero tiene su plantilla `.env.example` lista. Crea cada uno desde los ejemplos:

**a) Raíz - credenciales de PostgreSQL (usa Compose):**

```bash
# desde la raíz del proyecto
Copy-Item .env.example .env        # Windows (PowerShell)
# cp .env.example .env             # Linux / Mac
```

Contenido: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` (por defecto `medusa` / `medusa_password` / `medusa`).

**b) Backend - `carvan/server/.env`:**

```bash
# desde carvan/server
Copy-Item .env.example .env
```

Contiene los secretos, CORS y las URL de conexión con nombres de servicio de Compose:

```bash
NODE_ENV=development
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:9000
AUTH_CORS=http://localhost:9000
JWT_SECRET=una_clave_jwt_larga_y_secreta
COOKIE_SECRET=otra_clave_secreta
AUTH_MFA_ENCRYPTION_KEY=clave_mfa_de_32_caracteres_justa!!
DATABASE_URL=postgres://medusa:medusa_password@postgres:5432/medusa
REDIS_URL=redis://redis:6379
```

> **Solo para desarrollo local.** Cambia `JWT_SECRET`, `COOKIE_SECRET`, `AUTH_MFA_ENCRYPTION_KEY` y las contraseñas en producción.

**c) Storefront - `carvan/client/.env.local`:**

```bash
# desde carvan/client
Copy-Item .env.example .env.local
```

> El campo `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` es la **API key pública** que genera el seed. Se rellena en el paso 4.

### 3. Construir las imágenes

```bash
docker compose build
```

Esto compila las imágenes `carvan-server` y `carvan-client` (instala dependencias con el lockfile fijado). Solo hay que hacerlo **la primera vez** (o cuando cambie `package.json` o `pnpm-lock.yaml`).

### 4. Levantar las bases de datos y migrar + sembrar

Primero arranca Postgres y Redis, y espera a que estén sanos:

```bash
docker compose up -d postgres redis
docker compose ps          # espera a que postgres/redis esten "healthy"
```

Ahora ejecuta las **migraciones y el seed** del backend (el seed crea la tienda, regiones, categorías, productos y la API key):

```bash
docker compose run --rm server pnpm exec medusa db:migrate
```

Al terminar, obtén la **publishable key** generada y ponla en `client/.env.local`:

```bash
docker exec carvan-postgres sh -lc "PGPASSWORD=medusa_password psql -U medusa -h localhost -d medusa -c \"SELECT token FROM api_key WHERE type='publishable' AND deleted_at IS NULL;\""
```

Copia el valor `pk_...` y pégalo como `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=...` en `client/.env.local`.

> Como Compose lee `env_file` **en la creación del contenedor**, guarda el fichero ANTES de crear el contenedor del client (o fuerza recreación con `docker compose up -d --force-recreate client`).

### 5. Levantar el stack completo

```bash
docker compose up -d
docker compose ps
```

Cuando los 4 servicios estén arriba, comprueba:

| Servicio | URL |
|---|---|
| Tienda (storefront) | http://localhost:8000 |
| Admin Medusa | http://localhost:9000/app |
| API / health | http://localhost:9000/health |

La primera carga del storefront y del admin puede tardar unos segundos (compilan en caliente). Recarga si ves página en blanco.

---

## Primer arranque (migraciones + seed)

El comando `medusa db:migrate` hace **dos cosas**:

1. Aplica **todas las migraciones** de los módulos de Medusa (crea las tablas).
2. Ejecuta los **script de migración de datos** de `server/src/migration-scripts/`, incluido `initial-data-seed.ts`, que siembra: store, regiones, zonas fiscales, stock location, fulfillment, categorías (Shirts/Sweatshirts/Pants/Merch), productos e inventario.

Es **idempotente**: si ya se ejecutó, al volver a correrlo no duplica nada (las migraciones quedan registradas en la tabla `mikro_orm_migrations`).

---

## Uso diario

### Arrancar / parar

```bash
docker compose up -d            # levantar todo (en segundo plano)
docker compose down             # parar todo (sin borrar datos)
docker compose down -v          # parar Y borrar los volumenes de datos (pierdes la base)
```

Cuando el PC se **reinicia**, el stack se levanta solo con Docker Engine gracias a `restart: unless-stopped`. Solo espera 10-20 s y recarga el navegador.

### Rebuild tras cambios de dependencias

```bash
docker compose build
docker compose up -d --force-recreate
```

### Logs

```bash
docker compose logs -f server       # sigue los logs del backend
docker compose logs -f client       # sigue los logs del storefront
docker compose logs -f postgres
```

### Consola de un contenedor

```bash
docker exec -it carvan-server sh
docker exec -it carvan-postgres sh -lc "PGPASSWORD=medusa_password psql -U medusa -h localhost -d medusa"
```

### Migraciones nuevas (cuando añadas código)

```bash
docker compose run --rm server pnpm exec medusa db:migrate
```

### Hot reload

El client corre `next dev` (Turbopack) sobre `/app` montado por bind mount: **guardar cualquier fichero recarga en caliente** automáticamente. El server usa `medusa develop` con el mismo comportamiento.

---

## Accesos: URLs y credenciales

| Recurso | URL | Notas |
|---|---|---|
| Storefront | http://localhost:8000 | redirige a `/dk` (región por defecto) |
| Admin Medusa | http://localhost:9000/app | panel de gestión |
| API health | http://localhost:9000/health | devuelve `200` |
| Postgres | `localhost:5432` | user `medusa` / pass `medusa_password` / db `medusa` |
| Redis | `localhost:6379` | sin contraseña (dev) |

**Admin**: en el primer uso, define el usuario administrador (email + contraseña) desde la pantalla de login de `/app`. Esa cuenta se guarda en la base.

**Storefront**: el acceso a la API del store usa la *publishable key* (`NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`) y las Server Actions corren en el servidor Next.

---

## Personalizar el proyecto

Es 100% vuestro código, no un producto cerrado.

### Front (storefront) - `carvan/client`

- Rutas y páginas en `client/src/app/`.
- Componentes (hero, header, footer, tarjetas de producto, carrito...) en `client/src/modules/`.
- Lógica de datos (Server Actions con `"use server"`) en `client/src/lib/data/`.
- Estilos con **Tailwind CSS**.
- Hot reload: guarda y mira el navegador.

### Backend (Medusa) - `carvan/server`

- **Modelos de datos**: crea módulos en `server/src/modules/*` (generan sus propias tablas).
- **Workflows**: procesos de negocio de varios pasos.
- **Subscribers**: reaccionan a eventos (p. ej. `order.placed`).
- **Schedules / jobs**: tareas periódicas.
- **API routes** propias y **hooks** en `medusa-config.ts`.

Los módulos nuevos con migraciones se aplican con:

```bash
docker compose run --rm server pnpm exec medusa db:migrate
```

> Los módulos de **pago, logística y facturación** se dejaron fuera a propósito; se pueden añadir cuando los necesitéis.

---

## Solución de problemas

### 1. El admin de Medusa se queda en **página en blanco** y el log dice

```
Failed to resolve import "/src/admin/i18n/index.ts" from "virtual:medusa/i18n". Does the file exist?
```

Es un **bug conocido** de Medusa v2 en Docker (issue #14828): el plugin de Vite del admin genera rutas absolutas del filesystem (`/app/src/...`) que no resuelve. La solución ya está aplicada en `server/medusa-config.ts`:

```ts
admin: {
  vite: (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '/src': path.resolve(process.cwd(), 'src'),
    }
    return config
  },
}
```

Si vuelve a aparecer, guarda `medusa-config.ts` (el server se recarga) o reinicia: `docker compose restart server`.

### 2. `medusa db:migrate` falla con

```
Could not connect to the database while running migrations. The connection timed out after 10 seconds...
```

Medusa **fuerza SSL** cuando el host de la BD no es `localhost`. Como `postgres` (nombre de servicio) no es localhost, la conexión se queda colgada. La solución ya está en `server/medusa-config.ts`:

```ts
projectConfig: {
  databaseUrl: process.env.DATABASE_URL,
  databaseDriverOptions: {
    connection: { ssl: false },
  },
  ...
}
```

Asegúrate también de que `DATABASE_URL` usa el host `postgres` y que Postgres está `healthy` (`docker compose ps`).

### 3. El storefront no carga (fallo al conectar / port mapping)

El client escucha en el **puerto 8000 interior** (script `next dev -p 8000`), así que el Compose debe mapear `8000:8000` (no `8000:3000`). Si cambiaste el puerto del script, ajusta el `ports` del service `client`.

### 4. El client muestra "Missing required environment variables: NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY"

Compose lee `env_file` **al crear el contenedor**. Si cambias `client/.env.local` después de crearlo, fuerzas la recreación:

```bash
docker compose up -d --force-recreate client
```

### 5. Conexión directa a Postgres como diagnóstico

```bash
docker exec -it carvan-postgres sh -lc "PGPASSWORD=medusa_password psql -U medusa -h localhost -d medusa -c 'SELECT 1;'"
```

---

## Configuración de los ficheros sensibles

| Fichero | Contenido | ¿En git? |
|---|---|---|
| `carvan/.env` | credenciales de Postgres (solo Compose) | No (gitignored) |
| `carvan/server/.env` | secrets del backend | No (gitignored) |
| `carvan/client/.env.local` | publishable key + URLs | No (gitignored) |

Estos ficheros **no se suben** al repositorio. Cada miembro del equipo crea los suyos a partir de los `.env.example` que sí están versionados. Para entornos compartidos/distintos, cambia también los valores por defecto de `docker-compose.yml` (variables `POSTGRES_*`) mediante variables de entorno del shell.

---

### Notas finales del proyecto

- Las credenciales actuales (`medusa`/`medusa_password`) son **solo para desarrollo**.
- La publishable key del storefront es pública por diseño (es la llave del catálogo), no es un secreto.
- Si necesitas un entorno **productivo**, habrá que: versionar `15.5.25` de Next, cambiar secrets, añadir módulos de pago/logística/facturación, y usar build de producción (`medusa start` / `next start`) en vez del modo dev.
