import Block from '../../utils/block';
import controlsButtonTemplate from './controls-button.tmpl';

class ControlsButton extends Block {
  constructor(props: object) {
    super(undefined, props);
  }

  render(): string {
    return controlsButtonTemplate;
  }
}

export default ControlsButton;
