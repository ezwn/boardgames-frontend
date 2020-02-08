import React from "react";
import { BackButton } from "./buttons";
import { TitleBar } from "./TitleBar-cmp";
import { useHistory } from "react-router";
import { ViewBottomButtonBar } from "./ViewButtonBar-cmp";

import './AppView-cmp.css';

export const HistoryBackButton = () => {
    const history = useHistory();
    return <BackButton onClick={history.goBack} />
}

const addCSSClass = className => className ? ` ${className}`: '';

export const AppView = ({
    title,
    titleLeftButton = <HistoryBackButton />,
    titleRightButtonArea = null,
    children,
    bottomBarContent = null,
    className = null
}) => {
    return <div className={`AppView${addCSSClass(className)}`}>
        <TitleBar
            leftButton={titleLeftButton}
            title={title}
            rightButtonArea={titleRightButtonArea}
        />
        {children}
        {bottomBarContent && <ViewBottomButtonBar>
            {bottomBarContent}
        </ViewBottomButtonBar>}
    </div>
}