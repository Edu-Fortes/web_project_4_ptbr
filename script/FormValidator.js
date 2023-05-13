export default class FormValidator {
  constructor(data, formSelector) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._disableClass = data.disableClass;
    this._formSelector = formSelector;
  }

  _getFormElement() {
    const formElement = document.querySelector(this._formSelector);
    return formElement;
  }
  /* Function to show error when the input field do not agree with
   * validation parameters. Accepst as parameters the Form element,
   * Input element and the Error Message */
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  /* Function to hide error when the input field agree with
   * validation parameters. */
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
  /* Fucntion to check if the error messagem should be showed  or not*/
  _isValid(formElement, inputElement) {
    if (!inputElement.validityvalid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }
  /* Function verify if all input fields are valid to activate the form
   * submit button. Get an array as argument and returns "true" if at least
   * one field is invalid, and returns "false" if all are valid*/
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  /* Function to change button state (disabled to active). In conjuction with
   * hasInvalidInput function, thi one will change button state*/
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._disableClass);
    } else {
      buttonElement.classList.remove(this._disableClass);
    }
  }
  /* Function receives form elements as parameters and add handles in each input field*/
  _setEventListener(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  //method to enable validation of forms
  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._formSelector));

    formList.forEach((formElement) => {
      this._setEventListener(formElement);
    });
  };
}
