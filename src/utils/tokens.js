export const hajjAuthName = 'faceAuthTokenData';


// Storing Token in storage
export const setTokens = (data) => {
    localStorage.setItem(hajjAuthName, JSON.stringify(data));
}

// Retriving Token in storage
export const getToken = () => {
    const data = localStorage.getItem(hajjAuthName);
    return JSON.parse(data);
}
// Deleting Token in storage
export const deleteToken = () => {
    localStorage.clear(hajjAuthName);
}

