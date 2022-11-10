import React from "react";

interface InputLabelProps {
    id: string;
    label: string;
    required?: boolean;
}

/**
 * Used for data entry in the MovieForm component, label for InputText
 * @param {InputLabelProps} props
 * @param {string} props.id - the id that will match the label,
 * @param {string} props.label - the label that will be shown
 * @param {boolean} [props.required = false] - if label is required, display a '*' symbol
 * @returns {React.FC<InputLabelProps>} - the React component
 */
const InputLabel = (props: InputLabelProps) => {
    const { id, label, required = false } = props;

    return (
        <label
            className="input--label"
            htmlFor={id}>
            {label}
            {required && <span className="input--label__required">*</span>}
        </label>
    );
}

export default InputLabel;