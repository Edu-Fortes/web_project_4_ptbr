export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  // opens popup when called
  open() {
    document.querySelector(this._popupSelector).classList.add("popup_opened");
    this._handleEscClose();
  }
  //close popup when called
  close() {
    document
      .querySelector(this._popupSelector)
      .classList.remove("popup_opened");
  }
  //logic to close popup on ESC press
  _handleEscClose() {
    const _escPress = (event) => {
      if (event.key === "Escape") {
        this.close();
        document.removeEventListener("keydown", _escPress);
      }
    };

    document.addEventListener("keydown", _escPress);
  }
  /* Adds a click event on close button icon.
   * Alson closes popup when clicking on shadow area
   * outside of popup edge*/
  setEventListeners() {
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
