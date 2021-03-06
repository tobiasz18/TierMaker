import { DrawingCanvasUI } from './DrawingCanvas2Html';
import { fetchImages } from './fetch.images';
import { ImagesUI } from './ImagesUI';
import ToggleClass from './ToggleClass';

export class ClickableElements {
  constructor(version) {
    this.version = version;
    this.URL = `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;
    this.canvasToHtmlClass = new DrawingCanvasUI(
      '.tier-container',
      '.screenshot-wrapper',
    );
    this.toggleClass = new ToggleClass('.overlay', '.screenshot-wrapper');
    this.championsContainer = document.querySelector(
      '.tier-champions-container',
    );
    this.canvasElem = document.getElementsByTagName('canvas');
    this.setCategory(null);
  }

  drawCanvasToHtml() {
    this.toggleClass.show();
    this.toggleClass.showChild();
    this.canvasToHtmlClass.drawCanvas();
  }

  hideWrapper() {
    this.toggleClass.hide();
    this.toggleClass.hideChild();
  }

  hideScreenshotWrapperContainer() {
    this.toggleClass.hide();
    this.toggleClass.hideChild();
  }

  // eslint-disable-next-line class-methods-use-this
  screenshotWrapper(event) {
    event.stopPropagation();
  }

  download() {
    const link = document.createElement('a');
    link.download = 'filename.png';
    link.href = this.canvasElem[0].toDataURL();
    link.click();
  }

  async setCategory(event) {
    let categoryName;
    if (event) {
      const { value } = event.target;
      categoryName = value;
    } else {
      categoryName = 'All';
    }
    this.championsContainer.innerHTML = '';
    const fetchedData = await fetchImages(this.URL);
    const getImages = new ImagesUI('.tier-champions-container', fetchedData, this.version);
    getImages.createImagesByCategory(categoryName);
  }

  changeTool(selector, event) {
    switch (selector) {
      case '.btn-show':
        return this.drawCanvasToHtml();
      case '.btn-close':
        return this.hideWrapper();
      case '.btn-download':
        return this.download();
      case '.overlay':
        return this.hideScreenshotWrapperContainer();
      case '.screenshot-wrapper':
        return this.screenshotWrapper(event);
      case '#category':
        return this.setCategory(event);

      default:
        return '';
    }
  }
}
