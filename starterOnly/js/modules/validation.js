const errorMessages = {
    notEmpty: "Champ requis.",
    inputChars: "Ne doit contenir que des lettres.",
    inputLength: "Doit contenir au moins 2 caractères.",
    emailFormat: "Veuillez saisir une adresse email valide.",
    quantity: "Veuillez entrer un nombre valide.",
    location: "Veuillez sélectionner un tournoi.",
    checkboxAccept: "Vous devez accepter les conditions d'utilisation."
};

const textValidators = {
    notEmpty: {
        validationFunction: (inputElement) => inputElement.value.trim() !== "",
        errorMessageKey: "notEmpty"
    },
    inputChars: {
        validationFunction: (inputElement) => /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-\s][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(inputElement.value.trim()),
        errorMessageKey: "inputChars"
    },
    inputLength: {
        validationFunction: (inputElement) => inputElement.value.trim().length >= 2,
        errorMessageKey: "inputLength"
    }
};

const emailValidators = {
    emailFormat: {
        validationFunction: (inputElement) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputElement.value.trim()),
        errorMessageKey: "emailFormat"
    }
};

const numberValidators = {
    quantity: {
        validationFunction: (inputElement) => {
            const value = Number(inputElement.value);
            return value >= 0 && value <= 99;
        },
        errorMessageKey: "quantity"
    }
};

const radioValidators = {
    location: {
        validationFunction: (inputElements) => Array.from(inputElements).some(input => input.checked),
        errorMessageKey: "location"
    }
};

const checkboxValidators = {
    checkboxAccept: {
        validationFunction: (inputElement) => inputElement.checked,
        errorMessageKey: "checkboxAccept"
    }
};

function validateInput(inputElement, validations) {
    let isValid = true;
    const formDataElement = inputElement instanceof NodeList ?
        inputElement[0].closest(".formData") :
        inputElement.closest(".formData");

    for (const validation of validations) {
        if (!validation.validationFunction(inputElement)) {
            const errorMessage = errorMessages[validation.errorMessageKey] || "Erreur de validation.";
            formDataElement.setAttribute("data-error", errorMessage);
            formDataElement.setAttribute("data-error-visible", "true");
            isValid = false;
            break;
        }
    }

    if (isValid) {
        formDataElement.removeAttribute("data-error");
        formDataElement.removeAttribute("data-error-visible");
    }

    return isValid;
}

export {
    textValidators,
    emailValidators,
    numberValidators,
    radioValidators,
    checkboxValidators,
    validateInput
};