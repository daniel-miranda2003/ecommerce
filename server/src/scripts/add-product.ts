import { createProductsWorkflow } from "@medusajs/medusa/core-flows"
import { ExecArgs, ProductStatus } from "@medusajs/framework/types"

export default async function myScript({ container }: ExecArgs) {
  try {
    const query = container.resolve("query")
    const { data: salesChannels } = await query.graph({
      entity: "sales_channel",
      fields: ["id"],
      filters: {
        name: "Default Sales Channel",
      },
    })
    
    let defaultSalesChannelId = null
    if (salesChannels && salesChannels.length > 0) {
      defaultSalesChannelId = salesChannels[0].id
    } else {
      const { data: anySalesChannels } = await query.graph({
        entity: "sales_channel",
        fields: ["id"],
      })
      if (anySalesChannels && anySalesChannels.length > 0) {
        defaultSalesChannelId = anySalesChannels[0].id
      }
    }

    const sales_channels = defaultSalesChannelId ? [{ id: defaultSalesChannelId }] : []

    const productsToCreate = [
      {
        title: "Macacão Terra",
        handle: "macacao-terra",
        status: "published" as ProductStatus,
        description: "Macacão elegante com caimento perfeito.",
        thumbnail: "/launch-2.png",
        options: [{ title: "Cor", values: ["Terracota", "Preto", "Caramelo"] }, { title: "Tamanho", values: ["P", "M", "G"] }],
        sales_channels,
        variants: [
          { title: "Terracota / M", sku: "MAC-TERRA-M", prices: [{ amount: 349, currency_code: "brl" }, { amount: 349, currency_code: "usd" }], options: { "Cor": "Terracota", "Tamanho": "M" }, manage_inventory: false },
          { title: "Preto / P", sku: "MAC-PRETO-P", prices: [{ amount: 349, currency_code: "brl" }, { amount: 349, currency_code: "usd" }], options: { "Cor": "Preto", "Tamanho": "P" }, manage_inventory: false },
          { title: "Caramelo / G", sku: "MAC-CARA-G", prices: [{ amount: 349, currency_code: "brl" }, { amount: 349, currency_code: "usd" }], options: { "Cor": "Caramelo", "Tamanho": "G" }, manage_inventory: false },
        ]
      },
      {
        title: "Vestido Sage",
        handle: "vestido-sage",
        status: "published" as ProductStatus,
        description: "Vestido fluido para dias quentes.",
        thumbnail: "/launch-3.png",
        options: [{ title: "Cor", values: ["Sage", "Marfim", "Nude"] }, { title: "Tamanho", values: ["P", "M", "G"] }],
        sales_channels,
        variants: [
          { title: "Sage / M", sku: "VES-SAGE-M", prices: [{ amount: 319, currency_code: "brl" }, { amount: 319, currency_code: "usd" }], options: { "Cor": "Sage", "Tamanho": "M" }, manage_inventory: false },
          { title: "Marfim / P", sku: "VES-MARF-P", prices: [{ amount: 319, currency_code: "brl" }, { amount: 319, currency_code: "usd" }], options: { "Cor": "Marfim", "Tamanho": "P" }, manage_inventory: false },
          { title: "Nude / G", sku: "VES-NUDE-G", prices: [{ amount: 319, currency_code: "brl" }, { amount: 319, currency_code: "usd" }], options: { "Cor": "Nude", "Tamanho": "G" }, manage_inventory: false },
        ]
      },
      {
        title: "Calça Camel",
        handle: "calca-camel",
        status: "published" as ProductStatus,
        description: "Calça de alfaiataria reta super versátil.",
        thumbnail: "/launch-4.png",
        options: [{ title: "Cor", values: ["Camel", "Preto", "Off-White"] }, { title: "Tamanho", values: ["P", "M", "G"] }],
        sales_channels,
        variants: [
          { title: "Camel / M", sku: "CAL-CAMEL-M", prices: [{ amount: 259, currency_code: "brl" }, { amount: 259, currency_code: "usd" }], options: { "Cor": "Camel", "Tamanho": "M" }, manage_inventory: false },
          { title: "Preto / P", sku: "CAL-PRETO-P", prices: [{ amount: 259, currency_code: "brl" }, { amount: 259, currency_code: "usd" }], options: { "Cor": "Preto", "Tamanho": "P" }, manage_inventory: false },
          { title: "Off-White / G", sku: "CAL-OFF-G", prices: [{ amount: 259, currency_code: "brl" }, { amount: 259, currency_code: "usd" }], options: { "Cor": "Off-White", "Tamanho": "G" }, manage_inventory: false },
        ]
      },
      {
        title: "Vestido Midi Flora",
        handle: "vestido-midi-flora",
        status: "published" as ProductStatus,
        description: "Vestido Midi Flora elegante e confortável.",
        thumbnail: "/category-1.png",
        options: [{ title: "Cor", values: ["Preto", "Areia"] }, { title: "Tamanho", values: ["P", "M", "G"] }],
        sales_channels,
        variants: [
          { title: "Preto / P", sku: "VMF-PRETO-P", prices: [{ amount: 389, currency_code: "brl" }, { amount: 389, currency_code: "usd" }], options: { "Cor": "Preto", "Tamanho": "P" }, manage_inventory: false },
          { title: "Areia / M", sku: "VMF-AREIA-M", prices: [{ amount: 389, currency_code: "brl" }, { amount: 389, currency_code: "usd" }], options: { "Cor": "Areia", "Tamanho": "M" }, manage_inventory: false },
        ]
      },
      {
        title: "Calça Alfaiataria",
        handle: "calca-alfaiataria",
        status: "published" as ProductStatus,
        description: "Calça Alfaiataria clássica para trabalho ou passeio.",
        thumbnail: "/category-2.png",
        options: [{ title: "Cor", values: ["Bege", "Preto", "Marinho"] }, { title: "Tamanho", values: ["P", "M", "G"] }],
        sales_channels,
        variants: [
          { title: "Bege / M", sku: "CAL-ALF-BEGE-M", prices: [{ amount: 299, currency_code: "brl" }, { amount: 299, currency_code: "usd" }], options: { "Cor": "Bege", "Tamanho": "M" }, manage_inventory: false },
          { title: "Preto / P", sku: "CAL-ALF-PRETO-P", prices: [{ amount: 299, currency_code: "brl" }, { amount: 299, currency_code: "usd" }], options: { "Cor": "Preto", "Tamanho": "P" }, manage_inventory: false },
          { title: "Marinho / G", sku: "CAL-ALF-MAR-G", prices: [{ amount: 299, currency_code: "brl" }, { amount: 299, currency_code: "usd" }], options: { "Cor": "Marinho", "Tamanho": "G" }, manage_inventory: false },
        ]
      },
      {
        title: "Cropped Seda",
        handle: "cropped-seda",
        status: "published" as ProductStatus,
        description: "Cropped Seda leve e sofisticado.",
        thumbnail: "/launch-2.png",
        options: [{ title: "Cor", values: ["Off-White", "Terracota"] }, { title: "Tamanho", values: ["P", "M", "G"] }],
        sales_channels,
        variants: [
          { title: "Off-White / P", sku: "CROP-OFF-P", prices: [{ amount: 199, currency_code: "brl" }, { amount: 199, currency_code: "usd" }], options: { "Cor": "Off-White", "Tamanho": "P" }, manage_inventory: false },
          { title: "Terracota / M", sku: "CROP-TERRA-M", prices: [{ amount: 199, currency_code: "brl" }, { amount: 199, currency_code: "usd" }], options: { "Cor": "Terracota", "Tamanho": "M" }, manage_inventory: false },
        ]
      },
      {
        title: "Conjunto Moletinho",
        handle: "conjunto-moletinho",
        status: "published" as ProductStatus,
        description: "Conjunto confortável de moletinho.",
        thumbnail: "/launch-3.png",
        options: [{ title: "Cor", values: ["Cinza", "Preto"] }, { title: "Tamanho", values: ["P", "M", "G"] }],
        sales_channels,
        variants: [
          { title: "Cinza / M", sku: "CJ-CINZA-M", prices: [{ amount: 329, currency_code: "brl" }, { amount: 329, currency_code: "usd" }], options: { "Cor": "Cinza", "Tamanho": "M" }, manage_inventory: false },
          { title: "Preto / P", sku: "CJ-PRETO-P", prices: [{ amount: 329, currency_code: "brl" }, { amount: 329, currency_code: "usd" }], options: { "Cor": "Preto", "Tamanho": "P" }, manage_inventory: false },
        ]
      }
    ]

    const { result } = await createProductsWorkflow(container).run({
      input: {
        products: productsToCreate,
      },
    })
    console.log("Created products:", result.map(p => p.id))
  } catch (error) {
    console.error("Error creating product:", error)
  }
}
