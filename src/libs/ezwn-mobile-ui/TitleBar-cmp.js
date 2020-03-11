import React from "react";
import './TitleBar-cmp.css';
import { titleBarHeight } from "./AppLayout-ctx";

export const TitleBar = ({ leftButton, title, rightButtonArea }) => <div className='TitleBar' style={{ height: `${titleBarHeight}px`, minHeight: `${titleBarHeight}px` }}>
    { leftButton && <div className='leftButton'>{leftButton}</div> }
    <div role='heading' className='title'>{title}</div>
    { rightButtonArea && <div className='rightButtonArea'>{rightButtonArea}</div> }
</div>;
