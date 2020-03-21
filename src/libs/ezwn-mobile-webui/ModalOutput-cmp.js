import React, { useContext, createContext, useState } from "react";

import { AppLayoutContext } from "./AppLayout-ctx";

import './ModalOutput-cmp.css';

export const ModalOutputContext = createContext();

export const ModalOutputProvider = ({ children }) => {
    const [modal, setModal] = useState();
    return <ModalOutputContext.Provider value={{ modal, setModal }}>{children}</ModalOutputContext.Provider>;
}

export const ModalOutput = () => {
    const { width, height } = useContext(AppLayoutContext);
    const { modal } = useContext(ModalOutputContext);

    if (!modal)
        return <></>

    return <div className='ModalOutput' style={{ width, height }}>{modal}</div>
};
