// This script lowers the durability of all stone tools in Minecraft.
// It runs when items are being modified by KubeJS.

ItemEvents.modification(event => {
  // Grab all items that belong to the "minecraft:stone_tools" tag.
  // This includes stone sword, pickaxe, axe, shovel, and hoe.
  const stoneTools = Ingredient.of('#minecraft:stone_tools').getItems()

  // Loop through each stone tool and change its durability.
  stoneTools.forEach(tool => {
    event.modify(tool.id, item => {
      // Set durability to 59 (vanilla is higher).
      item.maxDamage = 59
    })
  })

  // Print a message to the server log so we know it worked.
  // It shows how many tools were modified (e.g., 5 items).
  console.info(`Weaker stone tools loaded (${stoneTools.length} items modified).`)
})