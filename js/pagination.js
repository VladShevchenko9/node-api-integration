const limit = 5;
let page = 1;

function getCurrentPage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlPage = parseInt(urlParams.get('page'));

    if (urlPage > 0) {
        page = urlPage;
    }
}

function calculateOffset() {
    return limit * (page - 1);
}
