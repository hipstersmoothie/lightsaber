import React, { CSSProperties } from 'react';
import makeClass from 'classnames';

import useLightsaberHum from '../useLightsaberHum';
import styles from '../Lightsaber.css';

interface BladeProps {
  /** The color of the lightsaber */
  color: CSSProperties['color'];
  /** How long the lightsaber should be */
  length?: number;
  /** Whether the lightsaber is active */
  active?: boolean;
}

/** The glowy part of the lightsaber */
const Blade: React.FC<BladeProps> = ({ length, color, active }) => {
  const ref = useLightsaberHum<HTMLDivElement>(active);

  return (
    <div
      ref={ref}
      className={makeClass(styles.blade, { [styles.active]: active })}
      style={{ width: active ? length : 0, background: color, color }}
    />
  );
};

Blade.defaultProps = {
  color: 'lightgreen',
  length: 600,
  active: false
};

export default Blade;
