import { useEffect, useState } from "react";
import { CheckAvailableInput } from "../components/Inputs/CheckAvailableInput";
import { LabeledInput } from "../components/Inputs/LabeledInput";
import { sleep } from "../utils/helpers";

export const CreateAccount = () => {
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
            const res = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/tenant/valid?companyName=${companyName}`
            );
            if (!res.ok) {
                throw new Error(await res.text());
            }
            const data = await res.json();
            await sleep(1000);
            setIsNameValid(data.isValid);
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
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
                <button disabled={disableCreateButton} className="btn mt-3">
                    Create
                </button>
            </main>
        </div>
    );
};
