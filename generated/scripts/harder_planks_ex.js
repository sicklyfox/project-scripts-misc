// sicklyfox.Dev - KubeJS Script
// harder_planks_ex.js
// Version: 1.2
// Description: Removes vanilla plank crafting recipes and replaces them with axe-based chopping recipes.
/*
  Harder Planks EX
  -------------------------------------------
  This script removes vanilla crafting recipes for planks and replaces them
  with axe-based chopping recipes. Works with both vanilla and modded wood types.

  Key Features:
  - Removes only crafting table recipes (not stonecutter/machine recipes)
  - Prevents duplicate recipe generation
  - Uses tags (#kubejs:<wood>_logs_all) instead of hardcoded lists
  - Logs detailed info to console for debugging
  
  Note: This script uses tags created in tags/item_tags.js
*/

console.info("[Chopping] Loading Harder Planks EX recipes")

ServerEvents.recipes(event => {
  // Helper: register chopping recipe
  function chopping(output, input) {
    console.info(`[Chopping] Registering recipe: ${output} from ${input}`)
    event.shapeless(output, [input, "#minecraft:axes"])
         .damageIngredient("#minecraft:axes")
  }

  // Track already-processed wood types
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
      if (processed.has(`${ns}:${woodType}`)) {
        console.info(`[Chopping] Skipping duplicate detection for ${woodType}`)
        return
      }
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
  console.info("[Chopping] Loaded Harder Planks EX recipes")
})
  