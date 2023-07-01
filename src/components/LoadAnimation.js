export default class LoadAnimation {
  constructor(selector) {
    this._selector = selector;
    this._avatar = document.querySelector(".img_avatar");
    this._title = document.querySelector(".profile__title");
    this._subtitle = document.querySelector(".profile__subtitle");
  }

  // profileSection(isLoading) {
  //   if (isLoading) {
  //     console.log(this._avatar);
  //     this._avatar.alt = ".";
  //     this._avatar.classList.add(this._selector.skeletonAvatar);
  //     this._title.classList.add("skeleton", "skeleton_title");
  //     this._subtitle.classList.add("skeleton", "skeleton_subtitle");
  //   } else {
  //     avatar.alt = "Foto do perfil do usuário";
  //     avatar.classList.remove("skeleton", "skeleton_avatar");
  //     title.classList.remove("skeleton", "skeleton_title");
  //     subtitle.classList.remove("skeleton", "skeleton_subtitle");
  //   }
  // }

  cardsSection(isLoading) {
    const container = document.querySelector(".place");
    const cardTemplate = document.querySelector("#cards-loading");
    if (isLoading) {
      for (let i = 0; i < 6; i++) {
        container.append(cardTemplate.content.cloneNode(true));
      }
    } else {
      container.innerHTML = "";
    }
  }
}
