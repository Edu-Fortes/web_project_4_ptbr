import Section from "./script/Section.js";
import Card from "./script/Card.js";
import Popup from "./script/Popup.js";
import PopupWithImage from "./script/PopupWithImage.js";
import PopupWithForm from "./script/PopupWithForm.js";
import UserInfo from "./script/UserInfo.js";

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

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template");
      const cardElement = card.generateCard();
      cardsSection.addItem(cardElement);
    },
  },
  ".place"
);

cardsSection.renderItems();

const modals = document.querySelectorAll(".popup");
modals.forEach((modal) => {
  modal.classList.remove("popup_opened");
});

// const profileModal = new Popup("#profile-modal");
// const photoModal = new PopupWithImage("#modal-photo");
const addPicModal = new PopupWithForm(
  {
    callback: (submit) => {
      submit.preventDefault();
      addPicModal.close();
    },
  },
  "#add-card-modal"
);
const editProfile = new PopupWithForm(
  {
    callback: (submit) => {
      submit.preventDefault();

      // userInfo.getUserInfo();
      userInfo.setUserInfo(
        ".popup__input_type_name",
        ".popup__input_type_about"
      );
      editProfile.close();
    },
  },
  "#profile-modal"
);

// profileModal.setEventListeners();
editProfile.setEventListeners();
addPicModal.setEventListeners();
// photoModal.setEventListeners();

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

    console.log(userData.name);
    editProfile._getInputValues();

    return;
  }

  if (
    event.target.classList.contains("img_button_add") ||
    event.target.classList.contains("button_add")
  ) {
    addPicModal.open();
    addPicModal._getInputValues();
    return;
  }

  // if (event.target.classList.contains("img_card")) {
  //   photoModal.open(event);
  //   return;
  // }
});

const selectors = {
  nameSelector: ".profile__title",
  workSelector: ".profile__subtitle",
};

const userInfo = new UserInfo(selectors);
