import { useMemo } from "react";

//UNHAPPY has a hard coded value for localhost
//and a bunch of if statements
export function useGetSubDomain() {
    const publicDomain = process.env.REACT_APP_UI_BASE_URL || "";
    const { host } = window.location;
    const hostArray = useMemo(() => {
        return host.split(".");
    }, [host]);

    if (host === publicDomain || host === "www." + publicDomain) {
        return { subDomain: "" };
    }

    if (hostArray.length >= 2) {
        return { subDomain: hostArray[0] };
    }

    return { subDomain: "" };
}
