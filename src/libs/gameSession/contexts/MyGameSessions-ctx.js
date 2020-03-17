import React from 'react';
import * as api from 'libs/gameSession/gameSession-apic';

export const MyGameSessionsContext = React.createContext(null);

const refreshDuration = parseInt(process.env.REACT_APP_REFRESH_DURATION);

export const MyGameSessionsProvider = ({ children, playerId }) => {
    const [myGameSessions, setMyGameSessions] = React.useState([]);

    React.useEffect(() => {
        function fetchGameSession() {
            if (playerId) {
                api.fetchGameSessions(playerId).then((myGameSessions) => {
                    setMyGameSessions(myGameSessions);
                })
            }
        }

        const inteval = setInterval(fetchGameSession, refreshDuration);
        fetchGameSession();

        return () => {
            clearInterval(inteval);
        };
    }, [playerId]);

    return <MyGameSessionsContext.Provider value={{ myGameSessions }}>
        {children}
    </MyGameSessionsContext.Provider>
};
