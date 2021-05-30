import { useMemo } from "react";
import { getWWWDomain } from "../utils/helpers";

//UNHAPPY has a hard coded value for localhost
//and a bunch of if statements
export function useGetSubDomain() {
    const publicDomain = process.env.PUBLIC_URL;
    const { host } = window.location;
    const hostArray = useMemo(() => {
        return host.split(".");
    }, [host]);
    
    if (host === publicDomain.split("//")[1] || host === getWWWDomain()) {
        return { isValid: false, subDomain: "" };
    }

    if (hostArray.length >= 2) {
        return { isValid: true, subDomain: hostArray[0] };
    }

    return { isValid: true, subDomain: "" };
}
