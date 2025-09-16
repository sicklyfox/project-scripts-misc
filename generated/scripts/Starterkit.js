// sicklyfox.dev Starterkit Script
// starterkit_ex.js
// Version 1.0
// Description: Gives players a starter kit on first world join and welcomes them back on subsequent joins.
console.info('Loaded Starterkit scripts')

PlayerEvents.loggedIn(event => {
    // First join check
    if (!event.player.stages.has('new_join')) {
        event.player.stages.add('new_join')

        const { player, server, player: { username } } = event

        // Starter items (non-armor)
        const starterItems = [
            'minecraft:wooden_sword',
            'minecraft:wooden_axe',
            'minecraft:wooden_shovel',
            'camping:wanderer_backpack'
        ]

        // Give non-armor items
        starterItems.forEach(item => {
            server.runCommandSilent(`give ${username} ${item}`)
        })

        // Equip leather armor
        player.inventory.armor.helmet = Item.of('minecraft:leather_helmet')
        player.inventory.armor.chestplate = Item.of('minecraft:leather_chestplate')
        player.inventory.armor.leggings = Item.of('minecraft:leather_leggings')
        player.inventory.armor.boots = Item.of('minecraft:leather_boots')

        // First join greeting
        let message = Text.of("Hello, ").green()
            .append(Text.of(`${username}. `).yellow().bold())
            .append(Text.of(`You seem to be Lost in the Woods`).green());
        player.tell(message)
    }
})

// Returning players greeting
PlayerEvents.loggedIn(event => {
    const { player, server, player: { username } } = event
    let message = Text.of("Hello, ").green()
        .append(Text.of(`${username}. `).yellow().bold())
        .append(Text.of(`Welcome back to the Woods`).green());
    player.tell(message)

    let serverannouncement = Text.of(`${username} `).yellow().bold()
        .append(Text.of(`has returned to the Woods`).green());
    server.tell(serverannouncement)
})

// Player logout announcement
PlayerEvents.loggedOut(event => {
    const { server, player: { username } } = event
    let serverannouncement = Text.of(`${username} `).yellow().bold()
        .append(Text.of(`is dreaming of Bagels`).green())
    server.tell(serverannouncement)
})
