import "./css/form.css";

export default class Form {
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
        valueMissing: "Введите название товара",
      },
      "item-price": {
        valueMissing: "Укажите стоимость товара",
        patternMismatch: "Стоимость товара должна быть указана в цифрах",
      },
    };
  }

  get form() {
    return this._form;
  }
  get data() {
    const elements = [...this._form.elements].filter((el) => el.name);
    const data = {};

    this.tooltipController.clearTooltips();

    const error = this.getError(elements);
    if (!error.valid) {
      this.tooltipController.showTooltip(error);
      return error.valid;
    }

    elements.forEach((el) => {
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
    const error = { valid: true };
    elements.some((el) => {
      return Object.keys(ValidityState.prototype).some((key) => {
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
