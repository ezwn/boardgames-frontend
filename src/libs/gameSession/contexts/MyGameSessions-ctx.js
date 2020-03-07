import React from 'react';
import * as api from 'libs/gameSession/gameSession-apic';

export const MyGameSessionsContext = React.createContext(null);

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

        const inteval = setInterval(fetchGameSession, 1000);
        fetchGameSession();

        return () => {
            clearInterval(inteval);
        };
    }, [playerId]);

    return <MyGameSessionsContext.Provider value={{ myGameSessions }}>
        {children}
    </MyGameSessionsContext.Provider>
};
