export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function redirectToPublic() {
    window.location.href =
        process.env.REACT_APP_UI_BASE_URL || "http://localhost:3000";
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