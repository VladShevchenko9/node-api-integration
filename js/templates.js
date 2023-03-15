let validationData = {
    errorsElementId: ''
};

async function refreshUsersTable() {
    const users = await loadUsers();
    let html = '';
    for (const user of users) {
        html += `
            <tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.phoneNumber}</td>
                <td>
                    <button type="button" onclick="showEditUserModal(this)" class="btn btn-info edit-user" data-user-id="${user.id}">Edit</button>
                    <button type="button" onclick="deleteUserTableRecord(this)" class="btn btn-danger delete-user" data-user-id="${user.id}">Delete</button>
                </td>
            </tr>
        `;
    }
    if (html === '') {
        disableElementById('nextButton');
        document.getElementById('alertMessage').style.display = 'block';
        document.querySelector("body > div > table").style.display = 'none';
        return;
    }
    document.querySelector("body > div > table > tbody").innerHTML = html;
}

async function showEditUserModal(button) {
    let userId = button.getAttribute("data-user-id");
    let user = await getUserData(userId);
    document.getElementById('user-id').value = userId;
    document.getElementById('first_name').value = user.firstName;
    document.getElementById('last_name').value = user.lastName;
    document.getElementById('phone').value = user.phoneNumber;
    document.getElementById('email').value = user.email;
    document.getElementById('add_user_title').style.display = "none";
    document.getElementById('edit_user_title').style.display = "inline";
    document.getElementById('edit_user').style.display = 'inline';
    document.getElementById('add_user').style.display = 'none';
    document.getElementById('userValidationAlert').style.display = 'none';
    document.getElementById('userValidationAlert').innerHTML = '';
    showModal();
}

async function showAddUserModal() {
    document.getElementById('first_name').value = '';
    document.getElementById('last_name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('add_user_title').style.display = "inline";
    document.getElementById('edit_user_title').style.display = "none";
    document.getElementById('edit_user').style.display = 'none';
    document.getElementById('add_user').style.display = 'inline';
    document.getElementById('userValidationAlert').style.display = 'none';
    document.getElementById('userValidationAlert').innerHTML = '';
    showModal();
}

async function deleteUserTableRecord(button) {
    let userId = button.getAttribute("data-user-id");
    await deleteUser(userId);
    await refreshUsersTable();
}

function setWelcomeMassage(user) {
    document.getElementById("TitleFirstName").innerHTML = user.firstName;
    document.getElementById("TitleLastName").innerHTML = user.lastName;
    document.querySelector("body > div > h1").style.display = "inline";
}

function parseValidationErrors(error) {
    if (error.response?.data?.message) {
        if (Array.isArray(error.response.data.message)) {
            if (!validationData.errorsElementId) {
                alert('No way to display validation errors');
                return;
            }
            const errorMessages = error.response.data.message;
            let htmlErrors = '';
            for (let i = 0; i < errorMessages.length; i++) {
                if (i < errorMessages.length - 1) {
                    htmlErrors += errorMessages[i] + "<br>";
                    continue;
                }
                htmlErrors += errorMessages[i];

            }
            const validationErrors = document.getElementById(validationData.errorsElementId);
            validationErrors.innerHTML = htmlErrors;
            validationErrors.style.display = "block";
        } else if (typeof error.response.data.message === "string") {
            alert(error.response.data.message);
        } else {
            alert('Something went wrong!');
        }
    }
}

function maskPhone() {
    const phone = document.getElementById('phone');
    return IMask(phone, {
        mask: "+38 (000) 000-00-00"
    });
}

function getPhoneValue() {
    let maskedPhone = maskPhone();
    return '+38' + maskedPhone.unmaskedValue;
}

function hidePreviousBtnIfNeeded() {
    if (page === 1) {
        disableElementById('previousButton');
    }
}


function disableElementById(id) {
    const element = document.getElementById(id);
    if (!element.classList.contains('disabled')) {
        element.classList.add("disabled");
    }
}
