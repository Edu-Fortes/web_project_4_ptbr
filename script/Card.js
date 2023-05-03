export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._isLiked = false;
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
    this._element
      .querySelector(".button__like")
      .classList.remove("button__like_active");

    return this._element;
  }

  _like() {
    this._isLiked = !this._isLiked;
    this._element
      .querySelector(".button__like")
      .classList.toggle("button__like_active");
  }

  _openPhoto() {
    const photoModal = document.querySelector("#modal-photo");
    const photoElement = photoModal.querySelector(".popup__img");
    const photoCaption = photoModal.querySelector(".popup__figcaption");

    photoElement.src = this._link;
    photoElement.alt = `Imagem ampliada da postagem ${this._name}`;
    photoCaption.textContent = photoElement.alt.slice(27);
    photoModal.classList.add("popup_opened");
  }

  _handleCardEvent(eventType) {
    this._element
      .querySelector(".button_trash")
      .addEventListener(eventType, () => {
        const overlay = this._element.querySelector(".place__fig");
        //check if mouse is entering trash button
        if (eventType === "mouseenter") {
          overlay.style.setProperty("opacity", 0.5);
          return;
        }
        //check if mouse is leaving trash button
        if (eventType === "mouseleave") {
          overlay.style.removeProperty("opacity");
          return;
        }
      });
  }

  _setEventListener() {
    //add listener for CLICK inside each card
    this._element.addEventListener("click", (event) => {
      //check if clicked element is a like button
      if (event.target.classList.contains("button__like")) {
        this._like();
        return;
      }
      //check if clicked element is a photo
      if (event.target.classList.contains("img_card")) {
        this._openPhoto();
        return;
      }
    });
    //add listener on trash button when hovering it to control card's opacity
    this._handleCardEvent("mouseenter");
    this._handleCardEvent("mouseleave");
  }
}
