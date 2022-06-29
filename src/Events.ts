import { Button } from './Button';

export class ButtonEvent {
  public button: Button;
  public cancelable = false;

  private _defaultPrevented = false;
  public get defaultPrevented(): boolean {
    return this._defaultPrevented;
  }

  public preventDefault(): void {
    this._defaultPrevented = true;
  }

  constructor(button: Button, cancelable = false) {
    this.button = button;
    this.cancelable = cancelable;
  }
}

/**
 * Button event handler type.
 */
export type ButtonEventHandler = (event: ButtonEvent) => void;

/**
 * Describes a repository of event handlers.
 */
export interface IEventListenerRepository {
  /**
   * Event handlers for the `buttonclick` event.
   */
  buttonclick: ButtonEventHandler[];
}

/**
 * Event handler type for a specific event type.
 */
export type EventHandler<
  T extends keyof IEventListenerRepository
> = T extends 'buttonclick'
  ? ButtonEventHandler
  : ButtonEventHandler;

/**
 * Event handler repository.
 */
export class EventListenerRepository implements IEventListenerRepository {
  /**
   * Event handlers for the `buttonclick` event.
   */
  buttonclick: ButtonEventHandler[] = [];

  /**
   * Add an event handler for a specific event type.
   * @param eventType - event type.
   * @param handler - function to handle the event.
   */
  public addEventListener<T extends keyof IEventListenerRepository>(
    eventType: T,
    handler: EventHandler<T>
  ): void {
    (<Array<EventHandler<T>>>this[eventType]).push(handler);
  }

  /**
   * Remove an event handler for a specific event type.
   * @param eventType - event type.
   * @param handler - function currently handling the event.
   */
  public removeEventListener<T extends keyof IEventListenerRepository>(
    eventType: T,
    handler: EventHandler<T>
  ): void {
    const index = (<Array<EventHandler<T>>>this[eventType]).indexOf(handler);
    if (index > -1) {
      (<Array<EventHandler<T>>>this[eventType]).splice(index, 1);
    }
  }
}
