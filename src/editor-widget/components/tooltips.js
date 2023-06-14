import './css/tooltips.css';

export default class TooltipFactory {
  constructor() {
    this.tooltips = [];
  }

  showTooltip(data) {
    const { message, element } = data;

    const tooltipText = document.createElement('p');
    tooltipText.textContent = message;
    tooltipText.classList.add('tooltip-text');

    const tooltipEl = document.createElement('div');
    tooltipEl.classList.add('tooltip');

    tooltipEl.append(tooltipText);

    document.body.append(tooltipEl);

    const { top, left } = element.getBoundingClientRect();

    tooltipEl.style.top = `${
      top - tooltipEl.offsetHeight / 2 + element.offsetHeight / 2
    }px`;
    tooltipEl.style.left = `${left + element.offsetWidth + 10}px`;

    this.tooltips.push(tooltipEl);
  }

  clearTooltips() {
    this.tooltips.forEach((el) => el.remove());
  }
}
