// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, ContentBlock, Panel, Toolbar, ToolbarBlock } from '../../src/index';

export * from './../../src/index';

export class Experiments {
  // private panel: Panel;

  private toolbar?: Toolbar;

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

    this.toolbar = new Toolbar();
    this.toolbar.addEventListener('buttonclick', (ev) =>
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
    button12.id = 'button12';
    button12.style.display = 'none';
    block1.appendButton(button12);
    const button13 = new Button({ icon: checkSVG, command: 'cover' });
    block1.appendButton(button13);

    const button21 = new Button({ text: 'click me', command: 'text' });
    block2.appendButton(button21);
    const button22 = new Button({ icon: checkSVG });
    block2.appendButton(button22);

    this.toolbar.appendBlock(block1);
    this.toolbar.appendBlock(block2);
    this.toolbar.appendBlock(block3);

    panel.appendToolbar(this.toolbar);

    const toolboxPanel = <Panel>document.getElementById('toolboxPanel');

    const contentBlock1 = new ContentBlock();
    contentBlock1.title = 'Block #1';
    toolboxPanel.appendChild(contentBlock1);
    const content1 = document.createElement('p');
    content1.style.fontSize = '1rem';
    content1.innerText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A officiis non fuga amet esse vitae debitis autem adipisci consequatur saepe voluptatem officia ullam, maiores delectus ad eos reprehenderit facere sapiente!';
    contentBlock1.appendChild(content1);

    const contentBlock2 = new ContentBlock();
    contentBlock2.title = 'Block #2';
    toolboxPanel.appendChild(contentBlock2);
    const content2 = document.createElement('p');
    content2.innerText = 'Hello, World!';
    contentBlock2.appendChild(content2);
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

  public doSomething(): void {
    // console.log('do something');
    if (this.toolbar) {
      this.toolbar.hideButtonsByCommand('text');
      this.toolbar.showButtonsByCommand('for');
    }
  }
}
