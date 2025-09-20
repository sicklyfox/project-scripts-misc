// ================================
// Server Script: Define Item Tags
// ================================

console.info('Loaded Item Tags')

ServerEvents.tags('item', event => {
  // Create a tag for magic materials
  let magicMaterials = ['minecraft:diamond', 'minecraft:gold_ingot']

  // Conditional: Only add mod items if the mod is installed
  if (Platform.isLoaded('farmersdelight')) {
    magicMaterials.push('farmersdelight:magic_essence')
  }

  // Register the tag
  event.add('kubejs:magic_materials', magicMaterials)
})
