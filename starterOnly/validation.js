 // DOM elements
 const form = document.querySelector("form");
 const formData = document.querySelectorAll(".formData");
 const firstNameInput = document.getElementById("first");
 const lastNameInput = document.getElementById("last");
 const emailInput = document.getElementById("email");
 const birthdateInput = document.getElementById("birthdate");
 const quantityInput = document.getElementById("quantity");
 const locationInputs = document.querySelectorAll("input[name='location']");
 const checkboxInputs = document.querySelectorAll("input[type='checkbox']");

 const validateInputLength = {
     validationFunction: (inputElement) => inputElement.value.trim().length >= 2,
     errorMessage: "Doit contenir au moins 2 caractères."
 }

 const validateInputChars = {
     validationFunction: (inputElement) => /^[a-zA-Z]+$/.test(inputElement.value.trim()),
     errorMessage: "Ne doit contenir que des lettres."
 }

 const validateInputName = [
     validateInputLength,
     validateInputChars
 ];

 const validateEmailFormat = {
     validationFunction: (inputElement) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputElement.value.trim()),
     errorMessage: "Veuillez saisir une adresse email valide."
 };

 const validateBirthdate = {
     validationFunction: (inputElement) => inputElement.value.trim() !== "",
     errorMessage: "Vous devez entrer votre date de naissance."
 };

//  const validateBirthdate = {
//     validationFunction: (inputElement) => {
//         const birthdate = new Date(inputElement.value);
//     const today = new Date();
//     let age = today.getFullYear() - birthdate.getFullYear();
//     const monthDifference = today.getMonth() - birthdate.getMonth();

//     if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
//         age--;
//     }

//     return age >= 18;
// },
// errorMessage: "Vous devez avoir au moins 18 ans."
// };

const validateQuantity = {
    validationFunction: (inputElement) => {
        if (inputElement.value.trim() === "") {
            validateQuantity.errorMessage = "Veuillez remplir ce champ.";
            return false;
        }
        const value = Number(inputElement.value);
        validateQuantity.errorMessage = "Veuillez entrer un nombre valide.";
        return value >= 0 && value <= 99;
    },
};

 const validateLocation = {
     validationFunction: () => Array.from(locationInputs).some(input => input.checked),
     errorMessage: "Veuillez sélectionner un tournoi."
 };

 const validateCheckboxAccept = {
     validationFunction: (inputElements) => inputElements[0].checked,
     errorMessage: "Vous devez accepter les conditions d'utilisation."
 };

 // Tableau des inputs à valider
 const inputsToValidate = [
     {
         element: firstNameInput,
         validations: validateInputName
     },
     {
         element: lastNameInput,
         validations: validateInputName
     },
     {
         element: emailInput,
         validations: [validateEmailFormat]
     },
     {
         element: birthdateInput,
         validations: [validateBirthdate]
     },
     {
         element: quantityInput,
         validations: [validateQuantity]
     },
     {
         element: locationInputs,
         validations: [validateLocation]
     },
     {
         element: checkboxInputs,
         validations: [validateCheckboxAccept]
     }
 ];

// Fonction de validation d'un input
function validateInput(inputElement, validations) {
    let isValid = true;
    const formDataElement = inputElement instanceof NodeList 
        ? inputElement[0].closest(".formData") 
        : inputElement.closest(".formData");

    validations.forEach(validation => {
        if (inputElement instanceof NodeList) {
            // Pour les radio buttons et checkboxes
            if (!validation.validationFunction(inputElement)) {
                formDataElement.setAttribute("data-error", validation.errorMessage);
                formDataElement.setAttribute("data-error-visible", "true");
                isValid = false;
            }
        } else {
            if (!validation.validationFunction(inputElement)) {
                formDataElement.setAttribute("data-error", validation.errorMessage);
                formDataElement.setAttribute("data-error-visible", "true");
                isValid = false;
            }
        }
    });

    if (isValid) {
        formDataElement.removeAttribute("data-error");
        formDataElement.removeAttribute("data-error-visible");
    }

    return isValid;
}
 // TODO : Validation en temps réel

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
        // TODO : message de confirmation à mettre en place
        form.submit(); // Soumet le formulaire si tout est valide
    }
});