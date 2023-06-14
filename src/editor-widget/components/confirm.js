import './css/confirm.css';

export default class ConfirmFactory {
  constructor(settings) {
    this.settings = settings;

    this.container = document.createElement('div');
    this.container.classList.add('confirm-container');
    this._form = this.form;
    this.container.append(this._form);

    this.onBtnClick = this.onBtnClick.bind(this);

    this._form.addEventListener('click', this.onBtnClick);
  }

  get form() {
    const { confirmTitle, acceptBtn, cancelBtn } = this.settings;

    const form = document.createElement('form');
    form.classList.add('confirm-form');

    form.innerHTML = `<div class="confirm-wrapper">
    <h3 class="confirm-title">${confirmTitle}</h3>
    <button class="btn confirm-accept-btn">${acceptBtn}</button>
    <button class="btn confirm-cancel-btn">${cancelBtn}</button>
</div>`;

    return form;
  }

  showConfirmForm(element) {
    const { top, left } = element.getBoundingClientRect();
    document.body.append(this.container);

    this.container.style.top = `${
      top + element.offsetHeight / 2 - this.container.offsetHeight / 2
    }px`;
    this.container.style.left = `${
      left + element.offsetWidth / 2 - this.container.offsetWidth / 2
    }px`;

    this.elToDo = element;
  }

  onBtnClick(e) {
    e.preventDefault();

    if (e.target.classList.contains('confirm-accept-btn')) {
      this.elToDo.remove();
      this.deleteConfirmForm();
    } else if (e.target.classList.contains('confirm-cancel-btn')) {
      this.deleteConfirmForm();
    }
  }

  deleteConfirmForm() {
    this.container.remove();
  }
}
