import {
    validatorNotEmpty,
    validatorInputChars,
    validatorInputLength,
    validatorEmailFormat,
    validatorQuantity,
    validatorLocation,
    validatorCheckboxAccept,
    nameValidators,
    validateInput
} from './modules/validation.js';

import { initModal } from './modules/modal.js';

// DOM elements for form validation
const form = document.querySelector("form");
const formData = document.querySelectorAll(".formData");
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const locationInputs = document.querySelectorAll("input[name='location']");
const checkboxInputs = document.querySelectorAll("input[type='checkbox']");

// DOM elements for modal
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
const modalContent = modalbg.querySelector(".content");
const successMessage = document.querySelector(".success-message");
const selectedCityElement = document.getElementById("selected-city");

function init() {
    initModal();
}

document.addEventListener('DOMContentLoaded', init);

// Tableau des inputs à valider
const inputsToValidate = [{
        element: firstNameInput,
        validations: nameValidators
    },
    {
        element: lastNameInput,
        validations: nameValidators
    },
    {
        element: emailInput,
        validations: [validatorEmailFormat]
    },
    {
        element: birthdateInput,
        validations: [validatorNotEmpty]
    },
    {
        element: quantityInput,
        validations: [validatorNotEmpty, validatorQuantity]
    },
    {
        element: locationInputs,
        validations: [validatorLocation],
        test: "click"
    },
    {
        element: checkboxInputs[0],
        validations: [validatorCheckboxAccept],
        test: "click"
    }
];

// Validation en temps réel
inputsToValidate.forEach(({
    element,
    validations,
    test
}) => {
    if (element instanceof NodeList) {
        [...element].forEach(el => {
            el.addEventListener(test ? "click" : "blur", () => {
                validateInput(element, validations);
            });
        });
    } else {
        element.addEventListener(test ? "click" : "blur", () => {
            validateInput(element, validations);
        });
    }
})

// Validation du formulaire lors de la soumission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isFormValid = true;

    // Validation de chaque input
    inputsToValidate.forEach(({
        element,
        validations
    }) => {
        const valid = validateInput(element, validations);
        if (!valid) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        // TODO : message de confirmation à mettre en place

        // Récupérer la ville sélectionnée
        const selectedCity = document.querySelector("input[name='location']:checked").value;
        selectedCityElement.textContent = selectedCity;
        console.log("Merci ! Votre réservation a été reçue.");
        form.style.display = "none";
        successMessage.style.display = "block";
    }
});

function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function launchModal(modalElement) {
    modalElement.style.display = "block";
}

function resetForm(formElement) {
    formElement.reset();
}

function closeModal(modalElement, contentElement) {
    contentElement.classList.add("modal-close");
    contentElement.setAttribute("disabled", "disabled");

    setTimeout(() => {
        modalElement.style.display = "none";
        contentElement.classList.remove("modal-close");
        contentElement.removeAttribute("disabled");
        resetForm(document.querySelector("form"));
        form.style.display = "block";
        successMessage.style.display = "none";
    }, 800);
}

function createOutsideClickListener(modalElement, contentElement, closeModalFunc, openModalBtns) {
    function outsideClickListener(event) {
        if (
            modalElement.style.display === "block" &&
            !contentElement.contains(event.target) &&
            !Array.from(openModalBtns).some(btn => btn.contains(event.target))
        ) {
            closeModalFunc();
            document.removeEventListener("click", outsideClickListener);
        }
    }
    return outsideClickListener;
}

export { editNav, launchModal, closeModal, createOutsideClickListener };