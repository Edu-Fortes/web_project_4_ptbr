export default class LoadAnimation {
  constructor(selector) {
    this._selector = selector;
    this._avatar = document.querySelector(this._selector.imgAvatar);
    this._title = document.querySelector(this._selector.nameSelector);
    this._subtitle = document.querySelector(this._selector.aboutSelector);
    this._editBtn = document.querySelector(this._selector.editBtn);
    this._addBtn = document.querySelector(this._selector.addBtn);
    this._pencilIcon = document.querySelector(this._selector.pencilIcon);
    this._plusIcon = document.querySelector(this._selector.plusIcon);
    this._btnSave = document.querySelector(this._selector.btnSave);
    this._btnCreate = document.querySelector(this._selector.btnCreate);
    this._btnAvatar = document.querySelector(this._selector.btnAvatar);
    this._spinnerModal = document.querySelector(this._selector.spinnerModal);
  }

  profileSection(isLoading) {
    //check if isLoading is true. If is true add animation classes
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
      this._pencilIcon.classList.add(this._selector.imgHide);
      this._plusIcon.classList.add(this._selector.imgHide);
    }
    //if false removes all added css classes
    else {
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
      this._pencilIcon.classList.remove(this._selector.imgHide);
      this._plusIcon.classList.remove(this._selector.imgHide);
    }
  }

  cardsSection(isLoading) {
    const container = document.querySelector(".place");
    const cardTemplate = document.querySelector("#cards-loading");
    const cards = [0, 1, 2, 3, 4, 5];
    if (isLoading) {
      cards.forEach(() => {
        container.append(cardTemplate.content.cloneNode(true));
      });
    }
  }

  saveBtn(isLoading, whichBtn) {
    if (whichBtn == null) {
      if (isLoading) {
        this._btnSave.textContent = "Salvando";
        this._btnSave.classList.add(this._selector.loading);
      } else {
        this._btnSave.textContent = "Salvar";
        this._btnSave.classList.remove(this._selector.loading);
      }
      return;
    }
    if (whichBtn == "avatar") {
      if (isLoading) {
        this._btnAvatar.textContent = "Salvando";
        this._btnAvatar.classList.add(this._selector.loading);
      } else {
        this._btnAvatar.textContent = "Salvar";
        this._btnAvatar.disabled = true;
        this._btnAvatar.classList.add("button_disabled");
        this._btnAvatar.classList.remove(this._selector.loading);
      }
      return;
    }
  }

  createBtn(isLoading) {
    if (isLoading) {
      this._btnCreate.textContent = "Criando";
      this._btnCreate.classList.add(this._selector.loading);
    } else {
      this._btnCreate.textContent = "Criar";
      this._btnCreate.disabled = true;
      this._btnCreate.classList.add("button_disabled");
      this._btnCreate.classList.remove(this._selector.loading);
    }
  }

  spinnerModal(isLoading) {
    if (isLoading) {
      this._spinnerModal.classList.add("popup_opened");
    } else {
      this._spinnerModal.classList.remove("popup_opened");
    }
  }

  likeSpinner(isLoading, counter) {
    if (isLoading) {
      counter.textContent = "";
      counter.classList.add(this._selector.countSpinner);
    } else {
      counter.classList.remove(this._selector.countSpinner);
    }
  }
}
