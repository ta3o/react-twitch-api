const razzleBabel = require('razzle/babel');

module.exports = function babelConfig(api) {
  api.cache(true);

  const babel = razzleBabel();

  babel.presets[0] = process.env.BUILD_TARGET === 'client'
    ? [
      require.resolve('@babel/preset-env'),
      {
        modules: false,
      },
    ]
    : [
      require.resolve('@babel/preset-env'),
      {
        targets: {
          node: 'current',
        },
        exclude: [
          'babel-plugin-transform-classes',
          '@babel/plugin-transform-classes',
        ],
        modules: false,
      },
    ];

  return {
    presets: [babel],
    plugins: ['babel-plugin-styled-components'],
  };
};
