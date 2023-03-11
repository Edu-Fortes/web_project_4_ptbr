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

//  FUNÇÃO PARA ABRIR/FECHAR OS MODALS
const openCloseProfileModal = () => {
  profileModal.classList.toggle("popup_opened");

  const nameInput = profileModal.querySelector(".popup__input_type_name");
  const aboutInput = profileModal.querySelector(".popup__input_type_about");

  const perfilName = document.querySelector(".profile__title");
  const perfilAbout = document.querySelector(".profile__subtitle");

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

  const nameInput = profileModal.querySelector(".popup__input_type_name");
  const aboutInput = profileModal.querySelector(".popup__input_type_about");

  const perfilName = document.querySelector(".profile__title");
  const perfilAbout = document.querySelector(".profile__subtitle");

  perfilName.textContent = nameInput.value;
  perfilAbout.textContent = aboutInput.value;

  openCloseProfileModal();
}

formElement.addEventListener("submit", handleProfileFormSubmit);

//  ENVIAR FORMULARIO PARA ADICIONAR NOVA FOTO

//  BOTÃO CURTIR ATIVO

//  ZOOM NA FOTO QUANDO CLICAR

//  EXCLUIR POSTAGEM
