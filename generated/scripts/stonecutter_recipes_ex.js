/* ===============================================
   Ad Astra & Ad Extendra Stonecutter Recipes for KubeJS 1.20.1 Forge
   ===============================================

   This will print a message to the console when the script loads
   Useful for confirming that the script is active
   Recipes will only be added if the corresponding mod is installed.
*/
console.info('Loaded Ad Astra/Ad Extendra Stonecutter Recipes')

// Main event handler: listens for recipe registration events
// The "event" parameter gives us access to recipe functions like stonecutting
ServerEvents.recipes(event => {

    /* ===============================================
       Define all metals and their corresponding mods
       Each object contains:
       - mod: the mod namespace for the items
       - types: an array of metal types for that mod
       - hasMarked: optional array of metals with "marked" variants
       ===============================================*/
    const metals = [
        { mod: 'ad_astra', types: ['iron', 'steel', 'desh', 'ostrum', 'calorite'], hasMarked: ['iron'] },
        { mod: 'ad_extendra', types: ['juperium', 'saturlyte', 'uranium', 'neptunium', 'plutonium', 'radium', 'electrolyte'] }
    ]

    /* ===============================================
       Loop through each group of metals (per mod)
       ===============================================*/
    metals.forEach(group => {

        // Only create recipes if the mod is loaded
        if (!Platform.isLoaded(group.mod)) {
            console.info(`Skipping stonecutter recipes for ${group.mod} because it is not installed.`)
            return
        }

        // Loop through each individual metal type
        group.types.forEach(metal => {

            const mod = group.mod

            /* ===============================================
               Define common item variants for this metal
               These variables help avoid repeating long item IDs
               ===============================================*/
            const pillar = `${mod}:${metal}_pillar`           // Standard pillar
            const plating = `${mod}:${metal}_plating`         // Plating block
            const glowing = `${mod}:glowing_${metal}_pillar`  // Glowing pillar variant
            const slab = `2x ${mod}:${metal}_plating_slab`   // Two slabs create one full plating block
            const stairs = `${mod}:${metal}_plating_stairs`   // Stairs variant of the plating

            /* ===============================================
               1. Plating -> Other Variants
               Stonecutting can convert a block into other variants
               ===============================================*/
            event.stonecutting(pillar, plating)
                .id(`${mod}:stonecutting/bagelsiege/${metal}_pillar_to_${metal}_plating`)
            event.stonecutting(glowing, plating)
                .id(`${mod}:stonecutting/bagelsiege/glowing_${metal}_pillar_to_${metal}_plating`)
            event.stonecutting(slab, plating)
                .id(`${mod}:stonecutting/bagelsiege/${metal}_plating_to_${metal}_plating_slab`)
            event.stonecutting(stairs, plating)
                .id(`${mod}:stonecutting/bagelsiege/${metal}_plating_to_${metal}_plating_stairs`)

            /* ===============================================
               2. Pillar -> Plating / Glowing
               Stonecutting in the opposite direction
               ===============================================*/
            event.stonecutting(plating, pillar)
                .id(`${mod}:stonecutting/${metal}_plating_to_${metal}_pillar`)
            event.stonecutting(glowing, pillar)
                .id(`${mod}:stonecutting/glowing_${metal}_pillar_to_${metal}_pillar`)

            /* ===============================================
               3. Glowing Pillar -> Other Variants
               ===============================================*/
            event.stonecutting(pillar, glowing)
                .id(`${mod}:stonecutting/${metal}_pillar_to_glowing_${metal}_pillar`)
            event.stonecutting(plating, glowing)
                .id(`${mod}:stonecutting/glowing_${metal}_pillar_to_${metal}_plating`)

            /* ===============================================
               4. Handle Marked Variants (if applicable)
               Only metals listed in "hasMarked" array will generate these recipes
               "marked" variants are usually cosmetic or special-use pillars
               ===============================================*/
            if (group.hasMarked && group.hasMarked.includes(metal)) {

                const marked = `${mod}:marked_${metal}_pillar` // Define the marked pillar

                event.stonecutting(marked, pillar)
                    .id(`${mod}:stonecutting/marked_${metal}_pillar_to_${metal}_pillar`)
                event.stonecutting(glowing, marked)
                    .id(`${mod}:stonecutting/glowing_${metal}_pillar_to_marked_${metal}_pillar`)
                event.stonecutting(pillar, marked)
                    .id(`${mod}:stonecutting/${metal}_pillar_to_marked_${metal}_pillar`)
                event.stonecutting(plating, marked)
                    .id(`${mod}:stonecutting/marked_${metal}_pillar_to_${metal}_plating`)
                event.stonecutting(marked, plating)
                    .id(`${mod}:stonecutting/${metal}_plating_to_marked_${metal}_pillar`)
                event.stonecutting(marked, glowing)
                    .id(`${mod}:stonecutting/marked_${metal}_pillar_to_glowing_${metal}_pillar`)
            }
        })
    })
})
// End of script

/* ===============================================
   Stonecutting Conversion Diagram (per metal)
   ===============================================
   Recipes are only registered if the corresponding mod is installed.

             +-------------------+
             |   Plating Block   |
             +-------------------+
               ^      ^      ^
              /       |       \
             /        |        \
     From Slab     From Stairs  From Glowing Pillar
       |             |               |
       v             v               v
   +-------------------+           +---------------------+
   |    Standard Pillar | <------> | Glowing Pillar      |
   +-------------------+           +---------------------+
             ^                            ^
             |                            |
             +----------------------------+
             |
             v
      (If exists)
   +-------------------+
   |  Marked Pillar    |
   +-------------------+
*/
