import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthProvider } from "./auth";
import { useGetSubDomain } from "./hooks/useGetSubDomain";
import { TenantRoutes } from "./TenantRoutes";
import { redirectToPublic } from "./utils/helpers";
import { CreateTenant } from "./views/CreateTenant";

function App() {
    const { isValid, subDomain } = useGetSubDomain();

    if (!isValid) {
        redirectToPublic();
    }

    //Its on subdomain so we take them to the tenant routes
    if (subDomain) {
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
