import React, { ButtonHTMLAttributes, useMemo } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface Props {
    children: React.ReactNode;
    loading?: boolean;
}

export const LoadableButton = ({
    children,
    loading,
    ...args
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { className } = args;

    const buttonClasses = useMemo(() => {
        let classes = "btn ";
        if (className) {
            classes = classes + className;
        }
        return classes;
    }, [className]);
    return (
        <button {...args} className={buttonClasses}>
            {loading ? (
                <span className="flex justify-center">
                    <BiLoaderAlt className="animate-spin h-5 w-5" />
                </span>
            ) : (
                children
            )}
        </button>
    );
};
