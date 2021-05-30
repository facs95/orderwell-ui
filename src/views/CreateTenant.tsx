import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { LoadableButton } from "../components/Inputs/LoadableButton";
import { CheckAvailableInput } from "../components/Inputs/CheckAvailableInput";
import { LabeledInput } from "../components/Inputs/LabeledInput";
import { createTenantFn } from "../queries/tenant";
import { queryFunction, redirectToTenant, sleep } from "../utils/helpers";

export const CreateTenant = () => {
    const createTenant = useMutation(createTenantFn, {
        onSuccess: async (data) => {
            const tenant = await data.json();
            redirectToTenant(tenant.oauthId as string);
        },
    });

    const [isNameValid, setIsNameValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const [companyName, setCompanyName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setIsNameValid(false); //If name changes we should check again
    }, [companyName]);

    const handleVerify = async () => {
        try {
            setLoading(true);
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Access-Control-Allow-Origin", "*");
            const data = await queryFunction(
                `/tenant/valid?companyName=${companyName}`
            );
            await sleep(1000);
            setIsNameValid(data.isValid);
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createTenant.mutate({
            password,
            companyName,
            firstName,
            lastName,
            email,
            phoneNumber,
        });
    };

    const disableCreateButton =
        !isNameValid ||
        !firstName ||
        !lastName ||
        !phoneNumber ||
        !email ||
        !password;

    return (
        <div className="min-h-screen flex items-center justify-center md:bg-gray-200 font-sans">
            <main className="bg-white md:shadow-md rounded p-7 md:min-w-96 lg:w-4/12 md:w-1/4 w-full ">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6 text-2xl font-semibold">
                        Create an Organization
                    </div>

                    <CheckAvailableInput
                        label="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        onCheck={handleVerify}
                        {...{ loading }}
                    />
                    <LabeledInput
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        label="First Name"
                        disabled={!isNameValid}
                    />
                    <LabeledInput
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={!isNameValid}
                    />
                    <LabeledInput
                        label="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        disabled={!isNameValid}
                        type="tel"
                    />
                    <LabeledInput
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isNameValid}
                    />
                    <LabeledInput
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        disabled={!isNameValid}
                    />
                    <LoadableButton
                        loading={createTenant.isLoading}
                        disabled={disableCreateButton}
                        className="mt-3"
                    >
                        Create
                    </LoadableButton>
                </form>
            </main>
        </div>
    );
};
