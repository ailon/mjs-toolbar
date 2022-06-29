// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Panel, Toolbar, ToolbarBlock } from '../../src/index';

export * from './../../src/index';

export class Experiments {
  // private panel: Panel;

  // constructor() {
  // }

  public defineElements(): void {
    // customElements.define('mjstb-panel', Panel);
    // customElements.define('mjstb-toolbar', Toolbar);
    // customElements.define('mjstb-toolbar-block', ToolbarBlock);
    // customElements.define('mjstb-button', Button);
  }

  public setup(): void {
    const panel = <Panel>document.getElementById('tbPanel');

    const toolbar = new Toolbar();
    toolbar.addEventListener('buttonclick', (ev) =>
      console.log(`'${ev.detail.button.command}' button clicked.`)
    );

    const block1 = new ToolbarBlock();
    const block2 = new ToolbarBlock();
    const block3 = new ToolbarBlock();

    const checkSVG = `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
    </svg>`;

    const button11 = new Button({ icon: checkSVG, command: 'run' });
    block1.appendButton(button11);
    const button12 = new Button({ icon: checkSVG, command: 'for' });
    block1.appendButton(button12);
    const button13 = new Button({ icon: checkSVG, command: 'cover' });
    block1.appendButton(button13);

    const button21 = new Button({ text: 'click me', command: 'text' });
    block2.appendButton(button21);
    const button22 = new Button({ icon: checkSVG });
    block2.appendButton(button22);

    toolbar.appendBlock(block1);
    toolbar.appendBlock(block2);
    toolbar.appendBlock(block3);

    panel.appendToolbar(toolbar);
  }

  public detachPanel(): void {
    const panel = <Panel>document.getElementById('tbPanel');
    if (panel) {
      panel.detach();
    }
  }
  public attachPanel(): void {
    const panel = <Panel>document.getElementById('tbPanel');
    if (panel) {
      panel.attach();
    }
  }
}
