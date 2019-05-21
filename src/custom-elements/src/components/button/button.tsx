import { Component, Event, EventEmitter, Prop, Watch } from '@stencil/core'

@Component({
  tag: 'chi-button',
  styleUrl: 'button.scss',
  scoped: true
})
export class Button {
  /**
   *  to set button type { float, close, icon }.
   */
  @Prop({ reflectToAttr: true }) type: string;

  /**
   *  to set button color { primary, secondary, danger, dark }.
   */
  @Prop({ reflectToAttr: true }) color: string;

  /**
   *  to set button size { sm, md, lg, xl }.
   */
  @Prop({ reflectToAttr: true }) size = 'md';

  /**
   *  to to render buttons with a more pronounced border-radius.
   */
  @Prop({ reflectToAttr: true }) pill = false;

  /**
   *  to remove a buttons solid background and keep its colored border.
   */
  @Prop({ reflectToAttr: true }) outline = false;

  /**
   *  to render a button with a transparent background and border.
   */
  @Prop({ reflectToAttr: true }) flat = false;

  /**
   *  to render a button to fill the parent space.
   */
  @Prop({ reflectToAttr: true }) fluid = false;

  /**
   *  to center align the text .
   */
  @Prop({ reflectToAttr: true }) center = false;

  /**
   *  to emit a custom event when button is clicked.
   */
  @Event() chiClick: EventEmitter<any>;

  @Watch('size')
  sizeValidation(newValue: string) {
    if (newValue && !['', 'sm', 'md', 'lg', 'xl'].includes(newValue)) {
      throw new Error(`${newValue} is not a valid size for button. Valid values are sm, md, lg, xl, ''. `);
    }
  }

  @Watch('color')
  colorValidation(newValue: string) {
    if (newValue && !['', 'primary', 'secondary', 'danger', 'dark', 'light'].includes(newValue)) {
      throw new Error(`${newValue} is not a valid color for button. Valid values are primary, success, danger, dark or ''. `);
    }
  }

  @Watch('type')
  buttonTypeValidation(newValue: string) {
    if (newValue && !['', 'float', 'close', 'icon'].includes(newValue)) {
      throw new Error(`${newValue} is not a valid button type. Valid values are '', 'float', 'close' or 'icon'. `);
    }
  }

  componentWillLoad(): void {
    this.colorValidation(this.color);
    this.sizeValidation(this.size);
    this.buttonTypeValidation(this.type);
  }

  _buttonClicked() {
    this.chiClick.emit();
  }

  render() {
    if (this.type === 'close') {
      return (
        <button class="a-btn -icon -close" onClick={() => this._buttonClicked()}>
          <div class="a-btn__content">
            <chi-icon icon={'x'}/>
          </div>
        </button>
      );
    } else {
      return (
        <button
          class={`a-btn
          ${this.outline ? '-outline' : ''}
          ${this.flat ? '-flat' : ''}
          ${this.pill ? '-pill' : ''}
          ${this.color ? `-${this.color}` : ''}
          ${this.type ? `-${this.type}` : ''}
          ${this.size ? `-${this.size}` : ''}
          ${this.fluid ? '-fluid' : ''}
          ${this.fluid && this.center ? '-justify-content--center' : ''}`}
          onClick={() => this._buttonClicked()}
        >
          <slot />
        </button>
      );
    }
  }
}
