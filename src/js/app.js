import EditorWidget from '../editor-widget/editor-widget';
import Form from '../editor-widget/components/form';
import Product from '../editor-widget/components/product';
import PopupFactory from '../editor-widget/components/popup';
import TooltipFactory from '../editor-widget/components/tooltips';
import ConfirmFactory from '../editor-widget/components/confirm';

const properties = {
  parentName: 'container',
  form: Form,
  product: Product,
  popupFactory: PopupFactory,
  tooltip: TooltipFactory,
  confirm: ConfirmFactory,
};

const editorWidget = new EditorWidget(properties);
