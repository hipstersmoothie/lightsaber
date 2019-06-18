import React from 'react';

import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';

import Lightsaber from '.';
import notes from './README.md';

const stories = storiesOf('Components|Lightsaber', module);

stories.addDecorator(centered);
stories.addParameters({ notes });
stories.addParameters({ jsx: { skip: 2 } });

stories.add('Basic', () => <Lightsaber />);
