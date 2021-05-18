import React, { InputHTMLAttributes } from "react";
import { Input } from "./Input";

interface Props {
    label: string;
}

export const LabeledInput = ({
    label,
    ...args
}: Props & InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className="mb-4">
            <label
                className="block text-grey-darker text-base font-normal mb-2"
                htmlFor={label}
            >
                {label}
            </label>
            <Input placeholder={label} {...args} />
        </div>
    );
};
