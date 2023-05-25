export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  // abre a janela popup
  open() {
    document.querySelector(this._popupSelector).classList.add("popup_opened");
  }
  //fecha a janela popup
  close() {
    document
      .querySelector(this._popupSelector)
      .classList.remove("popup_opened");
  }
  //lógica para fechar o popup pressonando ESC
  _handleEscClose() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        document
          .querySelector(".popup_opened")
          .classList.remove("popup_opened");
      }
    });
  }
  /* adiciona um evento de click no ícone fechar popup.
   * também deve fechar a janela clicando na área sombreada
   * em torno do popup*/
  setEventListeners() {
    this._handleEscClose();

    document.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("img_button_close") ||
        event.target.classList.contains("popup")
      ) {
        this.close();
        return;
      }
    });
  }
}
