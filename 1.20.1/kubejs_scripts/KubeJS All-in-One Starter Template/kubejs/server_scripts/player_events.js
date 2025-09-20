// ================================
// Server Script: Player Events & Progression
// ================================

const starterKit = ['minecraft:stone_pickaxe', 'minecraft:bread', 'minecraft:torch']

// Runs when a player logs in
PlayerEvents.loggedIn(event => {
  const player = event.player

  // Give starter kit only on first join
  if (!player.stages.has('new_join')) {
    player.stages.add('new_join')
    for (let item of starterKit) {
      player.give(item)
    }
    player.tell('Your starter kit has been delivered!')
  }

  // Reward for crafting Magic Stick
  if (player.inventory.contains('kubejs:magic_stick') && !player.stages.has('crafted_magic_stick')) {
    player.stages.add('crafted_magic_stick')
    player.tell('Congratulations! You crafted the Magic Stick!')
  }
})

// Notify player when they die
PlayerEvents.death(event => {
  const player = event.player
  player.tell('You died! Watch your health next time.')
  player.world.spawnItem(player.position, 'minecraft:rotten_flesh', 1)
})

// Notify player when they respawn
PlayerEvents.respawn(event => {
  const player = event.player
  player.tell('Welcome back! Keep exploring!')
})

// Track inventory changes
PlayerEvents.inventoryChanged(event => {
  const player = event.player
  if (player.inventory.contains('minecraft:diamond')) {
    player.tell('You found a diamond!')
  }
})
