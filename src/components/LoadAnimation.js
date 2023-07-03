export default class LoadAnimation {
  constructor(selector) {
    this._selector = selector;
    this._avatar = document.querySelector(this._selector.imgAvatar);
    this._title = document.querySelector(this._selector.nameSelector);
    this._subtitle = document.querySelector(this._selector.workSelector);
    this._editBtn = document.querySelector(this._selector.editBtn);
    this._addBtn = document.querySelector(this._selector.addBtn);
  }

  profileSection(isLoading) {
    if (isLoading) {
      this._avatar.alt = ".";
      this._avatar.classList.add(
        this._selector.skeleton,
        this._selector.skeletonAvatar
      );
      this._title.classList.add(
        this._selector.skeleton,
        this._selector.skeletonTitle
      );
      this._subtitle.classList.add(
        this._selector.skeleton,
        this._selector.skeletonSubtitle
      );
      this._editBtn.classList.add(
        this._selector.skeleton,
        this._selector.btnHidde
      );
      this._addBtn.classList.add(
        this._selector.skeleton,
        this._selector.btnHidde
      );
    } else {
      this._avatar.alt = "Foto do perfil do usuário";
      this._avatar.classList.remove(
        this._selector.skeleton,
        this._selector.skeletonAvatar
      );
      this._title.classList.remove(
        this._selector.skeleton,
        this._selector.skeletonTitle
      );
      this._subtitle.classList.remove(
        this._selector.skeleton,
        this._selector.skeletonSubtitle
      );
      this._editBtn.classList.remove(
        this._selector.skeleton,
        this._selector.btnHidde
      );
      this._addBtn.classList.remove(
        this._selector.skeleton,
        this._selector.btnHidde
      );
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
