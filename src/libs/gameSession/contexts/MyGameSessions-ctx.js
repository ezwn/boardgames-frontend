import React from 'react';
import * as api from 'libs/gameSession/gameSession-apic';

export const MyGameSessionsContext = React.createContext(null);

export const MyGameSessionsProvider = ({ children, playerId }) => {
    const [myGameSessions, setMyGameSessions] = React.useState([]);

    React.useEffect(() => {
        if (playerId) {
            api.fetchGameSessions(playerId).then((myGameSessions) => {
                setMyGameSessions(myGameSessions);
            })
        }
    }, [playerId]);

    return <MyGameSessionsContext.Provider value={{ myGameSessions }}>
        {children}
    </MyGameSessionsContext.Provider>
};
