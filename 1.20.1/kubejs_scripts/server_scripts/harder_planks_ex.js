// sicklyfox.Dev - KubeJS Script
// harder_planks_ex.js
// Version: 1.0
// Description: Automatically generates chopping recipes for all wood types into planks using any axe.
/*
  Automatic Wood Chopping Recipes for KubeJS
  -------------------------------------------
  This script automatically generates shapeless "chopping" recipes for all types
  of wood blocks (logs, stems, wood, hyphae, and their stripped variants) into planks.
  It removes the original plank recipes and adds a new recipe that requires any axe.

  Key Features:
  - Works with vanilla and modded woods
  - Supports logs, stems, wood blocks, hyphae, and stripped variants
  - Only generates recipes if both input and output exist
  - Logs detailed info to console for debugging
  - Automatically scales with any new wood types added by mods

  How it works:
  1. Loop through all registered item IDs in the game.
  2. Detect items that match wood-like blocks using a regex.
  3. Clean the item name to determine the base wood type.
  4. Construct the plank output item ID for this wood type.
  5. Remove the original plank recipes for this wood type.
  6. Build a list of all possible input variants (normal and stripped).
  7. Check if each variant exists; if it does, create a chopping recipe.
  8. Log all created recipes and skipped variants for debugging.
*/

ServerEvents.recipes(event => {

  // Helper function to register a chopping recipe
  function chopping(output, choppedInput) {
    // Logs the recipe being added to the console
    console.info(`[Chopping] Registering recipe: ${output} from ${choppedInput}`)

    // Create a shapeless recipe: input log + any axe -> planks
    // 'damageIngredient' ensures the axe loses durability when used
    event.shapeless(output, [choppedInput, "#minecraft:axes"])
         .damageIngredient("#minecraft:axes")
  }

  // Loop through every registered item in the game
  Ingredient.all.itemIds.forEach(itemId => {

    // Detect wood-like blocks (logs, stems, wood, hyphae), including stripped variants
    if (itemId.match(/(^|:)stripped_?.*(_log$|_logs$|_stem$|_stems$|_wood$|_hyphae$)/)) {

      // Wrap in a block to isolate variables per iteration
      {
        // 'nsPart' is the mod/namespace (e.g., "minecraft" or "biomesoplenty")
        let nsPart = itemId.split(':')[0]

        // 'baseName' is the item name without the namespace
        let baseName = itemId.replace(/^.*:/, '')

        // Remove prefixes/suffixes to get the wood type (e.g., "oak", "cherry")
        let woodTypeName = baseName
          .replace(/^stripped_/, '')
          .replace(/_logs?$/, '')
          .replace(/_stems?$/, '')
          .replace(/_wood$/, '')
          .replace(/_hyphae$/, '')

        // Construct the plank output ID for this wood type
        let plankItem = `${nsPart}:${woodTypeName}_planks`

        // If the plank doesn't exist, log a warning and skip
        if (!Item.exists(plankItem)) {
          console.warn(`[Chopping] WARNING: Found ${itemId} but no matching planks (${plankItem}) exist!`)
          return
        }

        // Log detection and remove original recipes
        console.info(`[Chopping] Found wood set: ${itemId} -> ${plankItem}`)
        console.info(`[Chopping] Removing original recipes for: ${plankItem}`)
        event.remove({ output: plankItem })

        // List all possible variants for this wood type
        let variantsList = [
          `${nsPart}:${woodTypeName}_log`,
          `${nsPart}:${woodTypeName}_logs`,
          `${nsPart}:${woodTypeName}_stem`,
          `${nsPart}:${woodTypeName}_stems`,
          `${nsPart}:${woodTypeName}_wood`,
          `${nsPart}:${woodTypeName}_hyphae`,
          `${nsPart}:stripped_${woodTypeName}_log`,
          `${nsPart}:stripped_${woodTypeName}_stem`,
          `${nsPart}:stripped_${woodTypeName}_wood`,
          `${nsPart}:stripped_${woodTypeName}_hyphae`
        ]

        // For each variant, create a chopping recipe if the item exists
        variantsList.forEach(variantItem => {
          if (Item.exists(variantItem) || !Ingredient.of(variantItem).stacks.empty) {
            console.info(`[Chopping] Creating recipe for ${variantItem} -> ${plankItem}`)
            chopping(`2x ${plankItem}`, variantItem)
          } else {
            // Log skipped variants that don't exist
            console.warn(`[Chopping] Skipping variant (does not exist): ${variantItem}`)
          }
        })
      }
    }
  })
})
