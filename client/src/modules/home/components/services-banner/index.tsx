import Reveal from "@modules/common/components/reveal"

const services = [
  {
    id: "frete",
    title: "FRETE E ENTREGA",
    description: "Enviamos para todo Brasil",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: "pagamento",
    title: "MEIOS DE PAGAMENTO",
    description: "Pague no pix, boleto ou cartão",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    id: "atendimento",
    title: "ATENDIMENTO",
    description: "Via WhatsApp",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
        <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
      </svg>
    ),
  },
  {
    id: "seguranca",
    title: "COMPRA SEGURA",
    description: "Site 100% protegido",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
]

const ServicesBanner = () => {
  return (
    <Reveal>
      <section className="w-full border-t border-b border-line bg-paper">
        <div className="content-container">
          <div className="grid grid-cols-2 small:grid-cols-4 divide-x divide-y small:divide-y-0 divide-line">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col items-center gap-3 px-6 py-8 text-center small:py-10"
              >
                <span className="text-ink/60">{service.icon}</span>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-ink mb-1">
                    {service.title}
                  </p>
                  <p className="text-[13px] leading-relaxed text-ink-muted">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  )
}

export default ServicesBanner
