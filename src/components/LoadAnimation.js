export default class LoadAnimation {
  constructor(selector) {
    this._selector = selector;
  }

  profileSection(isLoading) {
    if (isLoading) {
      const avatar = document.querySelector(".img_avatar");
      const title = document.querySelector(".profile__title");
      const subtitle = document.querySelector(".profile__subtitle");
      avatar.alt = ".";
      avatar.classList.add(this._selector.skeletonAvatar);
      title.classList.add("skeleton", "skeleton_title");
      subtitle.classList.add("skeleton", "skeleton_subtitle");
    } else {
      avatar.alt = "Foto do perfil do usuário";
      avatar.classList.remove("skeleton", "skeleton_avatar");
      title.classList.remove("skeleton", "skeleton_title");
      subtitle.classList.remove("skeleton", "skeleton_subtitle");
    }
  }

  cardsSection(isLoading) {
    const container = document.querySelector(".place");
    const cardTemplate = document.querySelector("#cards-loading");
    if (isLoading) {
      for (let i = 0; i < 6; i++) {
        container.append(cardTemplate.content.cloneNode(true));
      }
    }
  }
}
