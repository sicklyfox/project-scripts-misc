// ================================
// Server Script: Modify Loot Tables
// ================================

LootJS.modifiers(event => {
  // Grass drops magic stick with 5% chance
  event.addBlockLootModifier('minecraft:grass')
    .randomChance(0.05)
    .addLoot('kubejs:magic_stick')

  // Zombies drop a magic material 20% chance
  event.addEntityLootModifier('minecraft:zombie')
    .randomChance(0.2)
    .addLoot('kubejs:magic_materials')
})
