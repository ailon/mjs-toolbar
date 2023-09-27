import { Button, ButtonEventData } from './Button';

export interface ToolbarBlockEventMap {
  'buttonclick': CustomEvent<ButtonEventData>;
}

export class ToolbarBlock extends HTMLElement {
  private _container: HTMLDivElement;
  private _buttons: Button[] = [];

  constructor() {
    super();

    this._container = document.createElement('div');
    this._container.className = 'toolbar-block';
    this._container.style.display = 'flex';
    //this._container.style.backgroundColor = '#88ff88';

    this._container.setAttribute('part','toolbar-block');

    this.appendChild(this._container);
  }

  public appendButton(button: Button): void {
    //button.setAttribute('exportparts', 'button');
    this._buttons.push(button);
    this._container.appendChild(button);

    button.addEventListener('buttonclick', (ev) => {
      // console.log(ev.detail.button.command);
      this.dispatchEvent(
        new CustomEvent<ButtonEventData>('buttonclick', {
          detail: { button: ev.detail.button },
        })
      );
    });
  }

  public getButtonsByCommand(command: string): Button[] {
    return this._buttons.filter(btn => btn.command === command);
  }

  addEventListener<T extends keyof ToolbarBlockEventMap>(
    type: T,
    listener: (this: ToolbarBlock, ev: ToolbarBlockEventMap[T]) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions | undefined): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void {
      super.addEventListener(type, listener, options);
  }

}
