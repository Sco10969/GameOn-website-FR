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

 const validatorNotEmpty = {
     validationFunction: (inputElement) => inputElement.value.trim() !== "",
     errorMessage: "Champ requis."
 };

 const validatorInputChars = {
     validationFunction: (inputElement) => /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-\s][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(inputElement.value.trim()),
     errorMessage: "Ne doit contenir que des lettres."
 }

 const validatorInputLength = {
     validationFunction: (inputElement) => inputElement.value.trim().length >= 2,
     errorMessage: "Doit contenir au moins 2 caractères."
 }

 const validatorEmailFormat = {
     validationFunction: (inputElement) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputElement.value.trim()),
     errorMessage: "Veuillez saisir une adresse email valide."
 };

 const validatorQuantity = {
     validationFunction: (inputElement) => {
         const value = Number(inputElement.value);
         return value >= 0 && value <= 99;
     },
     errorMessage: "Veuillez entrer un nombre valide."
 };

 const validatorLocation = {
     validationFunction: (inputElements) => Array.from(inputElements).some(input => input.checked),
     errorMessage: "Veuillez sélectionner un tournoi."
 };

 const validatorCheckboxAccept = {
     validationFunction: (inputElement) => inputElement.checked,
     errorMessage: "Vous devez accepter les conditions d'utilisation."
 };

 const nameValidators = [
     validatorNotEmpty,
     validatorInputChars,
     validatorInputLength
 ];

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

 // Fonction de validation d'un input
 function validateInput(inputElement, validations) {
     let isValid = true;
     const formDataElement = inputElement instanceof NodeList ?
         inputElement[0].closest(".formData") :
         inputElement.closest(".formData");

     validations.forEach(validation => {
         if (!validation.validationFunction(inputElement)) {
             formDataElement.setAttribute("data-error", validation.errorMessage);
             formDataElement.setAttribute("data-error-visible", "true");
             isValid = false;
         }
     });

     if (isValid) {
         formDataElement.removeAttribute("data-error");
         formDataElement.removeAttribute("data-error-visible");
     }

     return isValid;
 }

 // Validation en temps réel
 inputsToValidate.forEach(({
     element,
     validations,
     test
 }) => {
     if (element instanceof NodeList) {
         [...element].forEach(el => {
             el.addEventListener(test ?? "blur", () => {
                 validateInput(element, validations);
             });
         });
     } else {
         element.addEventListener(test ?? "blur", () => {
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
     }
 });