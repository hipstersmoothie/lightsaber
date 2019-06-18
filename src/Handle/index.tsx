import React from 'react';
import handles from './handles';

export type HandleType = keyof typeof handles;
export const handlesTypes = Object.keys(handles) as HandleType[];

interface HandleProps {
  /** Handle type for your given side */
  type: HandleType;
}

/** The part of the lightsaber you hold */
export const Handle: React.FC<HandleProps> = ({ type }) => handles[type];

export default Handle;
