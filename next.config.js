const path = require('path');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['media.taringa.net'],
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/sass')],
  },
};
