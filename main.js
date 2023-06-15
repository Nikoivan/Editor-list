/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/editor-widget/editor-widget.js
class EditorWidget {
  constructor(properties) {
    const {
      parentName,
      form,
      popupFactory,
      tooltip,
      product,
      confirm
    } = properties;
    this.container = document.querySelector(`.${parentName}`);
    this.element = document.querySelector('.widget');
    this.formController = new form(tooltip);
    this.popupController = new popupFactory(document.body, this.element);
    this.itemType = product;
    this.confirmFactory = confirm;
    this.widgetController = this.element.querySelector('.widget-title-control');
    this.add = this.widgetController.querySelector('.product-add');
    this.productListDOM = this.element.querySelector('.products-list');
    this.onAdd = this.onAdd.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.add.addEventListener('click', this.onAdd);
  }
  onAdd() {
    const form = this.formController.form;
    form.addEventListener('click', this.onSubmit);
    this.popupController.showPopup(form);
  }
  addProduct(data) {
    const newProduct = new this.itemType(data, this.confirmFactory);
    const product = newProduct.element;
    const edit = product.querySelector('.edit');
    this.editProduct = this.editProduct.bind(this);
    edit.addEventListener('click', () => this.editProduct(newProduct));
    this.productListDOM.append(product);
  }
  editProduct(product) {
    const form = this.formController.form;
    this.formController.setProduct(product.values);
    this.productInProcess = product;
    this.popupController.showPopup(form);
  }
  onSubmit(e) {
    e.preventDefault();
    const formId = +e.target.closest('form').dataset.id;
    const data = this.processOfClick(e.target, formId);
    if (!data) {
      return;
    }
    if (!this.productInProcess) {
      this.addProduct(data);
    } else {
      this.productInProcess.editElement(data);
      this.productInProcess = null;
    }
    this.popupController.removePopup(formId);
  }
  processOfClick(target, formId) {
    if (target.textContent === 'Отмена') {
      this.popupController.removePopup(formId);
      return;
    } else if (target.textContent === 'Сохранить') {
      const data = this.formController.data;
      return data;
    }
  }
}
;// CONCATENATED MODULE: ./src/editor-widget/components/form.js

class Form {
  constructor(tooltipController) {
    const form = document.createElement("form");
    form.classList.add("form-widget");
    form.setAttribute("novalidate", true);
    const itemName = document.createElement("label");
    itemName.classList.add("item-label");
    itemName.setAttribute("for", "title");
    itemName.textContent = "Название";
    const inputTitle = document.createElement("input");
    inputTitle.classList.add("item-input");
    inputTitle.classList.add("title");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("name", "item-title");
    inputTitle.setAttribute("required", true);
    const itemPrice = document.createElement("label");
    itemPrice.classList.add("item-label");
    itemPrice.setAttribute("for", "price");
    itemPrice.textContent = "Стоимость";
    const inputPrice = document.createElement("input");
    inputPrice.classList.add("item-input");
    inputPrice.classList.add("price");
    inputPrice.setAttribute("type", "text");
    inputPrice.setAttribute("name", "item-price");
    inputPrice.setAttribute("required", true);
    inputPrice.setAttribute("pattern", "^[0-9 ]+");
    const acceptBtn = document.createElement("button");
    acceptBtn.classList.add("btn");
    acceptBtn.classList.add("accept");
    acceptBtn.textContent = "Сохранить";
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("btn");
    cancelBtn.classList.add("cancel");
    cancelBtn.textContent = "Отмена";
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    btnContainer.append(acceptBtn);
    btnContainer.append(cancelBtn);
    form.append(itemName);
    form.append(inputTitle);
    form.append(itemPrice);
    form.append(inputPrice);
    form.append(btnContainer);
    this._form = form;
    this.inputTitle = inputTitle;
    this.inputPrice = inputPrice;
    this.tooltipController = new tooltipController();
    this.errors = {
      "item-title": {
        valueMissing: "Введите название товара"
      },
      "item-price": {
        valueMissing: "Укажите стоимость товара",
        patternMismatch: "Стоимость товара должна быть указана в цифрах"
      }
    };
  }
  get form() {
    return this._form;
  }
  get data() {
    const elements = [...this._form.elements].filter(el => el.name);
    const data = {};
    this.tooltipController.clearTooltips();
    const error = this.getError(elements);
    if (!error.valid) {
      this.tooltipController.showTooltip(error);
      return error.valid;
    }
    elements.forEach(el => {
      data[el.name] = el.value;
    });
    this._form.reset();
    return data;
  }
  setProduct(productValues) {
    this.inputTitle.value = productValues.title;
    this.inputPrice.value = productValues.price;
  }
  getError(elements) {
    const error = {
      valid: true
    };
    elements.some(el => {
      return Object.keys(ValidityState.prototype).some(key => {
        if (key === "valid") {
          return;
        }
        if (el.validity[key]) {
          error.message = this.errors[el.name][key];
          error.element = el;
          error.valid = false;
          return true;
        }
      });
    });
    return error;
  }
}
;// CONCATENATED MODULE: ./src/editor-widget/img/pencil.png
const pencil_namespaceObject = __webpack_require__.p + "44caa5232bd4e6ecc996.png";
;// CONCATENATED MODULE: ./src/editor-widget/img/cross.png
const cross_namespaceObject = __webpack_require__.p + "bc675725f0cb7a73486a.png";
;// CONCATENATED MODULE: ./src/editor-widget/components/product.js



