import { useMemo } from "react";

//UNHAPPY has a hard coded value for localhost
//and a bunch of if statements
export function useGetSubDomain() {
    const hostArray = useMemo(() => {
        const { host } = window.location;
        return host.split(".");
    }, []);

    if (hostArray.includes("localhost:3000")) {
        if (hostArray.length > 2) {
            return { isValid: false, subDomain: "" };
        }
        if (hostArray.length === 2) {
            return { isValid: true, subDomain: hostArray[0] };
        }
        return { isValid: true, subDomain: "" };
    }
    if (hostArray.length >= 3) {
        return { isValid: true, subDomain: hostArray[0] };
    }
    return { isValid: true, subDomain: "" };
}
