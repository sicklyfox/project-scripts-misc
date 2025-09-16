// sicklyfox.Dev - KubeJS Script
// harder_planks_ex.js
// Version: 1.0
// Description: Automatically generates chopping recipes for all wood types into planks using any axe.
ServerEvents.recipes(event => {
  function chopping(output, choppedInput) {
    console.info(`[Chopping] Registering recipe: ${output} from ${choppedInput}`)
    event.shapeless(output, [choppedInput, "#minecraft:axes"])
         .damageIngredient("#minecraft:axes")
  }

  Ingredient.all.itemIds.forEach(itemId => {
    // Match any wood-like block (logs, stems, wood, hyphae, stripped or not)
    if (itemId.match(/(^|:)stripped_?.*(_log$|_logs$|_stem$|_stems$|_wood$|_hyphae$)/)) {
      // wrap in a block to ensure variables are scoped per iteration
      {
        let nsPart = itemId.split(':')[0]
        let baseName = itemId.replace(/^.*:/, '')

        // Clean wood type
        let woodTypeName = baseName
          .replace(/^stripped_/, '')
          .replace(/_logs?$/, '')
          .replace(/_stems?$/, '')
          .replace(/_wood$/, '')
          .replace(/_hyphae$/, '')

        let plankItem = `${nsPart}:${woodTypeName}_planks`

        if (!Item.exists(plankItem)) {
          console.warn(`[Chopping] WARNING: Found ${itemId} but no matching planks (${plankItem}) exist!`)
          return
        }

        console.info(`[Chopping] Found wood set: ${itemId} -> ${plankItem}`)
        console.info(`[Chopping] Removing original recipes for: ${plankItem}`)
        event.remove({ output: plankItem })

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

        variantsList.forEach(variantItem => {
          if (Item.exists(variantItem) || !Ingredient.of(variantItem).stacks.empty) {
            console.info(`[Chopping] Creating recipe for ${variantItem} -> ${plankItem}`)
            chopping(`2x ${plankItem}`, variantItem)
          } else {
            console.warn(`[Chopping] Skipping variant (does not exist): ${variantItem}`)
          }
        })
      }
    }
  })
})
