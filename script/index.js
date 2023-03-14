//CARREGA OS 6 CARDS INICIAIS
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
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
  placeImg.alt = "Imagem " + card.name;

  placeContainer.append(cardElement);
});

//***MODALS***/

const modals = document.querySelectorAll(".popup");

const profileModal = modals[0];
const placeModal = modals[1];

//  FUNÇÃO PARA DEIXAR MODALS FECHADO NO CARREGAMENTO DA PÁGINA
modals.forEach((item) => {
  item.classList.remove("popup_opened");
});

//  PEGAR O BOTÃO DE ABRIR EDIÇÃO DE PERFIL
const openProfileModalBtn = document.querySelector(".button_edit");
const closeProfileModalBtn = profileModal.querySelector(".button_close");

//  PEGAR BOTÃO DE ABRIR MODAL ADICIONAR FOTO
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
}

formPlaceElement.addEventListener("submit", addPlaceCard);
//  BOTÃO CURTIR ATIVO

//  ZOOM NA FOTO QUANDO CLICAR

//  EXCLUIR POSTAGEM
