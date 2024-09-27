function launchModal(modalElement) {
    modalElement.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeModal(contentElement, callback) {
    contentElement.classList.add("modal-close");
    contentElement.setAttribute("disabled", "disabled");
    callback?.();
    document.body.style.overflow = "auto";
}

function resetForm(formElement) {
    formElement.reset();
}

function createOutsideClickListener(modalElement, contentElement, closeModalFunc, openModalBtns) {
    function outsideClickListener(event) {
        if (
            modalElement.style.display !== "none" &&
            !contentElement.contains(event.target) &&
            !Array.from(openModalBtns).some(btn => btn.contains(event.target))
        ) {
            closeModalFunc();
            document.removeEventListener("click", outsideClickListener);
        }
    }
    return outsideClickListener;
}

export { launchModal, closeModal, resetForm, createOutsideClickListener };