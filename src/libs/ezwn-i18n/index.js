import React, { useState } from "react";

import fr from './flags/fr.svg';
import tw from './flags/tw.svg';

import './index.css';

export const LocalizationContext = React.createContext();

export const LocalizationProvider = ({ children }) => {
    const [lang, setLang] = useState('fr');

    return <LocalizationContext.Provider value={{ lang, setLang }}>
        {children}
    </LocalizationContext.Provider>
}

export const Localized = ({ children, lang: contextLang }) => <LocalizationContext.Consumer>
    {({ lang }) => lang === contextLang ? <>{children}</> : <></>}
</LocalizationContext.Consumer>;

export const LanguageSelector = () => <LocalizationContext.Consumer>
    {
        ({ setLang }) => <div className='LanguageSelector'>
            <div className='flag' onClick={() => setLang('fr')}>
                <img src={fr} width='40px' alt='fr' />
            </div>
            <div className='flag' onClick={() => setLang('tw')}>
                <img src={tw} width='40px' alt='tw' />
            </div>
        </div>
    }
</LocalizationContext.Consumer>;
