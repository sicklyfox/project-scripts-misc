console.info('Loaded Ad Astra Stonecutter Recipes')

ServerEvents.recipes(event => {
    const metals = [
        { mod: 'ad_astra', types: ['iron', 'steel', 'desh', 'ostrum', 'calorite'], hasMarked: ['iron'] },
        { mod: 'ad_extendra', types: ['juperium', 'saturlyte', 'uranium', 'neptunium', 'plutonium', 'radium', 'electrolyte'] }
    ]

    metals.forEach(group => {
        group.types.forEach(metal => {
            const mod = group.mod
            const pillar = `${mod}:${metal}_pillar`
            const plating = `${mod}:${metal}_plating`
            const glowing = `${mod}:glowing_${metal}_pillar`
            const slab = `2x ${mod}:${metal}_plating_slab`
            const stairs = `${mod}:${metal}_plating_stairs`

            // Plating -> Pillar / Glowing / Slab / Stairs
            event.stonecutting(pillar, plating).id(`${mod}:stonecutting/bagelsiege/${metal}_pillar_to_${metal}_plating`)
            event.stonecutting(glowing, plating).id(`${mod}:stonecutting/bagelsiege/glowing_${metal}_pillar_to_${metal}_plating`)
            event.stonecutting(slab, plating).id(`${mod}:stonecutting/bagelsiege/${metal}_plating_to_${metal}_plating_slab`)
            event.stonecutting(stairs, plating).id(`${mod}:stonecutting/bagelsiege/${metal}_plating_to_${metal}_plating_stairs`)

            // Pillar -> Plating / Glowing
            event.stonecutting(plating, pillar).id(`${mod}:stonecutting/${metal}_plating_to_${metal}_pillar`)
            event.stonecutting(glowing, pillar).id(`${mod}:stonecutting/glowing_${metal}_pillar_to_${metal}_pillar`)

            // Glowing Pillar -> Pillar / Plating
            event.stonecutting(pillar, glowing).id(`${mod}:stonecutting/${metal}_pillar_to_glowing_${metal}_pillar`)
            event.stonecutting(plating, glowing).id(`${mod}:stonecutting/glowing_${metal}_pillar_to_${metal}_plating`)

            // Handle marked variants if applicable
            if (group.hasMarked && group.hasMarked.includes(metal)) {
                const marked = `${mod}:marked_${metal}_pillar`
                event.stonecutting(marked, pillar).id(`${mod}:stonecutting/marked_${metal}_pillar_to_${metal}_pillar`)
                event.stonecutting(glowing, marked).id(`${mod}:stonecutting/glowing_${metal}_pillar_to_marked_${metal}_pillar`)
                event.stonecutting(pillar, marked).id(`${mod}:stonecutting/${metal}_pillar_to_marked_${metal}_pillar`)
                event.stonecutting(plating, marked).id(`${mod}:stonecutting/marked_${metal}_pillar_to_${metal}_plating`)
                event.stonecutting(marked, plating).id(`${mod}:stonecutting/${metal}_plating_to_marked_${metal}_pillar`)
                event.stonecutting(marked, glowing).id(`${mod}:stonecutting/marked_${metal}_pillar_to_glowing_${metal}_pillar`)
            }
        })
    })
})
