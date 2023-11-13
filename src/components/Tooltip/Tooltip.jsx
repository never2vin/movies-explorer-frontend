import { useContext, useEffect } from 'react';
import './Tooltip.css';

import { useLocation } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import { MESSAGES } from 'utils/constants';

function Tooltip() {
  const { pathname } = useLocation();
  const { state, status, setState } = useContext(AppContext);

  useEffect(() => {
    if (state !== 'idle') setState('idle');

    // eslint-disable-next-line
  }, [pathname]);

  return (
    <div className={state !== 'idle' ? 'tooltip tooltip_visible' : 'tooltip'}>
      <p className={`tooltip__text tooltip__${state}-text`} id="description">
        {pathname === '/movies' && (
          <span className="tooltip__error-status">{status}</span>
        )}
        {MESSAGES[pathname][status]}
      </p>
    </div>
  );
}

export default Tooltip;
