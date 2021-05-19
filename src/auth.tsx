import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { firebaseClient } from "./firebase";
import { useQuery } from "react-query";
import {
    getTenantIdPath,
    TENANT_ID_DATA,
    TENANT_ID_QUERY,
} from "./queries/tenant";
import { queryFunction, redirectToPublic } from "./utils/helpers";
import { useCookies } from "react-cookie";

const AuthContext =
    createContext<{
        user: firebaseClient.User | null;
        tenantId: string;
    } | null>(null);

interface Props {
    children: React.ReactNode;
}

export const TOKEN_NAME = "token";

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<firebaseClient.User | null>(null);
    const [userLoding, setUserLoading] = useState(true);
    const [, setCookie] = useCookies([TOKEN_NAME]);

    const { data, isLoading, isError } = useQuery<TENANT_ID_DATA>(
        TENANT_ID_QUERY,
        () => queryFunction(getTenantIdPath),
        {
            refetchOnWindowFocus: false,
        }
    );

    useEffect(() => {
        //REdirect to public if its not valid tenantID
        if (!isLoading && isError) {
            redirectToPublic();
        }
    }, [isError, isLoading]);

    // listen for token changes
    // call setUser and write new token as a cookie
    useEffect(() => {
        return firebaseClient.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                setCookie("token", "", { path: "/" });
                setUser(null);
            } else {
                const token = await user.getIdToken();
                setCookie("token", token, { path: "/" });
                setUser(user);
            }
            setUserLoading(false)
        });
    }, [setCookie]);

    // force refresh the token every 10 minutes
    useEffect(() => {
        const handle = setInterval(async () => {
            const user = firebaseClient.auth().currentUser;
            if (user) await user.getIdToken(true);
        }, 10 * 60 * 1000);

        // clean up setInterval
        return () => clearInterval(handle);
    }, []);

    if (isLoading || userLoding || isError) return <div>Loading...</div>;

    return (
        <AuthContext.Provider value={{ user, tenantId: data?.oauth_id ?? "" }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth should only be used inside of provider");
    }

    const { user, tenantId } = context;

    const auth = useMemo(() => {
        if (tenantId) {
            firebaseClient.auth().tenantId = tenantId;
        }
        return firebaseClient.auth();
    }, [tenantId]);

    const loginUser = async (email: string, pass: string) => {
        await auth.signInWithEmailAndPassword(email, pass);
    };

    const logoutUser = () => {
        auth.signOut();
    };

    return { user, loginUser, logoutUser };
};
