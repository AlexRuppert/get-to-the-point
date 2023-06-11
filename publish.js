import { publish } from 'gh-pages'
import fs from 'fs'

fs.writeFileSync('./build/.nojekyll', '')

publish('build', { dotfiles: true }, function (err) {})
