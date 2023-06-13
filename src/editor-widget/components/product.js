import editUrl from "../img/pencil.png";
import deleteUrl from "../img/cross.png";
import "./css/product.css";

export default class Product {
  constructor(properties, confirmFactory) {
    const id = Math.ceil(performance.now());

    const product = document.createElement("li");
    product.classList.add("list-item");
    product.dataset.id = id;

    product.innerHTML = `<div class="product-item-wrapper"><span class="product-title">${properties["item-title"]}</span></div>
    <div class="product-item-wrapper"><span class="product-price">${properties["item-price"]}</span></div>
    <div class="product-item-wrapper"><div class="moves">
        <img src="${editUrl}" alt="Редактировать" class="edit">
        <img src="${deleteUrl}" alt="Удалить" class="delete"></div>               
    </div>`;

    this._element = product;
    this.title = this._element.querySelector(".product-title");
    this.price = this._element.querySelector(".product-price");
    this.deleteBtn = this._element.querySelector(".delete");
    this.confirmController = new confirmFactory({
      confirmTitle: "Вы уверенны, что хотите удалить этот товар?",
      acceptBtn: "УДАЛИТЬ",
      cancelBtn: "ОТМЕНА",
    });

    this.deleteElement = this.deleteElement.bind(this);

    this.deleteBtn.addEventListener("click", this.deleteElement);
  }
  get element() {
    return this._element;
  }

  get values() {
    return { title: this.title.textContent, price: +this.price.textContent };
  }

  editElement(data) {
    this.title.textContent = data["item-title"];
    this.price.textContent = data["item-price"];
  }

  deleteElement() {
    const confirm = this.confirmController.showConfirmForm();

    //необходимо связать с наличием или отсутствие подтверждения
    this._element.remove();
  }
}
