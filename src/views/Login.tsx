import React, { useState } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../auth";
import { LabeledInput } from "../components/Inputs/LabeledInput";
import {
    getTenantIdPath,
    TENANT_ID_DATA,
    TENANT_ID_QUERY,
} from "../queries/tenant";
import { capitalizeFirstLetter, queryFunction } from "../utils/helpers";

export const Login = () => {
    const { data } = useQuery<TENANT_ID_DATA>(
        TENANT_ID_QUERY,
        () => queryFunction(getTenantIdPath),
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        }
    );

    const { loginUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const disableButton = !email || !password;

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            loginUser(email, password);
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    };

    if (!data) return <></>;

    return (
        <div className="min-h-screen flex items-center justify-center md:bg-gray-200 font-sans">
            <main className="bg-white md:shadow-md rounded p-7 md:min-w-96 lg:w-4/12 md:w-1/4 w-full ">
                <form onSubmit={handleLogin}>
                    <div className="mb-6 text-2xl font-semibold">
                        Welcome to{" "}
                        {capitalizeFirstLetter(data.companyName)}
                    </div>
                    <LabeledInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                    />
                    <LabeledInput
                        label="Password"
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        disabled={disableButton || loading}
                        type="submit"
                        className="btn mt-3"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </main>
        </div>
    );
};
