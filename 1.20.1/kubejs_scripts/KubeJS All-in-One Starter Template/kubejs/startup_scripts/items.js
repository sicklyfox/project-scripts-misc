// ================================
// Startup Script: Register Custom Items
// ================================

StartupEvents.registry('item', event => {
  // Create a new item called 'Magic Stick'
  event.create('magic_stick')
    .displayName('Magic Stick')
    .tooltip('A stick infused with mystical power')

  // You can add more custom items here if needed
})
