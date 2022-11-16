import { Toolbar } from './index';

export class Panel extends HTMLElement {
  private _panel!: HTMLDivElement;

  private left = 20;
  private top = 300;

  private _minWidth = 200;
  public get minWidth() {
    return this._minWidth;
  }
  public set minWidth(value) {
    this._minWidth = value;
  }

  private _minHeight = 60;
  public get minHeight() {
    return this._minHeight;
  }
  public set minHeight(value) {
    this._minHeight = value;
  }
  
  private _width = 400;
  public get width() {
    return this._width;
  }
  public set width(value) {
    this._width = value;
  }

  private _height = 80;
  public get height() {
    return this._height;
  }
  public set height(value) {
    this._height = value;
  }

  private prevX = 0;
  private prevY = 0;

  private isAttached = true;
  private isDragging = false;
  private isResizing = false;

  private resizeGrip?: HTMLDivElement;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this._panel = document.createElement('div');

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);

    this.addResizeGrip = this.addResizeGrip.bind(this);
  }

  private setup() {
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
      div.toolbar {
        border-radius: 10px;
      }
      
      button.toolbar-button {
        background-color: #333;
        color: #eee;
        width: 48px;
        height: 48px;
        display: block;
      }

      .content-block {
        margin: 5px;
      }
      .content-block h2 {
        font-size: 1.3rem;
      }
    `;

    this.shadowRoot?.appendChild(styleSheet);

    this.style.display = 'grid';
    this.style.position = 'relative';
    this.style.overflow = 'hidden';

    // this._panel.style.display = 'flex';
    // this._panel.style.width = '100%';
    // this._panel.style.height = '100%';
    this._panel.style.backgroundColor = 'green';

    this._panel.setAttribute('part', 'panel');

    this._panel.addEventListener('resize', () => { console.log('ddd') });

    this.shadowRoot?.appendChild(this._panel);
  }

  private connectedCallback() {
    this.setup();
    this.addResizeGrip();
    this.attachEvents();
    
    this.setAttribute('exportparts', 'panel, toolbar, toolbar-block, button: toolbar-button');    
  }

  private disconnectedCallback() {
    this.detachEvents();
  }

  private attachEvents() {
    this.addEventListener('pointerdown', this.onPointerDown);
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
  }

  private detachEvents() {
    this.removeEventListener('pointerdown', this.onPointerDown);
  }

  private addResizeGrip() {
    this.resizeGrip = document.createElement('div');
    if (this.isAttached) {
      this.resizeGrip.style.display = 'none';
    } else {
      this.resizeGrip.style.display = 'flex';
    }
    this.resizeGrip.style.width = '24px';
    this.resizeGrip.style.height = '24px';
    this.resizeGrip.style.color = 'white';
    this.resizeGrip.style.position = 'absolute';
    this.resizeGrip.style.right = '0px';
    this.resizeGrip.style.bottom = '0px';
    this.resizeGrip.style.zIndex = '1000';
    this.resizeGrip.style.cursor = 'nwse-resize';

    this.resizeGrip.innerHTML = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22,22H20V20H22V22M22,18H20V16H22V18M18,22H16V20H18V22M18,18H16V16H18V18M14,22H12V20H14V22M22,14H20V12H22V14Z" />
    </svg>`;

    this.resizeGrip.addEventListener('pointerdown', this.onPointerDown);

    this._panel.appendChild(this.resizeGrip);
  }

  private onPointerDown(ev: PointerEvent) {
    if (!this.isAttached) {
      this.prevX = ev.clientX;
      this.prevY = ev.clientY;

      if (
        ev.target === this.resizeGrip ||
        this.resizeGrip?.contains(ev.target as HTMLElement)
      ) {
        this.isResizing = true;
        ev.cancelBubble = true;
      } else {
        this.isDragging = true;
        ev.cancelBubble = true;
      }

      ev.preventDefault();
    }
  }

  private onPointerMove(ev: PointerEvent) {
    if (this.isDragging || this.isResizing) {
      const deltaX = ev.clientX - this.prevX;
      const deltaY = ev.clientY - this.prevY;

      if (this.isDragging) {
        this.left += deltaX;
        this.top += deltaY;
      } else if (this.isResizing) {
        this._width = Math.max(this._width + deltaX, this._minWidth);
        this._height = Math.max(this._height + deltaY, this._minHeight);
      }

      this.prevX = ev.clientX;
      this.prevY = ev.clientY;

      this.positionPanel();

      ev.preventDefault();
      ev.cancelBubble = true;
    }
  }

  private onPointerUp(ev: PointerEvent) {
    if (!this.isAttached) {
      this.isDragging = false;
      this.isResizing = false;
      ev.preventDefault();
    }
  }

  private showResizeGrip() {
    if (this.resizeGrip) {
      this.resizeGrip.style.display = 'flex';
    }
  }
  private hideResizeGrip() {
    if (this.resizeGrip) {
      this.resizeGrip.style.display = 'none';
    }
  }

  public attach(): void {
    this.style.position = 'relative';
    this.style.left = '';
    this.style.top = '';
    this.style.width = '';
    this.style.height = '';

    this.hideResizeGrip();

    this.isAttached = true;
  }

  public detach(): void {
    this.style.position = 'absolute';
    this.isAttached = false;
    this.showResizeGrip();

    this.positionPanel();
  }

  private positionPanel() {
    this.style.top = `${this.top}px`;
    this.style.left = `${this.left}px`;
    this.style.width = `${this._width}px`;
    this.style.height = `${this._height}px`;

    // console.log(this.offsetHeight);
    // console.log(this._panel.offsetHeight);
  }

  public appendToolbar(toolbar: Toolbar): void {
    //toolbar.setAttribute('exportparts', 'toolbar, toolbar-block, button');
    this._panel.appendChild(toolbar);
  }

  public appendChild<T extends Node>(node: T): T {
    this._panel.appendChild(node);
    return node;
  }

  public clear() {
    this._panel.innerHTML = '';
  }
}
