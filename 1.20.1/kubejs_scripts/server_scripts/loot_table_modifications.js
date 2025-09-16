

// Farmers Delight - Straw from Grass with Knives
/* This script modifies loot tables to add a chance of dropping straw 
when breaking grass blocks with knives of various materials.*/
LootJS.modifiers(event => {
    // Map material to drop chance
    const materialChances = {
        "wooden": 0.02,
        "flint" : 0.03,
        "stone": 0.04,
        "iron": 0.05,
        "diamond": 0.07,
        "netherite": 0.10
    }

    // Apply loot to all blocks tagged as grass
    event.addBlockLootModifier("#forge:grass")
        .matchMainHand(Item.of("#forge:tools/knives")) // Any knife
        .setFunction(item => {
            // Determine the tier from the knife's ID
            const id = item.id; // e.g., "minecraft:iron_knife"
            let chance = 0.01; // Default chance

            for (const [tier, tierChance] of Object.entries(materialChances)) {
                if (id.includes(tier)) {
                    chance = tierChance;
                    break;
                }
            }

            return { chance: chance, loot: "farmersdelight:straw" }
        })
})