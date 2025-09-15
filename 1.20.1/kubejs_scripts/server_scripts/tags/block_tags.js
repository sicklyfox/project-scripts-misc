// Tags are groups of blocks/items that mods can check for, instead of hardcoding specific IDs.
// Example: A recipe could require anything tagged as "forge:grass" instead of just "minecraft:grass".
console.info('Loaded Block Tags')
ServerEvents.tags('block', event => {

    // List of all blocks we *want* to include in the "forge:grass" tag.
    // Some of these come from mods like Regions Unexplored or Immersive Weathering.
    // If those mods aren’t installed, their blocks won’t exist — and without checks, this would normally cause errors.
    let grassBlocks = [
        "minecraft:grass",
        "regions_unexplored:frozen_grass",
        "regions_unexplored:bladed_grass",
        "regions_unexplored:medium_grass",
        "regions_unexplored:sandy_grass",
        "regions_unexplored:steppe_grass",
        "regions_unexplored:steppe_tall_grass",
        "regions_unexplored:sandy_tall_grass",
        "regions_unexplored:bladed_tall_grass",
        "regions_unexplored:windswept_grass",
        "immersive_weathering:dune_grass",
        "immersive_weathering:frosty_grass"
    ]

    // Loop through each block ID in the list
    grassBlocks.forEach(id => {
        // Block.exists(id) checks if the block is actually registered in the game.
        if (Block.exists(id)) {
            // If the block exists, safely add it to the "forge:grass" tag.
            event.add("forge:grass", id)
        } else {
            // If the block doesn’t exist, we skip it and log a message for debugging.
            // This makes the script *mod-friendly*: you can run it with or without
            // Regions Unexplored / Immersive Weathering (or future mods), without editing anything.
            console.info(`[Tag Skipped] Block not found: ${id}`)
        }
    })
})