/**
 * @jest-environment jsdom
 */

import EditorWidget from "../editor-widget";
import Form from "../components/form";
import Product from "../components/product";
import PopupFactory from "../components/popup";
import TooltipFactory from "../components/tooltips";
import ConfirmFactory from "../components/confirm";

const properties = {
  parentName: "container",
  form: Form,
  product: Product,
  popupFactory: PopupFactory,
  tooltip: TooltipFactory,
  confirm: ConfirmFactory,
};

test("test for open and close form of EditorWidget, and add new Product, edit and deleted this product", () => {
  document.body.innerHTML = `<div class="wrapper">
    <div class="container">
        <div class="widget">
            <div class="widget-header">                    
            </div>
            <div class="widget-title-control">
                <h3 class="products-title">Товары</h3>
                <span class="product-add">+</span>
            </div>
            <div class="products-controller">
                <div class="products-list-header">
                    <span class="list-title">Название</span>
                    <span class="list-price">Стоимость</span>
                    <span class="list-move">Действия</span>
                </div>
                <ul class="products-list">                    
                </ul>
            </div>
        </div>
    </div>        
</div>`;

  const cardWidget = new EditorWidget(properties);
  const addBtn = document.querySelector(".product-add");
  addBtn.click();

  const addForm = document.querySelector(".form-widget");
  const inputTitle = addForm.querySelector(".title");
  const inputPrice = addForm.querySelector(".price");
  const acceptBtn = addForm.querySelector(".accept");

  inputTitle.value = "iPhone 12";
  inputPrice.value = "12 000";
  acceptBtn.click();

  const result = {};
  const title = document.querySelector(".product-title");
  const price = document.querySelector(".product-price");
  result.title = title.textContent;
  result.price = price.textContent;
  result.form = document.querySelector(".form-widget");

  const editBtn = document.querySelector(".edit");
  editBtn.click();

  inputTitle.value = "iPhone";
  inputPrice.value = "10 000";
  acceptBtn.click();

  result.newTitle = title.textContent;
  result.newPrice = price.textContent;

  const deleteBtn = document.querySelector(".delete");
  deleteBtn.click();

  const confirmBtn = document.querySelector(".confirm-accept-btn");
  confirmBtn.click();

  result.deleted = document.querySelector(".list-item");

  expect(result).toEqual({
    title: "iPhone 12",
    price: "12 000",
    form: null,
    newTitle: "iPhone",
    newPrice: "10 000",
    deleted: null,
  });
});
