import React, { InputHTMLAttributes } from "react";
import { LoadableButton } from "./LoadableButton";
import { Input } from "./Input";

interface Props {
    label: string;
    loading?: boolean;
    onCheck: () => Promise<void>;
}

export const CheckAvailableInput = ({
    label,
    loading,
    onCheck,
    ...args
}: Props & InputHTMLAttributes<HTMLInputElement>) => {
    const { value } = args;

    return (
        <div className="mb-4">
            <label
                className="block text-grey-darker text-base font-normal mb-2"
                htmlFor={label}
            >
                {label}
            </label>
            <div className="flex flex-nowrap">
                <Input placeholder={label} {...args} />
                <LoadableButton
                    {...{ loading }}
                    disabled={!value}
                    onClick={onCheck}
                    type="button"
                    className="btn-transparent btn-sm w-32 ml-2"
                >
                    Check
                </LoadableButton>
            </div>
        </div>
    );
};
