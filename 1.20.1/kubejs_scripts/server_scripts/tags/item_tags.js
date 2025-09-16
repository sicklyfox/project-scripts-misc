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
