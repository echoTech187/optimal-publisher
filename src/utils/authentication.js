function checkAuthentication() {
    const session = window.localStorage.getItem("token");
    const expired = Number(window.localStorage.getItem("expires_in"));
    if (session && Number(expired) > Date.now()) {
        return true;
    } else {
        return false;
    }
};

function getToken() {
    return window.localStorage.getItem("token");
}


function logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("expires_in");
    window.location.href = "/";
}

export { checkAuthentication, getToken, logout };