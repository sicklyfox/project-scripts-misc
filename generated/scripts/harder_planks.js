// sicklyfox.Dev - KubeJS Script
// harder_planks.js
// Version: 1.2
// Description: Automatically generates chopping recipes for all wood types into planks using any axe.
/*
  Automatic Wood Chopping Recipes for KubeJS
  -------------------------------------------
  This script automatically generates shapeless "chopping" recipes for all types
  of wood blocks (logs, stems, wood, hyphae, and their stripped variants) into their respective planks.

  Key Features:
  - Works with vanilla and modded woods
  - Supports logs, stems, wood blocks, hyphae, and stripped variants
  - Removes original plank crafting recipes (both shaped and shapeless)
  - Uses tags (#kubejs:<wood>_logs_all) instead of hardcoded lists
  - Logs detailed info to console for debugging
  
  Note: This script uses tags created in tags/item_tags.js
*/

console.info("[Chopping] Loading Harder Planks recipes")

ServerEvents.recipes(event => {
  // Helper: register a chopping recipe
  function chopping(output, input) {
    console.info(`[Chopping] Registering recipe: ${output} from ${input}`)
    event.shapeless(output, [input, "#minecraft:axes"])
         .damageIngredient("#minecraft:axes")
  }

  // Track processed wood types so recipes aren’t duplicated
  let processed = new Set()

  // Loop through all registered items
  Ingredient.all.itemIds.forEach(itemId => {
    if (itemId.match(/(^|:)stripped_?.*(_log$|_logs$|_stem$|_stems$|_wood$|_hyphae$)/)) {
      let ns = itemId.split(':')[0]
      let baseName = itemId.replace(/^.*:/, '')

      // Extract wood type
      let woodType = baseName
        .replace(/^stripped_/, '')
        .replace(/_logs?$/, '')
        .replace(/_stems?$/, '')
        .replace(/_wood$/, '')
        .replace(/_hyphae$/, '')

      let plankItem = `${ns}:${woodType}_planks`
      let logTag = `#kubejs:${woodType}_logs_all`

      // Skip if already processed
      if (processed.has(`${ns}:${woodType}`)) return
      processed.add(`${ns}:${woodType}`)

      // Skip if no planks exist
      if (!Item.exists(plankItem)) {
        console.warn(`[Chopping] WARNING: Found ${itemId} but no matching planks (${plankItem}) exist!`)
        return
      }

      // Skip if no logs exist
      if (Ingredient.of(logTag).stacks.empty) {
        console.warn(`[Chopping] Skipping ${woodType}, no logs found in ${logTag}`)
        return
      }

      // Remove vanilla crafting recipes for planks
      console.info(`[Chopping] Removing vanilla crafting recipes for: ${plankItem}`)
      event.remove({ type: "minecraft:crafting_shaped", output: plankItem })
      event.remove({ type: "minecraft:crafting_shapeless", output: plankItem })

      // Add chopping recipe
      chopping(`2x ${plankItem}`, logTag)
    }
  })
  console.info("[Chopping] Loaded Harder Planks recipes")
})