class Product {
  constructor(properties, confirmFactory) {
    const id = Math.ceil(performance.now());
    const product = document.createElement('li');
    product.classList.add('list-item');
    product.dataset.id = id;
    product.innerHTML = `<div class="product-item-wrapper"><span class="product-title">${properties['item-title']}</span></div>
    <div class="product-item-wrapper"><span class="product-price">${properties['item-price']}</span></div>
    <div class="product-item-wrapper"><div class="moves">
        <img src="${pencil_namespaceObject}" alt="Редактировать" class="edit">
        <img src="${cross_namespaceObject}" alt="Удалить" class="delete"></div>               
    </div>`;
    this._element = product;
    this.title = this._element.querySelector('.product-title');
    this.price = this._element.querySelector('.product-price');
    this.deleteBtn = this._element.querySelector('.delete');
    this.confirmController = new confirmFactory({
      confirmTitle: 'Вы уверенны, что хотите удалить этот товар?',
      acceptBtn: 'УДАЛИТЬ',
      cancelBtn: 'ОТМЕНА'
    });
    this.deleteElement = this.deleteElement.bind(this);
    this.deleteBtn.addEventListener('click', this.deleteElement);
  }
  get element() {
    return this._element;
  }
  get values() {
    return {
      title: this.title.textContent,
      price: +this.price.textContent
    };
  }
  editElement(data) {
    this.title.textContent = data['item-title'];
    this.price.textContent = data['item-price'];
  }
  deleteElement() {
    this.confirmController.showConfirmForm(this._element);
  }
}
;// CONCATENATED MODULE: ./src/editor-widget/components/popup.js

class PopupFactory {
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
    const {
      top,
      left
    } = this.onElement.getBoundingClientRect();
    element.style.top = `${top + this.onElement.offsetHeight / 2 - element.offsetHeight / 2}px`;
    element.style.left = `${left + this.onElement.offsetWidth / 2 - element.offsetWidth / 2}px`;
    this.actualPopups.push({
      id,
      element
    });
  }
  removePopup(id) {
    const popup = this.actualPopups.find(el => el.id === +id);
    popup.element.remove();
    this.actualPopups = this.actualPopups.filter(el => el.id !== +id);
  }
}
;// CONCATENATED MODULE: ./src/editor-widget/components/tooltips.js

class TooltipFactory {
  constructor() {
    this.tooltips = [];
  }
  showTooltip(data) {
    const {
      message,
      element
    } = data;
    const tooltipText = document.createElement('p');
    tooltipText.textContent = message;
    tooltipText.classList.add('tooltip-text');
    const tooltipEl = document.createElement('div');
    tooltipEl.classList.add('tooltip');
    tooltipEl.append(tooltipText);
    document.body.append(tooltipEl);
    const {
      top,
      left
    } = element.getBoundingClientRect();
    tooltipEl.style.top = `${top - tooltipEl.offsetHeight / 2 + element.offsetHeight / 2}px`;
    tooltipEl.style.left = `${left + element.offsetWidth + 10}px`;
    this.tooltips.push(tooltipEl);
  }
  clearTooltips() {
    this.tooltips.forEach(el => el.remove());
  }
}
;// CONCATENATED MODULE: ./src/editor-widget/components/confirm.js

class ConfirmFactory {
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
    const {
      confirmTitle,
      acceptBtn,
      cancelBtn
    } = this.settings;
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
    const {
      top,
      left
    } = element.getBoundingClientRect();
    document.body.append(this.container);
    this.container.style.top = `${top + element.offsetHeight / 2 - this.container.offsetHeight / 2}px`;
    this.container.style.left = `${left + element.offsetWidth / 2 - this.container.offsetWidth / 2}px`;
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
;// CONCATENATED MODULE: ./src/js/app.js






const properties = {
  parentName: 'container',
  form: Form,
  product: Product,
  popupFactory: PopupFactory,
  tooltip: TooltipFactory,
  confirm: ConfirmFactory
};
const editorWidget = new EditorWidget(properties);
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;