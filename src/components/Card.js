export default class Card {
  constructor(data, userData, cardSelector, cardClickFunction) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._cardClickFunction = cardClickFunction;
    this._likeCount = data.likes;
    this._cardId = data._id;
    this._owner = data.owner;
    this._userData = userData;
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
    this._showLikes();
    this._showTrashBtn();
    this._setId();

    return this._element;
  }

  _setId() {
    this._element.setAttribute("id", `${this._cardId}`);
  }

  _showLikes() {
    const likeCounter = this._element.querySelector(".button__count");
    if (this._likeCount == []) {
      likeCounter.textContent = 0;
    } else {
      likeCounter.textContent = this._likeCount.length;
    }
    if (this._likeCount.some((liker) => liker._id == this._userData._id)) {
      this._element
        .querySelector(".button__like")
        .classList.add("button__like_active");
    }
  }

  async _showTrashBtn() {
    if (this._owner._id != this._userData._id) {
      this._element.querySelector(".button_trash").remove();
    }
  }

  _like() {
    const isLiked = this._element
      .querySelector(".button__like")
      .classList.toggle("button__like_active");
    console.log(isLiked);
    return isLiked;
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
      //check if clicked element is card image
      if (event.target.classList.contains("img_card")) {
        //call function from index.js
        this._cardClickFunction();
      }
    });
    //add listener on trash button when hovering it to control card's opacity
    this._handleTrashBtnEvent("mouseenter");
    this._handleTrashBtnEvent("mouseleave");
  }
}
