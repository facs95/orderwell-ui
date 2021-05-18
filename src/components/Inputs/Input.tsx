import React, { InputHTMLAttributes, useMemo } from "react";

export const Input = ({ ...args }: InputHTMLAttributes<HTMLInputElement>) => {
    const { className } = args;

    const inputClasses = useMemo(() => {
        let classes =
            "shadow-sm appearance-none border w-full py-2 px-3 text-grey-darker ";
        if (className) {
            classes = classes + className;
        }
        return classes;
    }, [className]);

    return <input type="text" {...args} className={inputClasses} />;
};
