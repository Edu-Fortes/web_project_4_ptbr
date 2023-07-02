import "/src/page/index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import { selectors, formsConfig, urlPaths } from "../utils/constants.js";
import Api from "../components/Api.js";
import LoadAnimation from "../components/LoadAnimation.js";

//closes all popups on page loading
const modals = document.querySelectorAll(".popup");
modals.forEach((modal) => {
  modal.classList.remove("popup_opened");
});

//invoke Api client
const api = new Api(urlPaths);

//invokes class to add Loading Animations
const loading = new LoadAnimation(selectors);

//start loading animation on page load
loading.profileSection(true);
loading.cardsSection(true);

//Retrieve User Info from server and show on page
api
  .get(urlPaths.user)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  //object containing user data
  .then((userInfo) => {
    console.log(userInfo);
    const avatarImg = document.querySelector(".img_avatar");
    const nameTitle = document.querySelector(".profile__title");
    const aboutTitle = document.querySelector(".profile__subtitle");

    avatarImg.src = userInfo.avatar;
    nameTitle.textContent = userInfo.name;
    aboutTitle.textContent = userInfo.about;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loading.profileSection(false);
  });

//Retrieve initial cards Array from server and render on page
api
  .get(urlPaths.cards)
  .then((res) => {
    if (res.ok) {
      //return an Array of Cards object
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  .then((cardsArr) => {
    //clear card loading animation to show rendered cards
    const placeCotainer = document.querySelector(".place");
    placeCotainer.innerHTML = "";
    //assembly cards to create card section
    const cardsSection = new Section(
      {
        items: cardsArr,
        renderer: (item) => {
          const card = new Card(item, "#card-template", handleCardClick);
          const cardElement = card.generateCard();
          cardsSection.addItem(cardElement);
        },
      },
      ".place"
    );
    //render card section using Array from initialCards
    cardsSection.renderItems();
    console.log(cardsArr);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loading.cardsSection(false);
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

//Validate forms
const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((formElement) => {
  const validate = new FormValidator(formsConfig, ".popup__form");
  validate.enableValidation(formElement);
});
