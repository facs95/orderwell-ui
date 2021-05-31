export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function redirectToPublic() {
    window.location.href = process.env.REACT_APP_UI_BASE_URL || "http://localhost:3000";
}

export function redirectToTenant(subDomain: string) {
    window.location.href =
        `${subDomain}.${process.env.REACT_APP_UI_BASE_URL}` || "http://localhost:3000";
}

export function getWWWDomain() {
    const url = process.env.REACT_APP_UI_BASE_URL || 'http://localhost:3000';
    const urlArr = url.split("//");
    return `www.${urlArr[1]}`;
}

//Handles fetch request
export const queryFunction = async (url: string, token?: string) => {
    let headers = new Headers();
    if (token) {
        headers.append("Authorization", "Bearer " + token);
        headers.append("Content-Type", "application/json");
    }
    const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}${url}`,
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
