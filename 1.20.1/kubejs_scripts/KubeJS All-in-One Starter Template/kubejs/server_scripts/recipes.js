// ================================
// Server Script: Custom Recipes
// ================================

ServerEvents.recipes(event => {
  // Shapeless recipe using a tag
  event.shapeless('kubejs:magic_stick', ['kubejs:magic_materials', 'minecraft:stick'])

  // Conditional recipe: only if Farmers Delight is installed
  if (Platform.isLoaded('farmersdelight')) {
    event.shapeless('farmersdelight:straw_block', ['farmersdelight:straw', 'minecraft:string'])
  }

  // Shaped recipe example: Magic Stick crafted in a pattern
  event.shaped('kubejs:magic_stick', [
    '  S',
    ' W ',
    'S  '
  ], {
    S: 'minecraft:stick',
    W: '#forge:ingots/iron'
  })
})
