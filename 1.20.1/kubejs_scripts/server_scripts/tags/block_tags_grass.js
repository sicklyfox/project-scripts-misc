// sicklyfox.Dev - KubeJS Script
// tags/block_tags_grass.js
// Version: 1.1
// Description: Dynamically tag blocks/items with "grass" in their name, with optional blacklist.
/* Note: I haven't tested this script yet, but it should work fine.*/
console.info('Loaded Dynamic Grass Block Tags')

ServerEvents.tags('block', event => {
    // Optional blacklist for blocks you DON'T want to include
    let blacklist = [
        "minecraft:seagrass",               // Example: block contains "grass" in name but should be excluded
        "immersive_weathering:fake_grass",
        "minecraft:grass_block"    // Example from a mod
    ]
    // In item_tags.js, we previously mentioned how needing a blacklist can complicate things.
    // But in this case, it's necessary to avoid unwanted items.
    // So we use a static blacklist for simplicity and reliability.
    // The number of items in the blacklist should be minimal, since not many blocks use an unrelated "grass" name.
    // Note: Biome generation/Worldgen mods may add more "grass" blocks in the future, so keep that in mind.

    console.info("[Tagging] Adding blocks with 'grass' in name to forge:grass tag, excluding blacklist items.")

    // Iterate over all registered blocks
    Block.all().forEach(block => {
        let id = block.id.toLowerCase() // Ensure comparison is lowercase

        // Check if block name includes "grass" AND is not in blacklist
        if (id.includes("grass") && !blacklist.includes(id)) {
            event.add("forge:grass", id)
            console.info(`[Tag Added] Block added to forge:grass: ${id}`)
        }
    })
})
