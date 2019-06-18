import React from 'react';

import onSound from './sounds/on.mp3';
import offSound from './sounds/off.mp3';
import humSound from './sounds/hum.wav';
import clashSound from './sounds/clash.mp3';

const useLightSaberHum = <T extends HTMLElement>(active?: boolean) => {
  const element = React.useRef<T>(null);
  const hum: React.MutableRefObject<HTMLAudioElement | null> = React.useRef(
    null
  );
  const soundEffect: React.MutableRefObject<HTMLAudioElement | null> = React.useRef(
    null
  );

  const playSound = (sound: string) => {
    if (soundEffect.current) {
      soundEffect.current.remove();
    }

    soundEffect.current = new Audio(sound);
    soundEffect.current.play();
  };

  const playHum = () => {
    if (!hum.current) {
      hum.current = new Audio(humSound);
      hum.current.loop = true;
    }

    hum.current.play();
  };

  const pauseHum = () => {
    if (hum.current) {
      hum.current.pause();
    }
  };

  React.useLayoutEffect(() => {
    if (active) {
      playSound(onSound);
      playHum();
    } else {
      pauseHum();
      playSound(offSound);
    }

    return pauseHum;
  }, [active]);

  // Attach mouseover even to play clash sound when you mouse over
  // the target element
  React.useEffect(() => {
    const clash = () => playSound(clashSound);

    if (element.current) {
      element.current.addEventListener('mouseover', clash);
    }

    return () => {
      if (element.current) {
        element.current.removeEventListener('mouseover', clash);
      }
    };
  }, []);

  return element;
};

export default useLightSaberHum;
