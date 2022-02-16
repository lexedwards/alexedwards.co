const path = require('path')

/**
 * In order of most spoken
 * English
 * Mandorin
 * Hindi
 * Spanish
 * French
 * Arabic
 * Bengali
 * Russian
 * Portuguese
 */

module.exports = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  localePath: path.resolve('src/locales'),
}
