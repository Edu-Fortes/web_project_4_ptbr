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

//invoke class to get/set user info
const user = new UserInfo(selectors);
//start loading animation on page load
loading.profileSection(true);
loading.cardsSection(true);

//Retrieve User Info from server and show on page
const userData = await api
  .get(urlPaths.user)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  //object containing user data
  .then((userInfo) => {
    const avatarImg = document.querySelector(".img_avatar");
    const nameTitle = document.querySelector(".profile__title");
    const aboutTitle = document.querySelector(".profile__subtitle");

    avatarImg.src = userInfo.avatar;
    nameTitle.textContent = userInfo.name;
    aboutTitle.textContent = userInfo.about;
    return userInfo;
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
    document.querySelector(".place").innerHTML = "";
    //assembly cards to create card section
    const cardsSection = new Section(
      {
        items: cardsArr,
        renderer: (item) => {
          const card = new Card(
            item,
            userData,
            "#card-template",
            handleCardClick
          );
          const cardElement = card.generateCard();
          cardsSection.addItem(cardElement);
        },
      },
      ".place"
    );
    //render card section using Array from initialCards
    cardsSection.renderItems();
    return cardsArr;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loading.cardsSection(false);
  });

//handle what happens when clicking "Save" button in Edit Profile Modal
const editProfile = new PopupWithForm(
  {
    //callback funtion to handle form SUBMIT
    callback: (submit) => {
      submit.preventDefault();
      loading.saveBtn(true);
      const dataToPatch = user.setUserInfo(selectors);

      api
        .patch(urlPaths.user, dataToPatch)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          editProfile.close();
          loading.saveBtn(false);
        });
    },
  },
  "#profile-modal"
);

//handle what happens when clicking "Save" button in Add New Picture Modal
const addPicModal = new PopupWithForm(
  {
    callback: (submit) => {
      submit.preventDefault();
      loading.createBtn(true);

      const addedCardData = {};
      const inputCardTitle = document.querySelector(".popup__input_type_place");
      const inputCardImg = document.querySelector(".popup__input_type_img");

      addedCardData.name = inputCardTitle.value;
      addedCardData.link = inputCardImg.value;

      api
        .post(urlPaths.cards, addedCardData)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((card) => {
          const newCard = new Card(
            card,
            userData,
            "#card-template",
            handleCardClick
          );
          const newCardElement = newCard.generateCard();
          document.querySelector(".place").prepend(newCardElement);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          addPicModal.close();
          loading.createBtn(false);
        });
    },
  },
  "#add-card-modal"
);

const deleteAlert = new PopupWithForm(
  {
    callback: (submit) => {
      submit.preventDefault();
      loading.spinnerModal(true);

      api.delete(urlPaths.cards, clickedCard.id).then((res) => {
        if (res.ok) {
          //delete cards
          clickedCard.remove();
          deleteAlert.close();
          return;
        }
      });
    },
  },
  "#modal-delete"
);

const changeAvatar = new PopupWithForm(
  {
    callback: (submit) => {
      submit.preventDefault();
      const avatarUrl = { link: document.querySelector("#avatar-input").value };
      loading.saveBtn(true);
      api
        .patch(urlPaths.changeAvatar, avatarUrl)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((avatarJson) => {
          const imgAvatar = document.querySelector(".img_avatar");
          imgAvatar.src = avatarJson.avatar;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => loading.saveBtn(false));
      changeAvatar.close();
    },
  },
  "#avatar-modal"
);

//adds event listeners to close popups
editProfile.setEventListeners();
addPicModal.setEventListeners();
deleteAlert.setEventListeners();
changeAvatar.setEventListeners();

//variable to store clicked card id
let clickedCard;

//add event listeners to open popups
document.addEventListener("click", (event) => {
  //open modal to edit profile info
  if (
    event.target.classList.contains("img_button_edit") ||
    event.target.classList.contains("button_edit")
  ) {
    editProfile.open();
    const userData = user.getUserInfo();
    const inputName = document.querySelector(selectors.nameInputClass);
    const inputAbout = document.querySelector(selectors.aboutInputClass);

    inputName.value = userData.name;
    inputAbout.value = userData.about;
    return;
  }
  //open modal to add new photo
  if (
    event.target.classList.contains("img_button_add") ||
    event.target.classList.contains("button_add")
  ) {
    addPicModal.open();
    return;
  }
  //open modal to delete card
  if (event.target.classList.contains("button__image")) {
    clickedCard = event.target.closest(".place__card");
    loading.spinnerModal(true);
    ownedCards();
  }
  //button like
  if (event.target.classList.contains("button__like")) {
    clickedCard = event.target.closest(".place__card");

    const likeSpan = event.target.nextElementSibling;
    if (event.target.classList.contains("button__like_active")) {
      api
        .put(urlPaths.likes, clickedCard.id)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((res) => {
          const likesArr = res.likes;
          likeSpan.textContent = likesArr.length;
        });
    } else {
      api
        .delete(urlPaths.likes, clickedCard.id)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((res) => {
          const likesArr = res.likes;
          if (likesArr.length == []) {
            likeSpan.textContent = 0;
          } else {
            likeSpan.textContent = likesArr.length;
          }
        });
    }
  }
  if (event.target.classList.contains("img_avatar")) {
    changeAvatar.open();
  }
});
//checks is the card is owned by user
function ownedCards() {
  api
    .get(urlPaths.cards)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((array) => {
      const owned = array.filter((card) => {
        const cardOwner = card.owner;
        if (cardOwner._id == userData._id) {
          return card;
        }
      });
      return owned;
    })
    .then((owned) => {
      if (owned.some((card) => card._id == clickedCard.id)) {
        deleteAlert.open();
      }
    })
    .finally(() => {
      loading.spinnerModal(false);
    });
  return;
}

//function to open popup with image, called inside Card class
function handleCardClick() {
  const photoModal = new PopupWithImage("#modal-photo");
  photoModal.setEventListeners();
  photoModal.open(event);
}

//Validate forms
const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((formElement) => {
  const validate = new FormValidator(formsConfig, ".popup__form");
  validate.enableValidation(formElement);
});
