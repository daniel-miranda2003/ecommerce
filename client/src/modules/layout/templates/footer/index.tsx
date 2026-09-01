import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import { getT } from "@lib/i18n/server";
import { Text, clx } from "@modules/common/components/ui";

import LocalizedClientLink from "@modules/common/components/localized-client-link";

export default async function Footer() {
  const t = await getT();
  const { collections } = await listCollections({
    fields: "*products",
  });
  const productCategories = await listCategories();

  return (
    <footer className="border-t border-line w-full bg-paper">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-10 xsmall:flex-row items-start justify-between py-24 small:py-28">
          <div className="shrink-0">
            <LocalizedClientLink
              href="/"
              className="masthead text-[22px] leading-none text-ink hover:text-ink-soft transition-colors duration-200"
            >
              {t("brand.name")}
            </LocalizedClientLink>
            <p className="eyebrow mt-4 max-w-[220px] leading-[1.9]">
              FW26 · Nova edição
            </p>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-20 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="eyebrow text-ink">
                  {t("footer.categories")}
                </span>
                <ul
                  className="grid grid-cols-1 gap-2.5"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return;
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li
                        className="flex flex-col gap-2 text-ink-muted text-[13px]"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ink transition-colors duration-200",
                            children && "font-medium text-ink-soft"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ink transition-colors duration-200"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="eyebrow text-ink">
                  {t("footer.collections")}
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2.5 text-ink-muted text-[13px]",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ink transition-colors duration-200"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-3">
              <span className="eyebrow text-ink">{t("footer.service")}</span>
              <ul className="grid grid-cols-1 gap-y-2.5 text-ink-muted text-[13px]">
                <li>
                  <a
                    href="mailto:olá@carvan.example"
                    className="hover:text-ink transition-colors duration-200"
                  >
                    {t("footer.contact")}
                  </a>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account"
                    className="hover:text-ink transition-colors duration-200"
                  >
                    {t("footer.account")}
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="hover:text-ink transition-colors duration-200"
                  >
                    {t("footer.store")}
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-10 justify-between items-center border-t border-line pt-6 text-ink-muted">
          <Text className="eyebrow">
            {t("nav.footer.copyright", { year: new Date().getFullYear() })}
          </Text>
          <p className="eyebrow">DG — {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}