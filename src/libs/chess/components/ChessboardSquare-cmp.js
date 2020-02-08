import React from 'react';
import { isEmpty } from '../contexts/ChessEngine';

import './ChessboardSquare-cmp.css';

export const ChessboardSquare = ({ piece, className = '', onClick = () => { } }) => {

    const pieceClassName = !isEmpty(piece) ? ` piece piece-${piece}` : '';

    return <div onClick={onClick}
        className={`location${pieceClassName}${className ? ' ' + className : ''}`}>
        <div className='innerDiv'>&nbsp;</div>
    </div>
}
