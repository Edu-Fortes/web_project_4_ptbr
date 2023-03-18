//CARREGA OS 6 CARDS INICIAIS
const initialCards = [
  {
    name: "Grand Canyon",
    link: "./images/places_photo/grand_canion.jpg",
  },
  {
    name: "Reprea Hoover",
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
];

const placeContainer = document.querySelector(".place");

initialCards.forEach((card) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".place__card")
    .cloneNode(true);

  const placeImg = cardElement.querySelector(".img"); //pega o src da imgem no card para alterar a imgem
  const cardTitle = cardElement.querySelector(".place__name"); //pega o título do card para aterar

  cardTitle.textContent = card.name;
  placeImg.src = card.link;
  placeImg.alt = `Imagem ${card.name}`;

  placeContainer.append(cardElement);
});

//***MODALS***/

const modals = document.querySelectorAll(".popup");

const profileModal = modals[0];
const placeModal = modals[1];
const photoModal = modals[2];

//  FUNÇÃO PARA DEIXAR MODALS FECHADO NO CARREGAMENTO DA PÁGINA
modals.forEach((item) => {
  item.classList.remove("popup_opened");
});

//  PEGAR O BOTÃO DE ABRIR/FECHAR EDIÇÃO DE PERFIL
const openProfileModalBtn = document.querySelector(".button_edit");
const closeProfileModalBtn = profileModal.querySelector(".button_close");

//  PEGAR BOTÃO DE ABRIR/FECHAR MODAL ADICIONAR FOTO
const openPlaceModalBtn = document.querySelector(".button_add");
const closePlaceModalBtn = placeModal.querySelector(".button_close");

//PEGA CAMPOS DE INFORMAÇÃO DO MODAL EDITAR PERFIL
const nameInput = profileModal.querySelector(".popup__input_type_name");
const aboutInput = profileModal.querySelector(".popup__input_type_about");

const perfilName = document.querySelector(".profile__title");
const perfilAbout = document.querySelector(".profile__subtitle");

//  FUNÇÃO PARA ABRIR/FECHAR OS MODALS
const openCloseProfileModal = () => {
  profileModal.classList.toggle("popup_opened");

  nameInput.value = perfilName.textContent;
  aboutInput.value = perfilAbout.textContent;
};

const openClosePlaceModal = () => {
  placeModal.classList.toggle("popup_opened");
};

//  EVENT LISTENER NOS BOTÕES DE ABRIR E FECHAR
openProfileModalBtn.addEventListener("click", openCloseProfileModal);
closeProfileModalBtn.addEventListener("click", openCloseProfileModal);

openPlaceModalBtn.addEventListener("click", openClosePlaceModal);
closePlaceModalBtn.addEventListener("click", openClosePlaceModal);

//  ENVIAR O FORMULARIO DO MODAL EDITAR PERFIL
const formElement = profileModal.querySelector(".popup__form");

function handleProfileFormSubmit(e) {
  e.preventDefault();

  perfilName.textContent = nameInput.value;
  perfilAbout.textContent = aboutInput.value;

  openCloseProfileModal();
}

formElement.addEventListener("submit", handleProfileFormSubmit);

//  ENVIAR FORMULARIO PARA ADICIONAR NOVA FOTO

const formPlaceElement = placeModal.querySelector(".popup__form");

//ADICIONA O CARD DE FOTO
function addPlaceCard(e) {
  e.preventDefault();

  //  PEGA TEMPLATE DO CARD
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".place__card")
    .cloneNode(true);

  const placeImg = cardElement.querySelector(".img"); //pega o src da imgem no card para alterar a imgem
  const cardTitle = cardElement.querySelector(".place__name"); //pega o título do card para aterar
  const placeNameInput = placeModal.querySelector(".popup__input_type_place"); //pega o campo de inserção do titulo do modal places
  const imgInput = placeModal.querySelector(".popup__input_type_img"); //pega o campo de input da url da imagem

  cardTitle.textContent = placeNameInput.value;
  placeImg.src = imgInput.value;
  placeImg.alt = cardTitle.textContent;

  openClosePlaceModal();

  placeContainer.prepend(cardElement);

  placeNameInput.value = "";
  imgInput.value = "";

  const likeBtn = cardElement.querySelector(".button__like");

  likeBtn.classList.remove("button__like_active");

  likeBtn.addEventListener("click", (e) => {
    e.target.classList.toggle("button__like_active");
  });

  onCLickOpenPhoto();
}

formPlaceElement.addEventListener("submit", addPlaceCard);

//REMOVE O ESTADO ATIVO DO BOTÃO LIKE NO CARREGAMENTO DA PÁGINA
const likeButton = document.querySelectorAll(".button__like");

likeButton.forEach((button) => {
  button.classList.remove("button__like_active");
});

//  BOTÃO CURTIR ATIVO

likeButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.target.classList.toggle("button__like_active");
  });
});

//  ZOOM NA FOTO QUANDO CLICAR
//PEGAR "BOTÃO" PARA ABRIR/FECHAR ZOOM NA FOTO
let childPlaceNodes = placeContainer.childNodes;

const openPhoto = placeContainer.querySelectorAll(".img_card");
const closePhotoBtn = photoModal.querySelector(".button_close");

//FUNÇÃO PARA ABRIR O MODAL DAS FOTOS
const openPhotoModal = () => {
  changePhotoURL();
  photoModal.classList.add("popup_opened");
};

//FUNÇÃO PARA FECHAR O MODAL DA FOTO
const closePhotoModal = () => {
  changePhotoURL();
  photoModal.classList.remove("popup_opened");
};

//QUANDO CLICAR NO X FECHA O MODAL DA FOTO
closePhotoBtn.addEventListener("click", closePhotoModal);

//FUNÇÃO PARA PEGAR A URL DA IMAGEM NO GRID E ABRIR A FOTO
let photoSrc;
function onCLickOpenPhoto() {
  childPlaceNodes.forEach((photo) => {
    let img = photo.querySelector(".img_card");
    img.addEventListener("click", (e) => {
      photoSrc = e.target.src;
      openPhotoModal();
    });
  });
}

//QUANDO CLICAR NA FOTO ABRIR O MODAL COM A FOTO CLICADA
onCLickOpenPhoto();

//MUDA URL DA IMAGEM NO MODAL DE FOTO
const changePhotoURL = () => {
  const zoomedPhoto = photoModal.querySelector(".popup__img");
  zoomedPhoto.src = photoSrc;
};

//MUDAR A FIGCAPTION QUANDO ABRIR A IMAGEM

//OPACITY DA IMG DO CARD QUANDO HOVER NO TRASH

//  EXCLUIR POSTAGEM

//  ANIMAÇÃO ABRIR E FECHAR OS MODALS
