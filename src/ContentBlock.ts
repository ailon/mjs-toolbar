export class ContentBlock extends HTMLElement {
  private _container: HTMLDivElement;
  private _titleElement: HTMLHeadingElement;
  private _contentArea: HTMLDivElement;
  public get title() {
    return this.getAttribute('title') ?? '';
  }
  public set title(value) {
    this.setAttribute('title', value);
    this._titleElement.innerText = value;
  }

  constructor() {
    super();

    this._container = document.createElement('div');
    this._container.className = 'content-block';
    // this._container.style.width = '100%';
    // this._container.style.height = '100%';
    this._container.style.display = 'flex';
    this._container.style.flexDirection = 'column';
    // this._container.style.backgroundColor = 'magenta';

    this._container.setAttribute('part','content-block');

    super.appendChild(this._container);

    this._titleElement = document.createElement('h2');
    this._titleElement.innerText = this.title;
    this._container.appendChild(this._titleElement);

    this._contentArea = document.createElement('div');
    this._container.appendChild(this._contentArea);

  }

  public appendChild<T extends Node>(node: T): T {
    return this._contentArea.appendChild(node);
  }
}
