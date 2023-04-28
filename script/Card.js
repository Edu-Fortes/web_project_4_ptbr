class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".place__card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListener();

    this._element.querySelector(".place__name").textContent = this._name;
    this._element.querySelector(".img").src = this._link;
    this._element.querySelector(
      ".img"
    ).alt = `Imagem de capa da postagem ${this._name}`;

    return this._element;
  }

  _handleOpenPhoto() {
    photoPopupImage.src = this._link;
    photoPopupImage.alt = `Imagem ampliada da postagem ${this._name}`;
    photoPopupCaption.textContent = photoPopupImage.alt.slice(27);

    photoPopupElement.classList.add("popup_opened");
  }

  _handleClosePhoto() {
    photoPopupImage.src = "";
    photoPopupElement.classList.remove("popup_opened");
  }

  _setEventListener() {
    this._element.addEventListener("click", () => {
      this._handleOpenPhoto();
    });

    photoCloseButton.addEventListener("click", () => {
      this._handleClosePhoto();
    });
  }
}
