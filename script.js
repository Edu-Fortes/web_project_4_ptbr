//Object with profile section query elements
const profile = {
  section: ".profile",
  editBtn: ".button_edit",
  inputName: ".popup__input_type_name",
  inputAbout: ".popup__input_type_about",
  perfilName: ".profile__title",
  perfilAbout: ".profile__subtitle",
};
//Object with place section query elements
const place = {
  cardTemplate: "#card-template",
  container: ".place",
  addBtn: ".button_add",
  card: ".place__card",
  img: ".img",
  title: ".place__name",
  inputTitle: ".popup__input_type_place",
  inputImg: ".popup__input_type_img",
};
//Object with popup section query elements
const popup = {
  popup: ".popup",
  opened: "popup_opened",
  formElement: ".popup__form",
  profileForm: "popup__form_profile",
  placeForm: "popup__form_place",
};
/* Constants to set each modal returned by NodeList.
 * - One for profile modal - inputs to change profile info
 * - One for place modal - inputs to add new card/post
 * - One for photo modal - show bigger clicked card photo
 * */
const modals = document.querySelectorAll(popup.popup); //returns a NodeList with 3 popup results
const profileModal = modals[0];
const placeModal = modals[1];
const photoModal = modals[2];
//Global query selector consts
const profileSection = document.querySelector(profile.section);
const openProfileBtn = profileSection.querySelector(profile.editBtn); //get button to open modal to edit profile info
const openPlaceBtn = profileSection.querySelector(place.addBtn); //get button to open modal to add new card
const inputName = profileModal.querySelector(profile.inputName); //get name input field from the form inside modal to edit profile
const inputAbout = profileModal.querySelector(profile.inputAbout); // get about field from form inside modal to edit profile
const perfilName = profileSection.querySelector(profile.perfilName); //get element that contains text who displays pofile name on page
const perfilAbout = profileSection.querySelector(profile.perfilAbout); //get element that contains text that display about info on page
const formElement = document.querySelectorAll(popup.formElement);
//Function to close all modals on page inicialization
modals.forEach((modal) => {
  modal.classList.remove(popup.opened);
});

//Loads 6 initial cards using "initialCards" const
const initialCards = [
  {
    name: "Grand Canyon",
    link: "./images/places_photo/grand_canion.jpg",
  },
  {
    name: "Represa Hoover",
    link: "./images/places_photo/hover_dam.jpg",
  },
  {
    name: "Nova Iorque",
    link: "./images/places_photo/new_york.jpg",
  },
  {
    name: "California",
    link: "./images/places_photo/california_pier.jpg",
  },
  {
    name: "Las Vegas",
    link: "./images/places_photo/las_vegas.jpg",
  },
  {
    name: "São Francisco",
    link: "./images/places_photo/san_francisco.jpg",
  },
]; //Array with initial cards info to be loaded on page startup
const placeContainer = document.querySelector(place.container);
/* Get information from initialCard Array and construct a card with it.
 * Loop trought each object inside the array*/
initialCards.forEach((card) => {
  const cardTemplate = document.querySelector(place.cardTemplate).content;
  const cardElements = cardTemplate.querySelector(place.card).cloneNode(true);
  const placeImg = cardElements.querySelector(place.img);
  const cardTitle = cardElements.querySelector(place.title);
  cardTitle.textContent = card.name;
  placeImg.src = card.link;
  placeImg.alt = `Imagem de capa da postagem ${card.name}`;
  placeContainer.append(cardElements);
});
//Function to open modals
const openProfileModal = () => {
  profileModal.classList.add(popup.opened);
  inputName.value = perfilName.textContent;
  inputAbout.value = perfilAbout.textContent;
};
const openPlaceModal = () => {
  placeModal.classList.add(popup.opened);
};
//Functions to close modals
const closeProfileModal = () => {
  profileModal.classList.remove(popup.opened);
};
const closePlaceModal = () => {
  placeModal.classList.remove(popup.opened);
};
/* Event listener for click inside profile section, function will ckeck
 * witch element was clicked and perform an action*/
profileSection.addEventListener("click", handleProfileSectionClick);
function handleProfileSectionClick(event) {
  const target = event.target;
  //Check if the clicked element is the edit profile button
  if (target.classList.contains("button_edit")) {
    openProfileModal(target);
    return;
  }
  //Check if the clicked element is the edit profile button image (pen icon)
  if (target.classList.contains("img_button_edit")) {
    openProfileModal(target);
    return;
  }
  //Check if the clicked element is the edit profile button
  if (target.classList.contains("button_add")) {
    openPlaceModal(target);
    return;
  }
  //Check if the clicked element is the edit profile button image (plus sign)
  if (target.classList.contains("img_button_add")) {
    openPlaceModal(target);
    return;
  }
}
/* Event listener for clicks on close button, function will ckeck
 * witch modal close button was clicked and perfom an action*/
modals.forEach((modal) => {
  modal.addEventListener("click", handleModalsClick);
});
function handleModalsClick(event) {
  const target = event.target;
  if (target.classList.contains("img_button_close")) {
    closeProfileModal(target) || closePlaceModal(target);
  }
}
/*Function to prevent form submit and to change profile info on form submit*/
formElement.forEach((form) => {
  form.addEventListener("submit", handleFormSubmit);
});
function handleFormSubmit(event) {
  const target = event.target;
  if (target.classList.contains(popup.profileForm)) {
    event.preventDefault();
    perfilName.textContent = inputName.value;
    perfilAbout.textContent = inputAbout.value;
    closeProfileModal();
  }
  if (target.classList.contains(popup.placeForm)) {
    event.preventDefault();
    const cardTemplate = document.querySelector(place.cardTemplate).content;
    const cardElement = cardTemplate.querySelector(place.card).cloneNode(true);
    const placeImg = cardElement.querySelector(place.img);
    const cardTitle = cardElement.querySelector(place.title);
    const inputCardTitle = placeModal.querySelector(place.inputTitle);
    const inputCardImg = placeModal.querySelector(place.inputImg);
    cardTitle.textContent = inputCardTitle.value;
    placeImg.src = inputCardImg.value;
    placeImg.alt = `Imagem de capa da postagem ${cardTitle.textContent}`;
    closePlaceModal();
    placeContainer.prepend(cardElement);
    inputCardTitle.value = "";
    inputCardImg.value = "";
  }
}