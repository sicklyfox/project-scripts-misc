// sicklyfox.dev Starterkit Script
// starterkit_ex.js
// Version 1.0
// Description: Gives players a starter kit on first world join and welcomes them back on subsequent joins.
// Logs to the server console that the starterkit scripts are loaded
console.info('Loaded Starterkit scripts')

// Event triggered every time a player logs in
PlayerEvents.loggedIn(event => {

    // Check if the player is joining for the first time in this world
    if (!event.player.stages.has('new_join')) {

        // Mark the player as having joined once, so this block only runs once
        event.player.stages.add('new_join')

        // Destructure variables for convenience
        // 'player' = the player object
        // 'server' = the Minecraft server instance
        // 'username' = player's Minecraft username
        const { player, server, player: { username } } = event

        // Starter items that are not armor
        const starterItems = [
            'minecraft:wooden_sword',
            'minecraft:wooden_axe',
            'minecraft:wooden_shovel',
            'camping:wanderer_backpack'
        ]

        // Loop through each item and give it to the player
        starterItems.forEach(item => {
            server.runCommandSilent(`give ${username} ${item}`)
        })

        // Equip leather armor directly onto the player
        // KubeJS uses player.inventory.armor slots: helmet, chestplate, leggings, boots
        player.inventory.armor.helmet = Item.of('minecraft:leather_helmet')
        player.inventory.armor.chestplate = Item.of('minecraft:leather_chestplate')
        player.inventory.armor.leggings = Item.of('minecraft:leather_leggings')
        player.inventory.armor.boots = Item.of('minecraft:leather_boots')

        // Send a first-join greeting message to the player
        let message = Text.of("Hello, ").green()
            .append(Text.of(`${username}. `).yellow().bold())
            .append(Text.of(`You seem to be Lost in the Woods`).green());
        player.tell(message)
    }
})

// Event triggered every time a player logs in (this runs for everyone, new or returning)
PlayerEvents.loggedIn(event => {

    const { player, server, player: { username } } = event

    // Send a personalized welcome back message to the player
    let message = Text.of("Hello, ").green()
        .append(Text.of(`${username}. `).yellow().bold())
        .append(Text.of(`Welcome back to the Woods`).green());
    player.tell(message)

    // Announce to the whole server that this player has returned
    let serverannouncement = Text.of(`${username} `).yellow().bold()
        .append(Text.of(`has returned to the Woods`).green());
    server.tell(serverannouncement)
})

// Event triggered when a player logs out
PlayerEvents.loggedOut(event => {

    const { server, player: { username } } = event

    // Announce to the server that the player has left
    let serverannouncement = Text.of(`${username} `).yellow().bold()
        .append(Text.of(`is dreaming of Bagels`).green())
    server.tell(serverannouncement)
})
