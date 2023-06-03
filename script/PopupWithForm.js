import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ callback }, popupSelector) {
    super(popupSelector);
    this._callback = callback;
  }
  //coleta dados de todos os campos de entrada
  _getInputValues() {
    const inputData = {};
    const inputList = Array.from(
      document
        .querySelector(this._popupSelector)
        .querySelectorAll(".popup__input")
    );

    inputList.forEach((inputElement) => {
      inputData[`${inputElement.id}`] = inputElement.value;
      console.log(inputData);
      return inputData;
    });
  }
  //adiciona o manipulador de eventos ENVIAR ao fomulário e
  //o ouvinte CLICK para o ícone de fechamento
  setEventListeners() {
    const formElement = document
      .querySelector(this._popupSelector)
      .querySelector(".popup__form");

    super.setEventListeners();
    formElement.addEventListener("submit", this._callback);
  }

  //modifica close() para redefinir formulário quando modal fechar
  close() {
    const formElement = document
      .querySelector(this._popupSelector)
      .querySelector(".popup__form");

    super.close();
    formElement.reset();
  }
}
