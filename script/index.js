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
  photo: "img_card",
  title: ".place__name",
  inputTitle: ".popup__input_type_place",
  inputImg: ".popup__input_type_img",
  likeBtn: ".button__like",
  likeBtnActive: "button__like_active",
  trashBtn: ".button_trash",
  trashBtnElement: "button_trash",
  fig: ".place__fig",
  likeBtnElement: "button__like",
};
//Object with popup section query elements
const popup = {
  popup: ".popup",
  opened: "popup_opened",
  formElement: ".popup__form",
  profileForm: "popup__form_profile",
  placeForm: "popup__form_place",
  img: ".popup__img",
  figCaption: ".popup__figcaption",
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
  addKeydownListener();
};
const openPlaceModal = () => {
  placeModal.classList.add(popup.opened);
  addKeydownListener();
};
//Functions to close modals
const closeProfileModal = () => {
  profileModal.classList.remove(popup.opened);
  removeKeydownListener();
};
const closePlaceModal = () => {
  placeModal.classList.remove(popup.opened);
  removeKeydownListener();
};
const closePhotoModal = () => {
  photoModal.classList.remove(popup.opened);
  removeKeydownListener();
};
//Function to add keydown listener when popup is opened
const addKeydownListener = () => {
  document.addEventListener("keydown", handleKeydown);
};
//Function to remove keydown listener when popup closes
const removeKeydownListener = () => {
  document.removeEventListener("keydown", handleKeydown);
};
//Function to handle keypress (Escape) to close modal
function handleKeydown(event) {
  if (event.key === "Escape") {
    closeProfileModal();
    closePlaceModal();
    closePhotoModal();
  }
}
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
//Function to handle clicks to close modal
function handleModalsClick(event) {
  const target = event.target;
  if (
    target.classList.contains("img_button_close") ||
    target.classList.contains("popup")
  ) {
    closeProfileModal(target);
    closePlaceModal(target);
    closePhotoModal(target);
  }
}
//Listener to catch form submition from edit profile and add photo
formElement.forEach((form) => {
  form.addEventListener("submit", handleFormSubmit);
});
//Function to watch witch form was submited
function handleFormSubmit(event) {
  const target = event.target;
  //Check if the clicked element is the Save button in Profile Modal
  if (target.classList.contains(popup.profileForm)) {
    event.preventDefault();
    formSubmitProfile(target);
    return;
  }
  //Check if clicked element is the Add button in Add Place Modal
  if (target.classList.contains(popup.placeForm)) {
    event.preventDefault(); //prevents re-load of page on form submition
    formSubmitAddPlace(target);
    return;
  }
}
//Function to change input fieds from profile setion
function formSubmitProfile() {
  perfilName.textContent = inputName.value; //change page user name by user input
  perfilAbout.textContent = inputAbout.value; //change page about info by user input
  closeProfileModal();
}
//Function to enter values to add new card to beginning of place container
function formSubmitAddPlace() {
  const cardTemplate = document.querySelector(place.cardTemplate).content;
  const cardElement = cardTemplate.querySelector(place.card).cloneNode(true);
  const placeImg = cardElement.querySelector(place.img);
  const cardTitle = cardElement.querySelector(place.title);
  const inputCardTitle = placeModal.querySelector(place.inputTitle);
  const inputCardImg = placeModal.querySelector(place.inputImg);
  const likeBtn = cardElement.querySelector(place.likeBtn);
  cardTitle.textContent = inputCardTitle.value; //card name entered by user
  placeImg.src = inputCardImg.value; //URL to image
  placeImg.alt = `Imagem de capa da postagem ${cardTitle.textContent}`;
  closePlaceModal(); //close modal when submit form due preventDefault function
  placeContainer.prepend(cardElement); //add card to beginning of grid place
  inputCardTitle.value = ""; //reset input fields after form submition
  inputCardImg.value = ""; //reset input field after form submition
  likeBtn.classList.remove(place.likeBtnActive); //remove initial active state of like button
  handleCardEvent("click", removeCard);
  handleCardEvent("mouseenter", applyCardOpacity);
  handleCardEvent("mouseleave", removeCardOpacity);
}
//Remove active state of like buttons
const likeBtn = document.querySelectorAll(place.likeBtn);
const likeBtnArray = Array.from(likeBtn); //create an Array from NodeList returned by querySelectorAll
likeBtnArray.forEach((button) => {
  button.classList.remove(place.likeBtnActive);
});
//Handler function to watch witch button was clicked inside place container
placeContainer.addEventListener("click", handlePlaceContainerClick);
function handlePlaceContainerClick(event) {
  const target = event.target;
  //Check if clicked element is a like button
  if (target.classList.contains(place.likeBtnElement)) {
    handleLikeButtonClick(target);
    return;
  }
  //Ckeck if clicked element is a photo
  if (target.classList.contains(place.photo)) {
    handleOpenPhoto(target);
    return;
  }
}
//Cosolidated forEach loop for chieldNotes in one function that accepts callback
const childPlaceNodes = placeContainer.childNodes;
function forEachCard(callback) {
  childPlaceNodes.forEach(callback);
}
//Funtion to toggle state of like button (active to deactive and vice versa)
function handleLikeButtonClick(target) {
  target.classList.toggle(place.likeBtnActive);
}
//Function to open photo modal (zoom) when clicking on a photo
let photoSrc;
let figCaption;
function handleOpenPhoto(target) {
  const figAlt = target.alt; //get alt atribute from image to set figcaption when photo is zoomed
  const zoomedPhoto = photoModal.querySelector(popup.img);
  const photoCaption = photoModal.querySelector(popup.figCaption);
  photoSrc = target.src;
  figCaption = figAlt.slice(27); //slice string lenght to use only the title of the post
  photoCaption.textContent = figCaption; //add figcaption when image opens
  zoomedPhoto.src = photoSrc;
  zoomedPhoto.alt = `Imagem ampliada da postagem ${figCaption}`;
  photoModal.classList.add(popup.opened); //open photo modal
  addKeydownListener(); //add listener to close photo with "Esc" press
}
//Function to handle Events happening inside each card, need a callback function
function handleCardEvent(eventType, callback) {
  forEachCard((card) => {
    const trashBtn = card.querySelector(place.trashBtn);
    trashBtn.addEventListener(eventType, callback);
  });
}
//Callback function to remove a card
function removeCard(event) {
  const target = event.target;
  target.closest(place.card).remove();
}
//Callback function to apply opacity effect when hovering over trash button
function applyCardOpacity(event) {
  const target = event.target;
  const cardElement = target.parentElement.parentElement;
  const overlay = cardElement.querySelector(place.fig);
  const opacityValue = 0.5;
  overlay.style.setProperty("opacity", opacityValue);
}

//Callback function to remove opacity from imag card
function removeCardOpacity(event) {
  const target = event.target;
  const cardElement = target.parentElement.parentElement;
  const overlay = cardElement.querySelector(place.fig);
  const opacityValue = 0.5;
  overlay.style.removeProperty("opacity");
}
//Remove card on trash button click
handleCardEvent("click", removeCard);
//Apply opacity on card when hovering trash button
handleCardEvent("mouseenter", applyCardOpacity);
//Remove opacity when hovering trash button. Opacity is been applied by CSS
handleCardEvent("mouseleave", removeCardOpacity);
//REMOVER CLASSE BLOCO fig, VERIFICAR SE AINDA USA ESSA CLASSE EM ALGUM ELEMENTO.
