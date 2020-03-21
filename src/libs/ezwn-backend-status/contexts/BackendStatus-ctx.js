import React from "react";

import * as api from "libs/ezwn-backend-status/backendStatus-apic";

const refreshDuration = parseInt(process.env.REACT_APP_REFRESH_DURATION);

export const BackendStatusContext = React.createContext(null);

export const BackendStatusProvider = ({ children }) => {
  const [up, setUp] = React.useState(null);

  React.useEffect(() => {
    function fetchBackendStatus() {
      api
        .fetchBackendStatus()
        .then(serverUp => {
          setUp(serverUp);
        })
        .catch(() => {
          setUp(false);
        });
    }

    const inteval = setInterval(fetchBackendStatus, refreshDuration);
    fetchBackendStatus();

    return () => {
      clearInterval(inteval);
    };
  }, []);


  return <BackendStatusContext.Provider value={{ up }}  >
    {children}
  </BackendStatusContext.Provider>;
};
