// sicklyfox.Dev - KubeJS Script
// tags/item_tags.js
// Version: 1.0
// Description: Custom item tags for various mods and items.
/* Note: This script is written to be flexible and work with different modpacks without hard dependencies. 
         Item tags can make recipe compatibility easier across mods.*/
console.info('Loaded Item Tags')

ServerEvents.tags('item', event => {
    // --- Ropes Tag ---
    // We want to group different "rope-like" items into one tag: forge:ropes
    // Instead of checking if mods are loaded, we just test if each item actually exists.
    // This makes the script flexible across different modpacks.
    let ropes = [
        'minecraft:lead',
        'beautify:rope',
        'farmersdelight:rope',
        'brewery:rope'
    ]
    // Here we use <let ropes> to store all possible rope items. 
    // If we used a dynamic method, we might need to have a blacklist of items to exclude,
    // which could be more complex and error-prone.
    // So this static list is simpler and more reliable for our needs.
    ropes.forEach(id => {
        if (Item.exists(id)) {
            event.add('forge:ropes', id)
            console.info(`[Tag Added] Item added to forge:ropes: ${id}`)
        } else {
            console.info(`[Tag Skipped] Item not found: ${id}`)
        }
    })


    // --- Uranium Tag (Ad Extendra) ---
    // Same approach: just check if the item exists before adding it.
    if (Item.exists('ad_extendra:uranium_block')) {
        event.add('ad_extendra:uranium_extendra', 'ad_extendra:uranium_block')
    } else {
        console.info(`[Tag Skipped] Item not found: ad_extendra:uranium_block`)
    }
})
// This next section is alot more complex, as it dynamically creates tags for all wood types.
// It will eventually be moved to its own script file, so I can add more detailed comments.

// --- Dynamic Wood Group Tags ---
// This section dynamically creates tags for all wood types based on existing items.
// It looks for stripped logs, logs, stems, wood, and hyphae, then groups them into a custom tag.
console.info("[WoodTags] Building dynamic wood group tags")

ServerEvents.tags('item', event => {
  // Loop through all items in the game
  Ingredient.all.itemIds.forEach(itemId => {
    if (itemId.match(/(^|:)stripped_?.*(_log$|_logs$|_stem$|_stems$|_wood$|_hyphae$)/)) {
      let ns = itemId.split(':')[0]
      let baseName = itemId.replace(/^.*:/, '')

      // Clean name down to the wood type (oak, cherry, etc)
      let woodType = baseName
        .replace(/^stripped_/, '')
        .replace(/_logs?$/, '')
        .replace(/_stems?$/, '')
        .replace(/_wood$/, '')
        .replace(/_hyphae$/, '')

      let tagName = `kubejs:${woodType}_logs_all`

      // List all possible variants for this wood type
      let variants = [
        `${ns}:${woodType}_log`,
        `${ns}:${woodType}_logs`,
        `${ns}:${woodType}_stem`,
        `${ns}:${woodType}_stems`,
        `${ns}:${woodType}_wood`,
        `${ns}:${woodType}_hyphae`,
        `${ns}:stripped_${woodType}_log`,
        `${ns}:stripped_${woodType}_stem`,
        `${ns}:stripped_${woodType}_wood`,
        `${ns}:stripped_${woodType}_hyphae`
      ]

      // Add all existing variants to the tag
      variants.forEach(variant => {
        if (Item.exists(variant)) {
          event.add(tagName, variant)
          console.info(`[WoodTags] Added ${variant} to #${tagName}`)
        }
      })
    }
  })
})