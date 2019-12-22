import React from 'react';

import { getInitials } from 'utils';
import './styles.scss';

interface InitialIcon {
  name: string;
}

const InitialIcon = ({ name }: InitialIcon) => <div className="initial-icon" data-letters={getInitials(name)}></div>;

export default InitialIcon;
