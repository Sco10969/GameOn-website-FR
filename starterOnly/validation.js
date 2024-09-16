 // DOM elements
 const formData = document.querySelectorAll(".formData");
 const firstNameInput = document.getElementById("first");
 const lastNameInput = document.getElementById("last");
 const form = document.querySelector("form");

 // Fonction de validation générique
 function validateInput(inputElement, validations) {
     const formDataElement = inputElement.closest(".formData");
     if (validations.find(
             (validation) => {
                 if (!validation.validationFunction(inputElement)) {
                     formDataElement.setAttribute("data-error", validation.errorMessage);
                     formDataElement.setAttribute("data-error-visible", "true");
                     return true;
                 }
             }
         )) {
         return false;
     }
     formDataElement.removeAttribute("data-error");
     formDataElement.removeAttribute("data-error-visible");
     return true;
 }

 const validateInputLength = {
     validationFunction: (inputElement) => inputElement.value.trim().length >= 2,
     errorMessage: "Le prénom doit contenir au moins 2 caractères."
 }

 const validateInputChars = {
     validationFunction: (inputElement) => /^[a-zA-Z]+$/.test(inputElement.value.trim()),
     errorMessage: "Ne doit contenir que des lettres."
 }

 const validateInputName = [
     validateInputLength,
     validateInputChars
 ]

 // Tableau des inputs à valider (pour l'instant, le prénom)
 const inputsToValidate = [
     {
         element: firstNameInput,
         validations: validateInputName
     },
     {
         element: lastNameInput,
         validations: validateInputName
     }

     // TODO : ajouter la validation de l'email
     // TODO : ajouter la validation du date de naissance
     // TODO : ajouter la validation du genre
     // TODO : ajouter la validation du nombre de tournois
     // TODO : ajouter la validation sur un des radio buttons
     // TODO : ajouter la validation sur les checkbox
 ];

 // TODO : Validation en temps réel

 // Validation du formulaire lors de la soumission
 form.addEventListener("submit", function (event) {
     let isFormValid = true;

     // Validation of each input
     inputsToValidate.forEach(({
         element,
         validations,
     }) => {
         const isValid = validateInput(element, validations);
         if (!isValid) {
             isFormValid = false;
         }
     });

     if (!isFormValid) {
         event.preventDefault(); // Empêche la soumission si la validation échoue
     } else {
         // TODO : message de confirmation à mettre en place
     }
 });