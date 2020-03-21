import React, { useContext } from "react";
import { BackButton } from "./buttons";
import { TitleBar } from "./TitleBar-cmp";
import { useHistory } from "react-router";
import { ViewBottomButtonBar } from "./ViewButtonBar-cmp";

import './AppView-cmp.css';
import { AppLayoutContext } from "./AppLayout-ctx";

export const HistoryBackButton = () => {
    const history = useHistory();
    return <BackButton onClick={history.goBack} />
}

const addCSSClass = className => className ? ` ${className}` : '';

export const AppView = ({
    title,
    titleLeftButton = <HistoryBackButton />,
    titleRightButtonArea = null,
    children,
    bottomBarContent = null,
    className = null,
    infoBar=null
}) => {

    const { width, height } = useContext(AppLayoutContext)

    return <div className={`AppView${addCSSClass(className)}`} style={{ width, height }}>
        <TitleBar
            leftButton={titleLeftButton}
            title={title}
            rightButtonArea={titleRightButtonArea}
        />
        {infoBar}
        {children}
        {bottomBarContent && <ViewBottomButtonBar>
            {bottomBarContent}
        </ViewBottomButtonBar>}
    </div>
}
