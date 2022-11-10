import React, { useCallback, useEffect, useState } from "react";

export interface IInputData {
    id: string;
    value: string;
}

interface InputTextProps {
    id: string;
    name: string;
    placeholder?: string;
    valid?: boolean;
    errorMessage?: string;
    value?: string;
    onChange: (_data: IInputData) => void;
    onBlur: (_data: IInputData) => void;
}

const InputText = (props: InputTextProps) => {
    const { id, name, placeholder, valid = true, errorMessage, value, onChange, onBlur } = props;
    const [ valueInt, setValue ] = useState(value ? value : "");
    let cssClassName = "form--input";
    if (!valid) {
        cssClassName += " form--input__error";
    }

    useEffect(() => {
        if(value !== undefined)
            setValue(value);
    }, [value]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLElement>) => {
        const field: string = (e.target as HTMLInputElement).name;
        const fieldValue: string = (e.target as HTMLInputElement).value;
        onChange && onChange({
            id: field,
            value: fieldValue
        })
    }, [onChange]);

    const handleInputBlur = useCallback((e: React.ChangeEvent<HTMLElement>) => {
        const field: string = (e.target as HTMLInputElement).name;
        const fieldValue: string = (e.target as HTMLInputElement).value;
        onBlur && onBlur({
            id: field,
            value: fieldValue
        })
    }, [onBlur]);

    return (
        <div className="input--container">
            <input
                className={cssClassName}
                type="text"
                id={id}
                name={name}
                placeholder={placeholder}
                value={valueInt}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
            />
            {
                errorMessage && <div className="input--error-message">{errorMessage}</div>
            }
        </div>
    );
}

export default React.memo(InputText);