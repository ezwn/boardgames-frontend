import React, { useContext } from "react";

import { BackendStatusContext } from "../contexts/BackendStatus-ctx";
import { AppLayoutContext } from "libs/ezwn-mobile-webui/AppLayout-ctx";

import './BackendDownWarning-cmp.css';

export const BackendDownWarning = () => {
    const { width, height } = useContext(AppLayoutContext);
    const { up } = useContext(BackendStatusContext);

    if (up)
        return <></>

    return <div className='BackendDownWarning' style={{ width, height }}>
        <div>La connexion est interrompue. Patience...</div>
    </div>
};
