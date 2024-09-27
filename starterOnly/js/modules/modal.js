import { launchModal, closeModal, createOutsideClickListener } from '../script.js';

function initModal() {
    const modalbg = document.querySelector(".bground");
    const modalBtn = document.querySelectorAll(".modal-btn");
    const closeBtn = document.querySelector(".close");
    const modalContent = modalbg.querySelector(".content");

    const handleCloseModal = () => {
        closeModal(modalbg, modalContent);
        document.removeEventListener("click", outsideClickListener);
    };

    let outsideClickListener;

    modalBtn.forEach((btn) => btn.addEventListener("click", () => {
        launchModal(modalbg);
        outsideClickListener = createOutsideClickListener(modalbg, modalContent, handleCloseModal, modalBtn);
        document.addEventListener("click", outsideClickListener);
    }));

    closeBtn.addEventListener("click", handleCloseModal);

    modalContent.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

export { initModal };