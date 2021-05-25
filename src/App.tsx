import React, { useMemo } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthProvider } from "./auth";
import { TenantRoutes } from "./TenantRoutes";
import { redirectToPublic } from "./utils/helpers";
import { CreateTenant } from "./views/CreateTenant";

function App() {
    const hostArray = useMemo(() => {
        const { host } = window.location;
        return host.split(".");
    }, []);

    if (hostArray.length > 2) {
        redirectToPublic();
    }

    //Its on subdomain so we take them to the tenant routes
    if (hostArray.length === 2) {
        return (
            <BrowserRouter>
                <AuthProvider>
                    <TenantRoutes />
                </AuthProvider>
            </BrowserRouter>
        );
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={() => <CreateTenant />} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
