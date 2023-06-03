export default class UserInfo {
  constructor({ nameSelector, workSelector }) {
    this.nameSelector = document.querySelector(nameSelector);
    this.workSelector = document.querySelector(workSelector);
  }

  getUserInfo() {
    //retorna um objeto com informações sobre o usuário
    const userData = {};
    userData.name = this.nameSelector.textContent;
    userData.work = this.workSelector.textContent;

    console.log(this.nameSelector);
    console.log(this.workSelector);
    console.log(userData);

    return userData;
  }

  setUserInfo(nameInputClass, workInputClass) {
    //pega novos dados do usuárioe adiciona na página
    this.userInfo = this.getUserInfo();

    this.userInfo.name = document.querySelector(nameInputClass).value;
    this.userInfo.work = document.querySelector(workInputClass).value;

    this.nameSelector.textContent = this.userInfo.name;
    this.workSelector.textContent = this.userInfo.work;

    console.log(this.userInfo);
    console.log(this.userInfo.name);
    console.log(this.userInfo.work);
  }
}
