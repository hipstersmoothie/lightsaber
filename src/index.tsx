import React, { CSSProperties } from 'react';
import makeClass from 'classnames';

import styles from './Lightsaber.css';
import Handle, { HandleType } from './Handle';
import Blade from './Blade';
import { Element } from './utils';

/** The casing for the blade and handle */
export const Lightsaber: React.FunctionComponent<Element<'div'>> = ({
  className,
  children,
  ...html
}) => (
  <div {...html} className={makeClass(styles.body, className)}>
    {children}
  </div>
);

interface LightsaberBuilderProps extends Element<'div'> {
  color: CSSProperties['color'];
  active?: boolean;
  handleType: HandleType;
}

export const LightsaberBuilder: React.FunctionComponent<
  LightsaberBuilderProps
> = ({ color, active, handleType, ...html }) => (
  <Lightsaber {...html}>
    <Handle type={handleType} />
    <Blade color={color} active={active} />
  </Lightsaber>
);

LightsaberBuilder.defaultProps = {
  color: 'lightgreen',
  active: false
};

export default LightsaberBuilder;
