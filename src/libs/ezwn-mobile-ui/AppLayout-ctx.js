import React, { useState, useEffect } from "react";

export const AppLayoutContext = React.createContext({});

export const titleBarHeight = 56;
export const infoBarHeight = 30;
export const bottomButtonBarHeight = 79;

const computeLayout = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        centerAreaWidth: window.innerWidth,
        centerAreaHeight: window.innerHeight - titleBarHeight - infoBarHeight - bottomButtonBarHeight
    }
}

export const AppLayoutProvider = ({ children }) => {
    const [size, setSize] = useState(computeLayout());

    useEffect(() => {
        let updateWindowDimensions = window.addEventListener(
            'resize',
            () => setSize(computeLayout())
        );
        return () => window.removeEventListener('resize', updateWindowDimensions);
    }, []);

    return <AppLayoutContext.Provider value={size}>
        {children}
    </AppLayoutContext.Provider>
}