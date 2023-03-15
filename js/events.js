document.addEventListener('DOMContentLoaded', async function () {
    setModal();
    maskPhone();
    getCurrentPage();
    const user = await getCurrentUserIfExists();
    setWelcomeMassage(user);
    await refreshUsersTable();
    addEditUserClickListener();
    addUserClickListener();
    hidePreviousBtnIfNeeded();
    addPaginationBtnClickListener('previousButton', page - 1);
    addPaginationBtnClickListener('nextButton', page + 1);
    // console.log(await getNumberOfPages());
});

function addEditUserClickListener() {
    document.getElementById('edit_user').addEventListener('click', async function () {
        const requestData = {
            firstName: document.getElementById("first_name").value,
            lastName: document.getElementById("last_name").value,
            email: document.getElementById("email").value,
            phoneNumber: getPhoneValue(),
        };
        const userId = document.getElementById('user-id').value;
        validationData.errorsElementId = 'userValidationAlert';
        const user = await editUser(userId, requestData, parseValidationErrors);
        if (user) {
            hideModal();
            refreshUsersTable();
        }
    });
}

function addUserClickListener() {
    document.getElementById('add_user').addEventListener('click', async function () {
        const requestData = {
            firstName: document.getElementById("first_name").value,
            lastName: document.getElementById("last_name").value,
            email: document.getElementById("email").value,
            phoneNumber: getPhoneValue(),
        };
        validationData.errorsElementId = 'userValidationAlert';
        const user = await addUser(requestData, parseValidationErrors);
        if (user) {
            hideModal();
            refreshUsersTable();
        }
    })
}

function addPaginationBtnClickListener(buttonId, newPage) {
    const button = document.getElementById(buttonId);

    button.addEventListener('click', function () {
        if (button.classList.contains('disabled')) {
            return;
        }
        const userId = getUserIdFromQuery();
        const params = new URLSearchParams({
            userId: userId,
            page: newPage,
        });
        window.location = "http://localhost/work/node-api-integration/html/userTable.html?" + params.toString();
    });
}

// async function getNumberOfPages() {
//     page = 0;
//     let users;
//
//     do {
//         page++;
//         users = await loadUsers();
//
//     } while (users.length);
//     return page - 1;
// }

// async function getNumberOfPages() {
//     page = 0;
//     let users = [];
//     let flag = true;
//     while (users.length || flag) {
//         flag = false;
//         page++;
//         users = await loadUsers();
//     }
//     return page - 1;
// }
// async function getNumberOfPages() {
//     const maxTries = 50;
//     let i = 0;
//
//     for (i, page = 1; i < maxTries && (await loadUsers()).length; i++, page++) {
//
//     }
//     return i;
// }
