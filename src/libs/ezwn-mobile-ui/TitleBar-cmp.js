import React from "react";
import './TitleBar-cmp.css';

export const TitleBar = ({ leftButton, title, rightButtonArea }) => <div className='TitleBar'>
    { leftButton && <div className='leftButton'>{leftButton}</div> }
    <div className='title'>{title}</div>
    { rightButtonArea && <div className='rightButtonArea'>{rightButtonArea}</div> }
</div>;
