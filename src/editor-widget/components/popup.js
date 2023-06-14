import './css/popup.css';

export default class PopupFactory {
  constructor(inElement, onElement) {
    this.inElement = inElement;
    this.onElement = onElement;
    this.actualPopups = [];
  }

  showPopup(element) {
    const id = Math.ceil(performance.now());
    element.classList.add('popup');
    element.dataset.id = id;
    this.inElement.append(element);

    const { top, left } = this.onElement.getBoundingClientRect();

    element.style.top = `${
      top + this.onElement.offsetHeight / 2 - element.offsetHeight / 2
    }px`;
    element.style.left = `${
      left + this.onElement.offsetWidth / 2 - element.offsetWidth / 2
    }px`;

    this.actualPopups.push({ id, element });
  }

  removePopup(id) {
    const popup = this.actualPopups.find((el) => el.id === +id);
    popup.element.remove();
    this.actualPopups = this.actualPopups.filter((el) => el.id !== +id);
  }
}
