const path = require('path');

// Environment
const developmentMode = process.env.NODE_ENV === 'development';

const paths = {
  STYLES: path.resolve(__dirname, 'src/common'),
};

// Minify css
const cssnano = {
  zindex: false,
};

module.exports = {
  plugins: {
    // Enable imports
    'postcss-assets': {
      loadPaths: [path.join(paths.STYLES, 'assets')],
    },
    'postcss-at-rules-variables': {},
    'postcss-import': {
      path: paths.STYLES,
    },

    // Other config
    'postcss-each': {},
    'postcss-mixins': {},
    'css-mqpacker': {},
    'postcss-nesting': {},

    // CSS next support
    'postcss-cssnext': {
      autoprefixer: true,
      warnForDuplicates: false,
    },
  },
};

if (!developmentMode) {
  // module.exports.plugins.cssnano = cssnano;
}
