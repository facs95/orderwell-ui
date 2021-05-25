import React from "react";
import { Link } from "react-router-dom";
import { useAuthenticatedQuery } from "../hooks/useAuthenticatedQuery";
import {
    getOrdersPath,
    GET_ORDERS_QUERY,
    ORDERS_DATA,
} from "../queries/orders";

export const Orders = () => {
    const { data: orders } = useAuthenticatedQuery<ORDERS_DATA>(
        GET_ORDERS_QUERY,
        getOrdersPath
    );

    console.log('orders', orders)
    return (
        <div>
            Orders
            <p></p>
            <Link to="/">Dashboard</Link>
        </div>
    );
};
