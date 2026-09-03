import Reveal from "@modules/common/components/reveal"

const REVIEWS = [
  {
    id: 1,
    name: "Camila Rodrigues",
    location: "São Paulo, SP",
    text: "As peças são simplesmente impecáveis! O tecido do conjunto de linho tem um caimento perfeito e superou todas as minhas expectativas. Com certeza comprarei novamente.",
    rating: 5,
  },
  {
    id: 2,
    name: "Isabella Medeiros",
    location: "Rio de Janeiro, RJ",
    text: "O macacão Terra é a coisa mais linda que já vesti. A entrega foi super rápida e o unboxing é uma experiência à parte. Nota 10 para o atendimento via WhatsApp!",
    rating: 5,
  },
  {
    id: 3,
    name: "Juliana Ferreira",
    location: "Belo Horizonte, MG",
    text: "Qualidade premium mesmo. Dá para sentir o cuidado em cada costura. Amei o vestido Flora, recebi vários elogios quando usei no final de semana.",
    rating: 5,
  },
  {
    id: 4,
    name: "Amanda Costa",
    location: "Curitiba, PR",
    text: "Já sou cliente fiel. A alfaiataria é moderna e veste incrivelmente bem. Além disso, o processo de compra no site foi muito seguro e prático.",
    rating: 5,
  },
]

const StarRating = () => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-[#D9B98C]"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
)

const ReviewsSection = () => {
  return (
    <section className="w-full bg-paper-warm border-t border-line overflow-hidden">
      <div className="content-container py-16 small:py-24">
        <Reveal>
          <div className="flex flex-col items-center text-center mb-12 small:mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9d8f84] mb-3">
              DEPOIMENTOS
            </p>
            <h2 className="font-display text-[2.2rem] small:text-[3rem] leading-[0.95] tracking-[-0.03em] text-ink">
              O que nossas clientes dizem
            </h2>
          </div>
        </Reveal>

        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar -mx-4 px-4 small:mx-0 small:px-0 small:grid small:grid-cols-4 gap-6 small:gap-8 pb-4">
          {REVIEWS.map((review, index) => (
            <Reveal key={review.id} delay={index * 100}>
              <div className="w-[280px] small:w-auto shrink-0 snap-center bg-white p-6 small:p-8 border border-line flex flex-col justify-between h-full">
                <div>
                  <StarRating />
                  <p className="mt-5 text-[13px] leading-[1.8] text-ink-muted italic">
                    "{review.text}"
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-line">
                  <p className="text-sm font-semibold text-ink">{review.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.08em] text-[#9d8f84] mt-1">
                    {review.location}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
