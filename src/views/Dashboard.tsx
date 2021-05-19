import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import { useAuthenticatedQuery } from "../hooks/useAuthenticatedQuery";
import {
    EMPLOYEES_DATA,
    getEmployeesPath,
    GET_EMPLOYEE_QUERY,
} from "../queries/employees";
import { getOrdersPath, GET_ORDERS_QUERY, ORDERS_DATA } from "../queries/orders";

export const Dashboard = () => {
    const { data: employees } = useAuthenticatedQuery<EMPLOYEES_DATA>(
        GET_EMPLOYEE_QUERY,
        getEmployeesPath,
        {
            refetchOnWindowFocus: false,
        }
    );

    const { data:orders } = useAuthenticatedQuery<ORDERS_DATA>(
        GET_ORDERS_QUERY,
        getOrdersPath,
        {
            refetchOnWindowFocus: false,
        }
    );

    console.log("employess", employees);
    console.log("orders", orders);

    const { user, logoutUser } = useAuth();

    console.log("user", user?.uid);

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
