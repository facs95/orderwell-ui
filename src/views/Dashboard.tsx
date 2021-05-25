import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import { useAuthenticatedQuery } from "../hooks/useAuthenticatedQuery";
import {
    EMPLOYEES_DATA,
    getEmployeesPath,
    GET_EMPLOYEE_QUERY,
} from "../queries/employees";

export const Dashboard = () => {
    const { data: employees } = useAuthenticatedQuery<EMPLOYEES_DATA>(
        GET_EMPLOYEE_QUERY,
        getEmployeesPath,
        {
            refetchOnWindowFocus: false,
        }
    );

    console.log("employess", employees);

    const { logoutUser } = useAuth();

    return (
        <div>
            Dashboard
            <p></p>
            <Link to="/orders">Go to orders</Link>
            <p></p>
            <button onClick={logoutUser}>Logout</button>
        </div>
    );
};
