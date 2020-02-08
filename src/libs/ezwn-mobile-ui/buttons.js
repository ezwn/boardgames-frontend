import React from "react";
import './buttons.css';

const Button = ({ icon, onClick, disabled }) => <div
    onClick={disabled ? undefined : onClick}
    className={'Button' + (disabled ? ' disabled' : '')}>
    {icon}
</div>;

export const BackButton = (props) => <Button {...props} icon={<i className='fas fa-arrow-left'></i>} />;

export const CreateButton = (props) => <Button {...props} icon={<i className='fas fa-plus'></i>} />;

export const UndoButton = (props) => <Button {...props} icon={<i className='fas fa-backward'></i>} />;

export const ValidateButton = (props) => <Button {...props} icon={<i className='fas fa-check'></i>} />;

export const StopButton = (props) => <Button {...props} icon={<i className='fas fa-stop'></i>} />;

export const CancelButton = (props) => <Button {...props} icon={<i className='fas fa-times'></i>} />;