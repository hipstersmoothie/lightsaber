import React from 'react';
import makeClass from 'classnames';
import styles from './sword.css';

import swordSound from '../sounds/sword.mp3';
import { Element } from '../utils';

const OldBlade: React.FC<Element<'div'>> = ({ className, ...html }) => (
  <div
    {...html}
    className={makeClass(styles.sword, className)}
    onMouseOver={() => {
      const sound = new Audio(swordSound);
      sound.play();
    }}
  >
    <div className={styles['sword-top']} />
    <div className={styles['sword-left']} />
    <div className={styles['sword-right']} />
    <div className={styles['sword-bottom']} />
  </div>
);

export default OldBlade;
