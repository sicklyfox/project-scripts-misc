console.info('Loaded Ad Astra Recipe Changes')

ServerEvents.recipes(event => {
    // -------------------------------------------------------------
    // Step 1: Remove the default Tier 7 Rocket recipe
    // -------------------------------------------------------------
    // 'event.remove' deletes any existing recipe that produces the
    // specified output. This ensures only our custom recipe works.
    event.remove({ output: 'ad_astra:tier_7_rocket' })

    // -------------------------------------------------------------
    // Step 2: Define a custom NASA Workbench recipe for the Tier 7 Rocket
    // -------------------------------------------------------------
    // 'event.custom' allows us to create a completely custom recipe
    // for a specific crafting system (NASA Workbench in this case).
    // Key parts:
    // - type: specifies the crafting system ('ad_astra:nasa_workbench')
    // - ingredients: array of items/tags in the exact slot order
    // - result: the item produced by this recipe
    // - .id(): unique recipe identifier

    // Visual representation of the NASA Workbench slot layout:
    // Each slot corresponds to an ingredient in the array below.
    //
    // Row 1:   [ Rocket Nose Cone ]
    // Row 2:   [ Uranium ] [ Uranium ]
    // Row 3:   [ Uranium ] [ Uranium ]
    // Row 4:   [ Uranium ] [ Uranium ]
    // Row 5:   [ Rocket Fin ] [ Uranium Tank ] [ Uranium Tank ] [ Rocket Fin ]
    // Row 6:   [ Rocket Fin ] [ Uranium Engine ] [ Rocket Fin ]
    //
    // Legend:
    // - Rocket Nose Cone = ad_astra:rocket_nose_cone
    // - Uranium = any item with tag ad_extendra:uranium_extendra
    // - Rocket Fin = ad_astra:rocket_fin
    // - Uranium Tank = ad_extendra:uranium_tank
    // - Uranium Engine = ad_extendra:uranium_engine

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
    })
    // Unique ID for this recipe to prevent conflicts with other mods
    .id('ad_extendra:sicklyfox/nasa_workbench/tier_7_rocket')
});
