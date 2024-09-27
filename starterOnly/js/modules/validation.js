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

export {
    validatorNotEmpty,
    validatorInputChars,
    validatorInputLength,
    validatorEmailFormat,
    validatorQuantity,
    validatorLocation,
    validatorCheckboxAccept,
    nameValidators,
    validateInput
};