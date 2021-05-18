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
    const { data } = useAuthenticatedQuery<EMPLOYEES_DATA>(
        GET_EMPLOYEE_QUERY,
        getEmployeesPath,
        {
            refetchOnWindowFocus: false,
        }
    );

    console.log("data2", data);

    const { user, logoutUser } = useAuth();

    console.log("user", user);

    return (
        <div>
            Dashboard
            <p></p>
            <Link to="/orders">Orders</Link>
            <p></p>
            <button onClick={logoutUser}>Logout</button>
        </div>
    );
};
