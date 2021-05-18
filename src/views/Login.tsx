import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../auth";
import { LabeledInput } from "../components/Inputs/LabeledInput";

export const Login = () => {
    const { user, loginUser } = useAuth();
    const history = useHistory();
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

    if (user) {
        history.push("/");
    }

    return (
        <div className="min-h-screen flex items-center justify-center md:bg-gray-200 font-sans">
            <main className="bg-white md:shadow-md rounded p-7 md:min-w-96 lg:w-4/12 md:w-1/4 w-full ">
                <form onSubmit={handleLogin}>
                    <div className="mb-6 text-2xl font-semibold">
                        Welcome to Company Name
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
                        disabled={disableButton}
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
