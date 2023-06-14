export default class EditorWidget {
  constructor(properties) {
    const { parentName, form, popupFactory, tooltip, product, confirm } =
      properties;

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
