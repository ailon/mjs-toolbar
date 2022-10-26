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

customElements.define('mjstb-panel', Panel);
customElements.define('mjstb-toolbar', Toolbar);
customElements.define('mjstb-toolbar-block', ToolbarBlock);
customElements.define('mjstb-button', Button);
customElements.define('mjstb-content-block', ContentBlock);
