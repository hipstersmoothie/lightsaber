import React from 'react';
import { render } from '@testing-library/react';
import Lightsaber from '.';

test('It matches the snapshot', () => {
  const { container } = render(<Lightsaber />);
  expect(container).toMatchSnapshot();
});
