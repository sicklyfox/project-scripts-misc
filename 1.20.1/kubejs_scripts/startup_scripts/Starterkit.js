console.info('Loaded Login scripts')

PlayerEvents.loggedIn(event => {
    // Checks if the player already has the 'new_join' stage and if not it adds it, effectively only running
    // this once on first world join.
  if (!event.player.stages.has('new_join')) {event.player.stages.add('new_join')
    // Equips player with starter equipment
    event.server.runCommandSilent(`give ${event.entity.username} minecraft:wooden_sword`)
    event.server.runCommandSilent(`give ${event.entity.username} minecraft:wooden_axe`)
    event.server.runCommandSilent(`give ${event.entity.username} minecraft:wooden_shovel`)
    event.server.runCommandSilent(`give ${event.entity.username} camping:wanderer_backpack`)
    const { player, server, player: { username } } = event
    // Gives player a greeting on first world join
  let message = Text.of("Hello, ").green()
    .append(Text.of(`${username}. `).yellow().bold())
    .append(Text.of(`You seem to be Lost in the Woods`).green());
  player.tell(message)}
  else(!event.player.loggedIn)
})

PlayerEvents.loggedIn(event =>{
    // Define the player as well as the username to the event
const { player, server, player: { username } } = event
let message = Text.of("Hello, ").green()
  .append(Text.of(`${username}. `).yellow().bold())
  .append(Text.of(`Welcome back to the Woods`).green());
player.tell(message);
    // This runs every time a player joins
let serverannouncement = Text.of(`${username} `).yellow().bold()
    // We .append to add another text.of to change the color
  .append(Text.of(`has returned to the Woods`).green());
server.tell(serverannouncement)
})

PlayerEvents.loggedOut(event => {
    // Define the player as well as the username to the event
  const { player, server, player: { username } } = event
    // Tells server the player left
  let serverannouncement = Text.of(`${username} `).yellow().bold()
    // We .append to add another text.of to change the color
    .append(Text.of(`is dreaming of Bagels`).green());
  server.tell(serverannouncement)
});