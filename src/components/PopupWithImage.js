import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  /* modify open() to get target image src and alt
   * to populate popup with image*/
  open(event) {
    const modalImage = document
      .querySelector(this._popupSelector)
      .querySelector(".popup__img");
    const imgCaption = document
      .querySelector(this._popupSelector)
      .querySelector(".popup__figcaption");

    imgCaption.textContent = event.target.alt.slice(27);
    modalImage.src = event.target.src;
    modalImage.alt = `Imagem ampliada da postagem ${imgCaption.textContent}`;

    super.open();
  }
}
