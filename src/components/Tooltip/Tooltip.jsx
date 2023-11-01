import { useContext } from 'react';

import { AppContext } from 'contexts/AppContext';

import './Tooltip.css';

function Tooltip({ children }) {
  const { isError } = useContext(AppContext);

  return (
    <div className={isError ? 'tooltip tooltip_visible' : 'tooltip'}>
      {children}
    </div>
  );
}

export default Tooltip;
