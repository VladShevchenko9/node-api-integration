let modal = null;

function setModal() {
    const modalId = 'add_user_modal';

    if (!modal) {
        modal = new bootstrap.Modal(document.getElementById('add_user_modal'));
    }
}

function showModal() {
    modal.show();
}

function hideModal() {
    modal.hide();
}
