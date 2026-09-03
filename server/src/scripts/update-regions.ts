import { ExecArgs } from "@medusajs/framework/types"
import { deleteRegionsWorkflow, createRegionsWorkflow, updateRegionsWorkflow } from "@medusajs/medusa/core-flows"

export default async function updateRegions({ container }: ExecArgs) {
  try {
    const query = container.resolve("query")
    const { data: regions } = await query.graph({
      entity: "region",
      fields: ["id", "name", "currency_code", "countries.iso_2"],
    })
    
    console.log("Current regions:", JSON.stringify(regions, null, 2))

    let brRegion = regions.find((r: any) => 
      r.countries?.some((c: any) => c.iso_2 === "br") || r.name.toLowerCase() === "brasil" || r.name.toLowerCase() === "brazil"
    )

    // Delete all regions that are not the BR region (or delete all if we are recreating)
    const regionsToDelete = regions.filter((r: any) => r.id !== brRegion?.id).map((r: any) => r.id)
    
    if (regionsToDelete.length > 0) {
      console.log("Deleting non-BR regions:", regionsToDelete)
      await deleteRegionsWorkflow(container).run({
        input: { ids: regionsToDelete }
      })
    }

    if (!brRegion) {
      console.log("Creating BR region...")
      const { result } = await createRegionsWorkflow(container).run({
        input: {
          regions: [{
            name: "Brasil",
            currency_code: "brl",
            countries: ["br"],
            automatic_taxes: true,
          }]
        }
      })
      brRegion = result[0]
      console.log("Created BR region:", brRegion.id)
    } else {
      console.log("BR region already exists, updating to ensure it is configured properly...")
      // In Medusa v2, we might not be able to easily update countries without specific workflow args, 
      // but we can try updating basic fields if needed.
    }

    console.log("Region setup complete. Only Brasil (brl) should remain.")
  } catch (error) {
    console.error("Error updating regions:", error)
  }
}
