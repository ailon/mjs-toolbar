import { ButtonEventData } from './Button';
import { ToolbarBlock } from './ToolbarBlock';

export interface ToolbarEventMap {
  'buttonclick': CustomEvent<ButtonEventData>;
}

export class Toolbar extends HTMLElement {
  private _container: HTMLDivElement;

  constructor() {
    super();

    this._container = document.createElement('div');
    this._container.className = 'toolbar';
    this._container.style.width = '100%';
    this._container.style.height = '100%';
    this._container.style.display = 'flex';
    this._container.style.backgroundColor = 'yellow';

    this._container.setAttribute('part','toolbar');

    this.appendChild(this._container);
  }

  public appendBlock(block: ToolbarBlock): void {
    this._container.appendChild(block);
    block.addEventListener('buttonclick', (ev) => {
      console.log('toolbar', ev.detail.button.command);
      this.dispatchEvent(
        new CustomEvent<ButtonEventData>('buttonclick', {
          detail: { button: ev.detail.button },
        })
      );
    });

  }

  addEventListener<T extends keyof ToolbarEventMap>(
    type: T,
    listener: (this: Toolbar, ev: ToolbarEventMap[T]) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions | undefined): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void {
      super.addEventListener(type, listener, options);
  }

}
