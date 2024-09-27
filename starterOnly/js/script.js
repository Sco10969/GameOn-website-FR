import {
    validatorNotEmpty,
    validatorEmailFormat,
    validatorQuantity,
    validatorLocation,
    validatorCheckboxAccept,
    nameValidators,
    validateInput
} from './modules/validation.js';

import {
    launchModal,
    closeModal,
    resetForm,
    createOutsideClickListener
} from './modules/modal.js';


function initNav() {
    const menuBurger = document.getElementById("menuBurger");

    menuBurger.onclick = editNav;
}

function editNav() {
    const x = document.getElementById("myTopnav");
    x.classList.toggle("responsive");
}

window.onload = () => {

    // DOM elements for form validation
    const form = document.querySelector("form");
    const firstNameInput = document.getElementById("first");
    const lastNameInput = document.getElementById("last");
    const emailInput = document.getElementById("email");
    const birthdateInput = document.getElementById("birthdate");
    const quantityInput = document.getElementById("quantity");
    const locationInputs = document.querySelectorAll("input[name='location']");
    const checkboxInputs = document.querySelectorAll("input[type='checkbox']");

    // DOM elements for modal
    const successMessage = document.querySelector(".success-message");
    const selectedCityElement = document.getElementById("selected-city");

    const modalbg = document.querySelector(".bground");
    const modalBtn = document.querySelectorAll(".modal-btn");
    const closeBtn = document.querySelector(".close");
    const modalContent = modalbg.querySelector(".content");

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

    initNav();

    const closeAnimation = () => setTimeout(() => {
        modalbg.style.display = "none";
        modalContent.classList.remove("modal-close");
        modalContent.removeAttribute("disabled");
        resetForm(document.querySelector("form"));
        form.style.display = "block";
        successMessage.style.display = "none";
    }, 800);


    const handleCloseModal = () => {
        closeModal(modalContent, closeAnimation);
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
            // Récupérer la ville sélectionnée
            const selectedCity = document.querySelector("input[name='location']:checked").value;
            selectedCityElement.textContent = selectedCity;
            console.log("Merci ! Votre réservation a été reçue.");
            form.style.display = "none";
            successMessage.style.display = "block";
        }
    });

}

export {
    editNav
};