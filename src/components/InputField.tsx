import React from "react";



type InputFieldProps = {
    label: string;
    type: string;
    id: string;
    name: string;
    placeholder: string;
    value: string;
    onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = React.memo(
    ({ label, type, id, name, placeholder, value, onchange }: InputFieldProps) => {
        return (
            <div className="mb-1 flex flex-col gap-2 justify-between items-baseline">
                <label htmlFor={id} className="block text-purple text-sm font-bold">
                    {label}
                </label>
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onchange}
                    className="appearance-none border-b-2 border-purple rounded w-full py-1 px-2 text-purple leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
        )
    }
);


export default InputField;
