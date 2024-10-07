// Fonction pour ouvrir le modal
function openModal(modalElement) {
    modalElement.style.display = "flex";
    document.body.style.overflow = "hidden";
}
// ISSUE 1 : fermer la modale
// Fonction pour fermer le modal
function closeModal(contentElement, callback) {
    contentElement.classList.add("modal-close");
    contentElement.setAttribute("disabled", "disabled");
    callback?.();
    document.body.style.overflow = "auto";
}

// Fonction pour réinitialiser le formulaire
function resetForm(formElement) {
    formElement.reset();
}

// ISSUE 1 : ferme la modale si on clique en dehors
// Fonction pour gérer le clic à l'extérieur du modal
function handleOutsideClick(modalElement, contentElement, closeModalFunc, openModalBtns) {
    const outsideClickListener = (event) => {
        if (
            modalElement.style.display !== "none" &&
            !contentElement.contains(event.target) &&
            !Array.from(openModalBtns).some(btn => btn.contains(event.target))
        ) {
            closeModalFunc();
            document.removeEventListener("click", outsideClickListener);
        }
    };
    document.addEventListener("click", outsideClickListener);
}

export { openModal, closeModal, resetForm, handleOutsideClick };