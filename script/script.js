import Card from "./Card.js";

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

//Create initial 6 cards from initialCards object
initialCards.forEach((object) => {
  const card = new Card(object, "#card-template");
  const cardElement = card.generateCard();

  document.querySelector(".place").append(cardElement);
});

//listeners for submit

const formElement = document.querySelectorAll(".popup__form");

formElement.forEach((form) => {
  form.addEventListener("submit", handleFormSubmit);
});

function handleFormSubmit(event) {
  const target = event.target;

  if (target.classList.contains("popup__form_profile")) {
    event.preventDefault();
    formSubmitProfile(target);
    target.closest(".popup").classList.remove("popup_opened");
    return;
  }

  if (target.classList.contains("popup__form_place")) {
    event.preventDefault();
    formSubmitAddPlace(target);
    target.closest(".popup").classList.remove("popup_opened");
    return;
  }
}

function formSubmitProfile() {
  const profileSection = document.querySelector(".profile");
  const perfilName = profileSection.querySelector(".profile__title");
  const perfilAbout = profileSection.querySelector(".profile__subtitle");
  const profileModal = document.querySelectorAll(".popup")[0];
  const inputName = profileModal.querySelector(".popup__input_type_name");
  const inputAbout = profileModal.querySelector(".popup__input_type_about");

  perfilName.textContent = inputName.value;
  perfilAbout.textContent = inputAbout.value;
}

function formSubmitAddPlace() {
  const addedCardData = {};
  const placeModal = document.querySelectorAll(".popup")[1];
  const inputCardTitle = placeModal.querySelector(".popup__input_type_place");
  const inputCardImg = placeModal.querySelector(".popup__input_type_img");

  addedCardData.name = inputCardTitle.value;
  addedCardData.link = inputCardImg.value;

  const newCard = new Card(addedCardData, "#card-template");
  const newCardElement = newCard.generateCard();

  document.querySelector(".place").prepend(newCardElement);

  inputCardTitle.value = "";
  inputCardImg.value = "";
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
