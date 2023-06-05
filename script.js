import Section from "./script/Section.js";
import Card from "./script/Card.js";
import PopupWithImage from "./script/PopupWithImage.js";
import PopupWithForm from "./script/PopupWithForm.js";
import UserInfo from "./script/UserInfo.js";
import FormValidator from "./script/FormValidator.js";

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
//gets information to create section with cards
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleCardClick);
      const cardElement = card.generateCard();
      cardsSection.addItem(cardElement);
    },
  },
  ".place"
);
//render card section
cardsSection.renderItems();
//closes all popups on page loading
const modals = document.querySelectorAll(".popup");
modals.forEach((modal) => {
  modal.classList.remove("popup_opened");
});
/*class PopupWithForm sends a callback function, to handle form
 * SUBMIT, to the constructor and selector*/
const addPicModal = new PopupWithForm(
  {
    callback: (submit) => {
      submit.preventDefault();

      const addedCardData = {};
      const inputCardTitle = document.querySelector(".popup__input_type_place");
      const inputCardImg = document.querySelector(".popup__input_type_img");

      addedCardData.name = inputCardTitle.value;
      addedCardData.link = inputCardImg.value;

      const newCard = new Card(
        addedCardData,
        "#card-template",
        handleCardClick
      );
      const newCardElement = newCard.generateCard();
      document.querySelector(".place").prepend(newCardElement);
      addPicModal.close();
    },
  },
  "#add-card-modal"
);
//callback funtion to handle form SUBMIT
const editProfile = new PopupWithForm(
  {
    callback: (submit) => {
      submit.preventDefault();

      userInfo.setUserInfo(
        ".popup__input_type_name",
        ".popup__input_type_about"
      );
      editProfile.close();
    },
  },
  "#profile-modal"
);
//class selector to be used with UserInfo class
const selectors = {
  nameSelector: ".profile__title",
  workSelector: ".profile__subtitle",
};
const userInfo = new UserInfo(selectors);

//adds event listeners to close popups
editProfile.setEventListeners();
addPicModal.setEventListeners();
//add event listeners to open popups
document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("img_button_edit") ||
    event.target.classList.contains("button_edit")
  ) {
    editProfile.open();
    const userData = userInfo.getUserInfo();
    const inputName = document.querySelector(".popup__input_type_name");
    const inputAbout = document.querySelector(".popup__input_type_about");

    inputName.value = userData.name;
    inputAbout.value = userData.work;
    return;
  }
  if (
    event.target.classList.contains("img_button_add") ||
    event.target.classList.contains("button_add")
  ) {
    addPicModal.open();
    return;
  }
});

//function to open popup with image, called inside Card class
function handleCardClick() {
  const photoModal = new PopupWithImage("#modal-photo");
  photoModal.setEventListeners();
  photoModal.open(event);
}

//delete cards
const placeSection = document.querySelector(".places");
placeSection.addEventListener("click", handleRemoveCard);
function handleRemoveCard(event) {
  if (event.target.classList.contains("button__image")) {
    event.target.closest(".place__card").remove();
    return;
  }
}

//Forms Configuration Object contening CSS clases and selectors
const formsConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: `.button[type="submit"]`,
  inputErrorClass: "input_type_error",
  errorClass: "popup__error_visible",
  disableClass: "button_disabled",
};
//Validate forms
const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((formElement) => {
  const validate = new FormValidator(formsConfig, ".popup__form");
  validate.enableValidation(formElement);
});
