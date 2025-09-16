// sicklyfox.Dev - KubeJS Script
// small_ships_compat.js
// Version: 1.0
/* Description: Custom recipes for Small Ships mod to improve compatibility with other mods.
                This script is only useful if you have Small Ships mod installed.*/
/* Note: This script uses item tags created in tags/item_tags.js for better compatibility.*/

console.info('Loaded Small Ships Recipe Changes')

ServerEvents.recipes(event => {
  const woodTypes = [
    'oak', 'spruce', 'birch', 'jungle', 
    'acacia', 'cherry', 'dark_oak', 'mangrove', 'bamboo'
  ]

  const shipVariants = [
    { type: 'cog', pattern: ['ABA','CCC'], items: ['#forge:ropes', 'smallships:sail', 'BOAT'] },
    { type: 'brigg', pattern: ['BAB','CCC'], items: ['#forge:ropes', 'smallships:sail', 'CHEST_BOAT'] },
    { type: 'galley', pattern: ['AAA','DBD','CCC'], items: ['#forge:ropes', 'smallships:sail', 'BOAT', 'minecraft:chest'] },
    { type: 'drakkar', pattern: ['EBE','DAD','CCC'], items: ['#forge:ropes', 'smallships:sail', 'BOAT', 'minecraft:chest', 'minecraft:string'] },
  ]

  const boatMap = {
    oak: ['minecraft:oak_boat','minecraft:oak_chest_boat'],
    spruce: ['minecraft:spruce_boat','minecraft:spruce_chest_boat'],
    birch: ['minecraft:birch_boat','minecraft:birch_chest_boat'],
    jungle: ['minecraft:jungle_boat','minecraft:jungle_chest_boat'],
    acacia: ['minecraft:acacia_boat','minecraft:acacia_chest_boat'],
    cherry: ['minecraft:cherry_boat','minecraft:cherry_chest_boat'],
    dark_oak: ['minecraft:dark_oak_boat','minecraft:dark_oak_chest_boat'],
    mangrove: ['minecraft:mangrove_boat','minecraft:mangrove_chest_boat'],
    bamboo: ['minecraft:bamboo_raft','minecraft:bamboo_chest_raft']
  }

  // Remove original recipes automatically
  woodTypes.forEach(wood => {
    shipVariants.forEach(variant => {
      event.remove({ output: `smallships:${wood}_${variant.type}` })
    })
  })
  event.remove({ output: 'smallships:sail' })

  // Add new shaped recipes
  woodTypes.forEach(wood => {
    shipVariants.forEach(variant => {
      const items = variant.items.map(item => {
        if (item === 'BOAT') return boatMap[wood][0]
        if (item === 'CHEST_BOAT') return boatMap[wood][1]
        return item
      })

      const keyMap = {}
      const keys = ['A','B','C','D','E']
      keys.forEach((k,i) => {
        if (items[i]) keyMap[k] = items[i]
      })

      event.shaped(
        Item.of(`smallships:${wood}_${variant.type}`),
        variant.pattern,
        keyMap
      ).id(`smallships:sicklyfox/${wood}_${variant.type}`)
    })
  })

  // Sail recipe
  event.shaped(
    Item.of('smallships:sail'),
    ['AAA','ABA','CBC'],
    { A:'#minecraft:wool', B:'#minecraft:logs', C:'#forge:ropes' }
  ).id('smallships:sicklyfox/sail')
})
