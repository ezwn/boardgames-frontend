import React from "react";

import './ViewButtonBar-cmp.css';
import { bottomButtonBarHeight } from "./AppLayout-ctx";

export const ViewBottomButtonBar = ({ children }) => <div className='ViewBottomButtonBar ButtonBar' style={{
    height: `${bottomButtonBarHeight}px`,
    minHeight: `${bottomButtonBarHeight}px`
    }}>
    {children}
</div>

export const TextButtonBar = ({ children }) => <div className='TextButtonBar ButtonBar'>
    {children}
</div>
