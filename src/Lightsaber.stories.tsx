import React from 'react';
import dedent from 'dedent';

import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { boolean, color, select, number } from '@storybook/addon-knobs';

import LightsaberBuilder, { Lightsaber } from '.';
import Handle, { handlesTypes } from './Handle';
import Sword from './Sword';
import Blade from './Blade';

const stories = storiesOf('Components|Lightsaber', module);

stories.addDecorator(centered);
stories.addParameters({ jsx: { skip: 2 } });

stories.add(
  'Bloated API',
  () => (
    <LightsaberBuilder
      color={color('Color', 'rebeccapurple')}
      active={boolean('Active', true)}
      handleType={select('Handle Type', handlesTypes, 'light')}
    />
  ),
  {
    notes: dedent`
      # Solution 1: Single Top-Level API

      This solution exposes only 1 component. This component has the
      responsibility of managing all of its props and the props of its
      sub-components.

      ### Pros:

      ✅ Easy to understand - only one component

      ### Cons:

      ❌ 1 component has to control all props, potentially more plumbing  
      
      ❌ Limited Customization  

      ❌ Doesn’t reflect the DOM structure  
    `
  }
);

stories.add(
  'Composition',
  () => (
    <Lightsaber>
      <Handle type={select('Handle Type', handlesTypes, 'dark')} />
      <Blade
        active={boolean('active', true)}
        color={color('Color', 'red')}
        length={number('Length', 600)}
      />
    </Lightsaber>
  ),
  {
    notes: dedent`
      # Solution 2: Multiple Components for Composing

      This solution exposes all of the components used to build the lightsaber.

      ### Pros:

      ✅ API is clean, components get only what the need

      ✅ Easily add more props to sub-components, less plumbing

      ✅ Customize the component far more freely
      
      ✅ Component usage reflects component structure

      ### Cons:

      ❌ Slightly more complex
    `
  }
);

stories.add(
  'Composition === Flexibility',
  () => (
    <Lightsaber>
      <Handle type={select('Handle Type', handlesTypes, 'light')} />
      <Sword />
    </Lightsaber>
  ),
  {
    notes: dedent`
      # Composing FTW!

      With out composable solution we can now switch out the lightsaber's blade
      with anything that we want while still using all of the other components.
    `
  }
);
