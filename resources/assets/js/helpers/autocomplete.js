import algolia from 'algoliasearch'
import autocomplete from 'autocomplete.js'

var index = algolia('VSPCR574SR', '981f69070d22c007f72710ca7a062941')

export const userautocomplete = selector => {
    var users = index.initIndex('users')

    return autocomplete(selector, {}, {
        source: autocomplete.sources.hits(users, { hitsPerPage: 10 }),
        displayKey: 'name',
        templates: {
            suggestion (suggestion) {
                return '<span>' + suggestion.name + '</span>'
            },
            empty: '<div class="aa-empty">No people found.</div>'
        }
    })
}
