async function getCurrentUserIfExists() {
    const userId = getUserIdFromQuery();
    if (!userId) {
        alert('The userId parameter was not passed');
    }
    const user = await getUserData(userId);
    if (!user) {
        window.location = "/work/node-api-integration/html/registration.html"
    }
    return user;
}

function getUserIdFromQuery() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('userId');
}
