import { Panel } from './Panel';
import { Toolbar } from './Toolbar';
import { ToolbarBlock } from './ToolbarBlock';
import { Button } from './Button';
import { ContentBlock } from './ContentBlock';

export { Panel } from './Panel';
export { Toolbar } from './Toolbar';
export { ToolbarBlock } from './ToolbarBlock';
export { Button, IButtonProperties, ButtonEventData } from './Button';
export { ContentBlock } from './ContentBlock';

if (
  window &&
  window.customElements &&
  window.customElements.get('mjstb-panel') === undefined
) {
  window.customElements.define('mjstb-panel', Panel);
  window.customElements.define('mjstb-toolbar', Toolbar);
  window.customElements.define('mjstb-toolbar-block', ToolbarBlock);
  window.customElements.define('mjstb-button', Button);
  window.customElements.define('mjstb-content-block', ContentBlock);
}
