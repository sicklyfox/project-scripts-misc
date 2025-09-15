console.info('Loaded Tags')

ServerEvents.tags('item', event => {
    // Ropes
    let ropes = ['minecraft:lead']

    if (Platform.isLoaded('beautify')) ropes.push('beautify:rope')
    if (Platform.isLoaded('farmersdelight')) ropes.push('farmersdelight:rope')
    if (Platform.isLoaded('brewery')) ropes.push('brewery:rope')

    event.add('forge:ropes', ropes)

    // Ad Extendra Uranium
    if (Platform.isLoaded('ad_extendra')) {
        event.add('ad_extendra:uranium_extendra', 'ad_extendra:uranium_block')
    }
})