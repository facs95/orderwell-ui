export interface TENANT_ID_DATA {
    oauthId: string;
    companyName: string;
}
export const TENANT_ID_QUERY = "tenantId";
export const getTenantIdPath = "/tenant/id";

export interface CREATE_TENANT_VARS {
    email: string;
    companyName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
}
export const CREATE_TENANT_PATH = "/tenant";
export const createTenantFn = (
    body: CREATE_TENANT_VARS,
    token?: string
) => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    if (token) {
        headers.append("Authorization", "Bearer " + token);
    }
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/create-tenant`, {
        headers,
        method: "POST",
        body: JSON.stringify(body),
    });
};
