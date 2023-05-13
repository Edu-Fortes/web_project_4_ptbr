export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._isLiked = false;
  }
  // Get card temlate from DOM and returns the card element
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".place__card")
      .cloneNode(true);

    return cardElement;
  }
  /* Generates the card based on card element from getTemplate function,
   * returns the complete card, with image and title*/
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

  _handleTrashBtnEvent(eventType) {
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
    });
    //add listener on trash button when hovering it to control card's opacity
    this._handleTrashBtnEvent("mouseenter");
    this._handleTrashBtnEvent("mouseleave");
  }
}
