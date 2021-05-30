export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function redirectToPublic() {
    window.location.href =
        "https://" + process.env.REACT_APP_UI_BASE_URL ||
        "http://localhost:3000";
}

export function redirectToTenant(subDomain: string) {
    window.location.href =
        `https://${subDomain}.${process.env.REACT_APP_UI_BASE_URL}` ||
        "http://localhost:3000";
}

//Handles fetch request
export const queryFunction = async (url: string, token?: string) => {
    let headers = new Headers();
    if (token) {
        headers.append("Authorization", "Bearer " + token);
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
    }
    const response = await fetch(
        `https://${process.env.REACT_APP_API_BASE_URL}${url}`,
        { headers }
    );
    if (!response.ok) {
        throw new Error(await response.text());
    }
    return response.json();
};

export function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}