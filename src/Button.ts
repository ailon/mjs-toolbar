export interface IButtonProperties {
  icon?: string | HTMLImageElement;
  text?: string;
  command?: string;
}

export interface ButtonEventMap {
  'buttonclick': CustomEvent<ButtonEventData>;
}

export interface ButtonEventData {
  button: Button;
}

export class Button extends HTMLElement {
  private _button: HTMLButtonElement;

  private icon?: string | HTMLImageElement;
  private text?: string;
  private _command?: string;
  public get command(): string | undefined {
    return this._command;
  }

  constructor(properties: IButtonProperties) {
    super();

    this.icon = properties.icon;
    this.text = properties.text;
    this._command = properties.command;

    this._button = document.createElement('button');
    this._button.className = 'toolbar-button';
    if (this.icon !== undefined) {
      if (this.icon instanceof HTMLImageElement) {
        this._button.appendChild(this.icon);
      } else {
        this._button.innerHTML = this.icon;
      }
      this._button.title = properties.text ?? '';
    } else if (this.text !== undefined) {
      this._button.textContent = this.text;
    }
    //this._button.textContent = `button-${Math.round(Math.random() * 1000)}`;

    this._button.style.display = 'flex';
    this._button.style.alignItems = 'center';

    this._button.setAttribute('part', 'button');

    this._button.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent<ButtonEventData>('buttonclick', {
          detail: { button: this },
        })
      );
    });

    this.appendChild(this._button);
  }

  addEventListener<T extends keyof ButtonEventMap>(
    // the event name, a key of ButtonCustomEventsMap
    type: T,

    // the listener, using a value of ButtonCustomEventsMap
    listener: (this: Button, ev: ButtonEventMap[T]) => void,

    // any options
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions | undefined): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void {
      super.addEventListener(type, listener, options);
  }
}
