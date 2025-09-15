console.info('Loaded Ad Astra Recipe Changes')

ServerEvents.recipes(event => {
    // Remove the original Tier 7 Rocket recipe
    event.remove({ output: 'ad_astra:tier_7_rocket' })

    // Custom NASA Workbench Recipe for Tier 7 Rocket
    event.custom({
        type: 'ad_astra:nasa_workbench',
        ingredients: [
            // Row 1
            { item: 'ad_astra:rocket_nose_cone' },

            // Row 2
            { tag: 'ad_extendra:uranium_extendra' },
            { tag: 'ad_extendra:uranium_extendra' },

            // Row 3
            { tag: 'ad_extendra:uranium_extendra' },
            { tag: 'ad_extendra:uranium_extendra' },

            // Row 4
            { tag: 'ad_extendra:uranium_extendra' },
            { tag: 'ad_extendra:uranium_extendra' },

            // Row 5
            { item: 'ad_astra:rocket_fin' },
            { item: 'ad_extendra:uranium_tank' },
            { item: 'ad_extendra:uranium_tank' },
            { item: 'ad_astra:rocket_fin' },

            // Row 6
            { item: 'ad_astra:rocket_fin' },
            { item: 'ad_extendra:uranium_engine' },
            { item: 'ad_astra:rocket_fin' }
        ],
        result: { count: 1, id: 'ad_extendra:tier_7_rocket' }
    }).id('ad_extendra:sicklyfox/nasa_workbench/tier_7_rocket')
})