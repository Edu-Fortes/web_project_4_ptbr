import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ callback }, popupSelector) {
    super(popupSelector);
    this._callback = callback;
  }
  //gets data from all input fields
  _getInputValues() {
    const inputData = {};
    const inputList = Array.from(
      document
        .querySelector(this._popupSelector)
        .querySelectorAll(".popup__input")
    );

    inputList.forEach((inputElement) => {
      inputData[`${inputElement.id}`] = inputElement.value;
      return inputData;
    });
  }
  /*adds SUBMIT event listener to the form
   * and CLICK to close icon */
  setEventListeners() {
    const formElement = document
      .querySelector(this._popupSelector)
      .querySelector(".popup__form");

    super.setEventListeners();
    formElement.addEventListener("submit", this._callback);
  }

  //modify close() to reset form on when closing popup
  close() {
    const formElement = document
      .querySelector(this._popupSelector)
      .querySelector(".popup__form");

    super.close();
    formElement.reset();
  }
}
