const initialCards = [
  {
    name: "Grand Canyon",
    link: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80",
  },
  {
    name: "Represa Hoover",
    link: "https://images.unsplash.com/photo-1546047090-bfd187e30781?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    name: "Nova Iorque",
    link: "https://images.unsplash.com/photo-1555109307-f7d9da25c244?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80",
  },
  {
    name: "California",
    link: "https://images.unsplash.com/photo-1562748544-21a0bd1a9a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "Las Vegas",
    link: "https://images.unsplash.com/photo-1577334928618-2ff2bf09e827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    name: "São Francisco",
    link: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
];

/* Constants to set each modal returned by NodeList.
 * - One for profile modal - inputs to change profile info
 * - One for place modal - inputs to add new card/post
 * - One for photo modal - show bigger clicked card photo
 * */
const modals = document.querySelectorAll(".popup"); //returns a NodeList with 3 popup results
const profileModal = modals[0];
const placeModal = modals[1];
const photoModal = modals[2];

//Global query selector consts
const photoPopupImage = photoModal.querySelector(".popup__img");
const photoPopupCaption = photoModal.querySelector(".popup__figcaption");
const photoCloseButton = photoModal.querySelector(".img_button_close");
const cardImage = modals.forEach((modal) => {
  modal.classList.remove("popup_opened");
});

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

    photoModal.classList.add("popup_opened");
  }

  _handleClosePhoto() {
    photoPopupImage.src = "";
    photoModal.classList.remove("popup_opened");
  }

  _setEventListener() {
    this._element.querySelector(".img").addEventListener("click", () => {
      this._handleOpenPhoto();
    });

    photoCloseButton.addEventListener("click", () => {
      this._handleClosePhoto();
    });
  }
}

/* forEach function to create initial 6 cards from initialCards object */
initialCards.forEach((object) => {
  const card = new Card(object, "#card-template");
  const cardElement = card.generateCard();

  document.querySelector(".place").append(cardElement);
});
