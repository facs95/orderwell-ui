import React, { InputHTMLAttributes } from "react";
import { BiLoaderAlt } from "react-icons/bi";
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
                <button
                    disabled={!value}
                    onClick={onCheck}
                    type="button"
                    className="btn btn-transparent btn-sm w-32 ml-2"
                >
                    {loading ? (
                        <span className="flex justify-center">
                            <BiLoaderAlt className="animate-spin h-5 w-5" />
                        </span>
                    ) : (
                        "Check"
                    )}
                </button>
            </div>
        </div>
    );
};
