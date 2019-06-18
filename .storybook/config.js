import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { withKnobs } from '@storybook/addon-knobs';
import { themes as storybookThemes, ThemeContext } from '@storybook/theming';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { jsxDecorator } from 'storybook-addon-jsx';
import { select } from '@storybook/addon-knobs';

addDecorator(withKnobs);
addDecorator(withPropsTable);
addDecorator(jsxDecorator);

addParameters({
  backgrounds: [
    { name: 'white', value: 'white', default: true },
    { name: 'dark', value: '#2f2f2f' },
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' }
  ],

  darkMode: {
    light: storybookThemes.light,
    dark: storybookThemes.dark
  }
});

function loadStories() {
  const req = require.context(
    // @ts-ignore
    '../src',
    true,
    /^(?!.*(?:{{upperName}})).*\.stories\.tsx$/
  );

  req.keys().forEach(req);
}

configure(loadStories, module);
