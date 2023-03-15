async function getUserData(userId) {
    let response = null;
    try {
        response = await axios.get('http://localhost:3000/user/' + userId);

    } catch (error) {
        alert('User not found');
        return null;
    }
    return response.data;
}

async function loadUsers() {
    let response = null;
    try {
        response = await axios.get('http://localhost:3000/user/', {
            params: {
                limit: limit,
                offset: calculateOffset(),
            }
        });

    } catch (e) {
        alert('Something went wrong');
        return [];
    }
    return response.data;
}

async function deleteUser(userId) {
    try {
        await axios.delete('http://localhost:3000/user/' + userId);
    } catch (e) {
        alert('User not found');
    }
    return null;
}

async function editUser(userId, requestData, callback = null) {
    let response = null;
    try {
        response = await axios.patch('http://localhost:3000/user/' + userId, requestData);

    } catch (e) {
        if (callback && typeof callback === 'function') {
            callback(e);
        }
        return null;
    }

    return response.data;
}

async function addUser(requestData, callback = null) {
    let response = null;
    try {
        response = await axios.post('http://localhost:3000/user', requestData);

    } catch (error) {
        if (callback && typeof callback === 'function') {
            callback(error);
        }
        return null;
    }
    return response.data;
}
