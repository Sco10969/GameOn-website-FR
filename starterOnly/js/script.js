import {
    textValidators,
    emailValidators,
    numberValidators,
    radioValidators,
    checkboxValidators,
    validateInput,
} from "./modules/validation.js";

import {
    openModal,
    closeModal,
    resetForm,
    handleOutsideClick,
} from "./modules/modal.js";

// Initialisation de la navigation
function initNav() {
    const menuBurger = document.getElementById("menuBurger");
    menuBurger.onclick = toggleNavigation;
}

// Fonction pour basculer la navigation
function toggleNavigation() {
    const navigation = document.getElementById("myTopnav");
    navigation.classList.toggle("responsive");
}

window.onload = () => {
    // Éléments DOM pour la validation du formulaire
    const form = document.querySelector("form");
    const firstNameInput = document.getElementById("first");
    const lastNameInput = document.getElementById("last");
    const emailInput = document.getElementById("email");
    const birthdateInput = document.getElementById("birthdate");
    const quantityInput = document.getElementById("quantity");
    const locationInputs = document.querySelectorAll("input[name='location']");
    const checkboxInputs = document.querySelectorAll("input[type='checkbox']");

    // Éléments DOM pour le modal
    const successMessage = document.querySelector(".success-message");
    const selectedCityElement = document.getElementById("selected-city");
    const modalbg = document.querySelector(".bground");
    const modalBtn = document.querySelectorAll(".modal-btn");
    const closeBtn = document.querySelector(".close");
    const modalContent = modalbg.querySelector(".content");

    // Tableau des inputs à valider
    const inputsToValidate = [
        {
            element: firstNameInput,
            validations: [
                textValidators.notEmpty,
                textValidators.inputChars,
                textValidators.inputLength,
            ],
        },
        {
            element: lastNameInput,
            validations: [
                textValidators.notEmpty,
                textValidators.inputChars,
                textValidators.inputLength,
            ],
        },
        {
            element: emailInput,
            validations: [emailValidators.emailFormat],
        },
        {
            element: birthdateInput,
            validations: [textValidators.notEmpty],
        },
        {
            element: quantityInput,
            validations: [textValidators.notEmpty, numberValidators.quantity],
        },
        {
            element: locationInputs,
            validations: [radioValidators.location],
            test: "click",
        },
        {
            element: checkboxInputs[0],
            validations: [checkboxValidators.checkboxAccept],
            test: "click",
        },
    ];

    initNav();

    // Fonction pour gérer l'animation de fermeture du modal
    const closeAnimation = () =>
        setTimeout(() => {
            modalbg.style.display = "none";
            modalContent.classList.remove("modal-close");
            modalContent.removeAttribute("disabled");
            resetForm(document.querySelector("form"));
            form.style.display = "block";
            successMessage.style.display = "none";
        }, 800);

    // Fonction pour gérer la fermeture du modal
    const handleCloseModal = () => {
        closeModal(modalContent, closeAnimation);
        document.removeEventListener("click", handleOutsideClick);
    };

    // Gestion des événements pour l'ouverture et la fermeture du modal
    modalBtn.forEach((btn) =>
        btn.addEventListener("click", () => {
            openModal(modalbg);
            handleOutsideClick(modalbg, modalContent, handleCloseModal, modalBtn);
        })
    );
    closeBtn.addEventListener("click", handleCloseModal);

    modalContent.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    // Validation en temps réel
    inputsToValidate.forEach(({ element, validations, test }) => {
        if (element instanceof NodeList) {
            [...element].forEach((el) => {
                el.addEventListener(test ? "click" : "blur", () => {
                    validateInput(element, validations);
                });
            });
        } else {
            element.addEventListener(test ? "click" : "blur", () => {
                validateInput(element, validations);
            });
        }
    });

    // Validation du formulaire lors de la soumission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isFormValid = true;

        // Validation de chaque input
        inputsToValidate.forEach(({ element, validations }) => {
            const valid = validateInput(element, validations);
            if (!valid) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Récupérer la ville sélectionnée
            const selectedCity = document.querySelector(
                "input[name='location']:checked"
            ).value;
            selectedCityElement.textContent = selectedCity;
            console.log("Merci ! Votre réservation a été reçue.");
            form.style.display = "none";
            successMessage.style.display = "block";
        }
    });
};

export { initNav };