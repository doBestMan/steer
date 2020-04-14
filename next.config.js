// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['raw-loader'],
    });

    // Alias
    config.resolve.alias['~'] = path.resolve(__dirname + '/src');
    return config;
  },
};
