import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Dashboard } from "./views/Dashboard";
import { Login } from "./views/Login";
import { Orders } from "./views/Orders";
import { useAuth } from "./auth";

export const TenantRoutes = () => {
    const { user } = useAuth();

    if (user)
        return (
            <Switch>
                <Route path="/" exact component={() => <Dashboard />} />
                <Route path="/orders" exact component={() => <Orders />} />
                <Redirect to="/" />
            </Switch>
        );

    return (
        <Switch>
            <Route path="/login" exact component={() => <Login />} />
            <Redirect to="/login" />
        </Switch>
    );
};
