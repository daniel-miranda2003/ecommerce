import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { getT } from "@lib/i18n/server";

const Hero = async () => {
  const t = await getT();

  return (
    <section className="relative min-h-[92svh] w-full overflow-hidden border-b border-line bg-paper">
      {/* Ambient warm light, no flat backgrounds */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[38rem] w-[38rem] rounded-full opacity-[0.04] blur-[120px] bg-[#D9B98C] animate-drift"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-18rem] left-[-8%] h-[42rem] w-[42rem] rounded-full opacity-[0.035] blur-[140px] bg-[#B7C4C2] animate-drift"
        style={{ animationDelay: "-12s" }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 inset-y-8 hidden small:block border border-line"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-line small:block"
      />

      <div className="content-container relative z-10 flex min-h-[92svh] flex-col justify-between py-14 small:py-16">
        <div className="flex items-center justify-between animate-reveal">
          <p className="eyebrow">{t("home.hero.eyebrow")}</p>
          <p className="eyebrow hidden small:block">{t("brand.name")} — N.º 01</p>
        </div>

        <div className="max-w-5xl animate-reveal" style={{ animationDelay: "120ms" }}>
          <h1 className="font-display text-[16vw] leading-[0.92] tracking-[-0.03em] text-ink small:text-[7.5rem]">
            {t("home.hero.title")}
          </h1>
          <p className="mt-8 max-w-md text-lg leading-[1.7] text-ink-muted">
            {t("home.hero.subtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-6 small:flex-row small:items-end small:justify-between animate-reveal" style={{ animationDelay: "240ms" }}>
          <LocalizedClientLink
            href="/store"
            className="btn-press inline-flex h-11 items-center justify-center rounded-[4px] bg-ink px-7 text-sm font-medium tracking-[0.04em] text-white transition-colors duration-200 hover:bg-[#333333]"
            data-testid="hero-shop-link"
          >
            {t("home.hero.cta")}
          </LocalizedClientLink>
          <p className="eyebrow max-w-xs leading-[1.9] small:text-right" data-testid="hero-meta">
            {t("home.hero.meta")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;