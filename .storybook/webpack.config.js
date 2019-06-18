const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const getBabelConfig = require('../babel.config');

function findBabelRules(config) {
  return config.module.rules.filter(rule => {
    let isBabelLoader = false;

    if (rule.loader && rule.loader.includes('babel-loader')) {
      isBabelLoader = true;
    }

    if (rule.use) {
      rule.use.forEach(use => {
        if (typeof use === 'string' && use.includes('babel-loader')) {
          isBabelLoader = true;
        } else if (
          typeof use === 'object' &&
          use.loader &&
          use.loader.includes('babel-loader')
        ) {
          isBabelLoader = true;
        }
      });
    }

    return isBabelLoader;
  });
}

function modifyBabel(config) {
  const babelRules = findBabelRules(config);
  const babelConfig = getBabelConfig({ env: () => undefined });

  // Add Typescript to Babel Loader Test
  babelRules.forEach(rule => {
    rule.test = /\.(jsx|js|ts|tsx)$/;
    rule.use[0].options.presets = babelConfig.presets;
    rule.use[0].options.plugins = rule.use[0].options.plugins.slice(0, -1);
    // Add react-docgen-typescript-loader to rule
    rule.use.push({
      loader: require.resolve('react-docgen-typescript-loader'),
      options: {
        tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
        propFilter(prop) {
          if (prop.parent) {
            return !prop.parent.fileName.includes('@types/react');
          }

          return true;
        }
      }
    });
  });
}

function addTypescript(config) {
  config.resolve.extensions.push('.ts', '.tsx', '.json');
  modifyBabel(config);
}

function addCss(config) {
  const cssRule = config.module.rules.find(rule => '.css'.match(rule.test));

  const distRule = JSON.parse(JSON.stringify(cssRule));
  distRule.test = /dist\/\S+.css$/;
  config.module.rules.unshift(distRule);

  cssRule.exclude = /dist/;

  const cssLoader = cssRule.use.find(
    loader => typeof loader === 'object' && loader.loader.includes('css-loader')
  );

  cssLoader.options.modules = true;
  cssLoader.options.importLoaders = 1;
  cssLoader.options.localIdentName = '[name]-[local]';
}

module.exports = ({ config }) => {
  addTypescript(config);
  addCss(config);

  return config;
};
