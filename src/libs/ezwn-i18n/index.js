import React, { useState } from "react";

import fr from './flags/fr.svg';
import tw from './flags/tw.svg';

import './index.css';

const Context = React.createContext();

export const LocalizationProvider = ({ children }) => {
    const [lang, setLang] = useState('fr');

    return <Context.Provider value={{ lang, setLang }}>
        {children}
    </Context.Provider>
}

export const Localized = ({ children, lang: contextLang }) => <Context.Consumer>
    {({ lang }) => lang === contextLang ? <>{children}</> : <></>}
</Context.Consumer>;

export const LanguageSelector = () => <Context.Consumer>
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
</Context.Consumer>;
