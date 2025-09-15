console.info('Loaded Small Ships Recipe Changes')

// Main event for handling recipes in KubeJS
ServerEvents.recipes(event => {
  
  // === Step 1: Define all wood types used for ships ===
  const woodTypes = [
    'oak', 'spruce', 'birch', 'jungle', 
    'acacia', 'cherry', 'dark_oak', 'mangrove', 'bamboo'
  ]

  // === Step 2: Define ship variants, patterns, and ingredient placeholders ===
  // Placeholders:
  //   BOAT -> replaced with vanilla boat for that wood
  //   CHEST_BOAT -> replaced with chest boat for that wood
  const shipVariants = [
    { type: 'cog', pattern: ['ABA','CCC'], items: ['#forge:ropes', 'smallships:sail', 'BOAT'] },
    { type: 'brigg', pattern: ['BAB','CCC'], items: ['#forge:ropes', 'smallships:sail', 'CHEST_BOAT'] },
    { type: 'galley', pattern: ['AAA','DBD','CCC'], items: ['#forge:ropes', 'smallships:sail', 'BOAT', 'minecraft:chest'] },
    { type: 'drakkar', pattern: ['EBE','DAD','CCC'], items: ['#forge:ropes', 'smallships:sail', 'BOAT', 'minecraft:chest', 'minecraft:string'] },
  ]

  // === Step 3: Map wood types to vanilla boats ===
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

  // === Step 4: Remove original recipes ===
  woodTypes.forEach(wood => {
    shipVariants.forEach(variant => {
      event.remove({ output: `smallships:${wood}_${variant.type}` })
    })
  })
  event.remove({ output: 'smallships:sail' })

  // === Step 5: Add new shaped recipes with diagrams ===
  woodTypes.forEach(wood => {
    shipVariants.forEach(variant => {

      // Replace placeholders with actual items
      const items = variant.items.map(item => {
        if (item === 'BOAT') return boatMap[wood][0]
        if (item === 'CHEST_BOAT') return boatMap[wood][1]
        return item
      })

      // Skip undefined items (not used here, but good habit if you add mod items)
      if (items.includes(null)) return

      // Build key mapping A-E dynamically
      const keyMap = {}
      const keys = ['A','B','C','D','E']
      keys.forEach((k,i) => {
        if (items[i]) keyMap[k] = items[i]
      })

      // === ASCII Diagrams for each ship variant ===
      // Cog:
      //  A B A
      //  C C C
      //
      // Brigg:
      //  B A B
      //  C C C
      //
      // Galley:
      //  A A A
      //  D B D
      //  C C C
      //
      // Drakkar:
      //  E B E
      //  D A D
      //  C C C

      event.shaped(
        Item.of(`smallships:${wood}_${variant.type}`),
        variant.pattern,
        keyMap
      ).id(`smallships:sicklyfox/${wood}_${variant.type}`)
    })
  })

  // === Step 6: Sail recipe ===
  // Diagram:
  //  A A A
  //  A B A
  //  C B C
  event.shaped(
    Item.of('smallships:sail'),
    ['AAA','ABA','CBC'],
    { A:'#minecraft:wool', B:'#minecraft:logs', C:'#forge:ropes' }
  ).id('smallships:sicklyfox/sail')
})