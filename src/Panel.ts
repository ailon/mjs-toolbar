import { Toolbar } from './index';

export class Panel extends HTMLElement {
  private _panel: HTMLDivElement;

  private left = 20;
  private top = 300;
  private prevX = 0;
  private prevY = 0;

  private isAttached = true;
  private isDragging = false;

  constructor() {
    super();

    this.attachShadow({mode: 'open'});

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
    `;

    this.shadowRoot?.appendChild(styleSheet);

    this._panel = document.createElement('div');
    this._panel.style.display = 'block';
    this._panel.style.width = '100%';
    this._panel.style.height = '100%';
    this._panel.style.backgroundColor = 'green';

    this._panel.setAttribute('part','panel');

    this.shadowRoot?.appendChild(this._panel);

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
  }

  private connectedCallback() {
    this.attachEvents();
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

  private onPointerDown(ev: PointerEvent) {
    if (!this.isAttached) {
      this.prevX = ev.clientX;
      this.prevY = ev.clientY;
      this.isDragging = true;

      ev.preventDefault();
    }
  }

  private onPointerMove(ev: PointerEvent) {
    if (this.isDragging) {
      this.left += ev.clientX - this.prevX;
      this.top += ev.clientY - this.prevY;
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
      ev.preventDefault();
    }
  }

  public attach(): void {
    this.style.position = '';
    this.isAttached = true;
  }

  public detach(): void {
    this.style.position = 'absolute';
    this.style.width = '400px';
    this.style.height = '80px';
    this.isAttached = false;

    this.positionPanel();
  }

  private positionPanel() {
    this.style.top = `${this.top}px`;
    this.style.left = `${this.left}px`;
  }

  public appendToolbar(toolbar: Toolbar): void {
    this._panel.appendChild(toolbar);
  }

}
