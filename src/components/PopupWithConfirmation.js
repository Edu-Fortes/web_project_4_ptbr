import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor({ callback }, popupSelector) {
    super(popupSelector);
    this._callback = callback;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }

  setEventListeners() {
    const formElement = document
      .querySelector(this._popupSelector)
      .querySelector(".popup__form");

    super.setEventListeners();
    formElement.addEventListener("submit", this._callback);
  }
}
