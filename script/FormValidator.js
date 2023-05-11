//configuration object
const formsConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: `.button[type="submit"]`,
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "input_type_error",
  errorClass: "popup__error_visible",
  disableClass: "button_disabled",
};

class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._disableClass = data.disableClass;
    this._formElement = formElement;
  }

  /* Function to show error when the input field do not agree with
   * validation parameters. Accepst as parameters the Form element,
   * Input element and the Error Message */
  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formsConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formsConfig.errorClass);
  };
  /* Function to hide error when the input field agree with
   * validation parameters. */
  hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formsConfig.inputErrorClass);
    errorElement.classList.remove(formsConfig.errorClass);
    errorElement.textContent = "";
  };
  /* Fucntion to check if the error messagem should be showed  or not*/
  isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  /* Function verify if all input fields are valid to activate the form
   * submit button. Get an array as argument and returns "true" if at least
   * one field is invalid, and returns "false" if all are valid*/
  hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  /* Function to change button state (disabled to active). In conjuction with
   * hasInvalidInput function, thi one will change button state*/
  toggleButtonState = (inputList, buttonElement) => {
    //If at least one input is invalid
    if (hasInvalidInput(inputList)) {
      //button inactive
      buttonElement.classList.add(formsConfig.disableClass);
    } else {
      //else, make button active
      buttonElement.classList.remove(formsConfig.disableClass);
    }
  };
  /* Function receives form elements as parameters and add handles in each input field*/
  setEventListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(formsConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      formsConfig.submitButtonSelector
    );

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  /* Function to find all forms and creates an array of it.*/
  enableValidation = () => {
    const formList = Array.from(
      document.querySelectorAll(formsConfig.formSelector)
    );

    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };
}
