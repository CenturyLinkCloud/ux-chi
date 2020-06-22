import { Component, Element, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';
import { CHI_STATES, ChiStates } from '../../constants/states';
import { ICON_COLORS, IconColors } from '../../constants/color';
import { TEXT_INPUT_SIZES, TextInputSizes } from '../../constants/size';
import { TEXT_INPUT_TYPES, TextInputTypes } from '../../constants/constants';

@Component({
  tag: 'chi-text-input',
  styleUrl: 'text-input.scss',
  scoped: true
})

export class TextInput {
  @Element() el: HTMLChiTextInputElement;
  /**
   * To define type of Text input
   */
  @Prop() type: TextInputTypes = 'text';
  /**
   * To define state color of Text input
   */
  @Prop({ reflect: true }) state: ChiStates;
  /**
   * To add a left positioned icon
   */
  @Prop({ reflect: true }) iconLeft: string;
  /**
   * To add a right positioned icon
   */
  @Prop({ reflect: true }) iconRight: string;
  /**
   * To define color of left icon
   */
  @Prop({ reflect: true }) iconLeftColor: IconColors;
  /**
   * To define color of right icon
   */
  @Prop({ reflect: true }) iconRightColor: IconColors;
  /**
   * To define size of Text input
   */
  @Prop({ reflect: true }) size ?: TextInputSizes = 'md';
  /**
   * To define placeholder of Text input
   */
  @Prop({ reflect: true }) placeholder: string;
  /**
   * To define value of Text input
   */
  @Prop({ mutable: true, reflect: true }) value = '';
  /**
   * To define name of Text input
   */
  @Prop({ reflect: true }) name: string;
  /**
   * To disable Text input
   */
  @Prop({ reflect: true }) disabled = false;
  /**
   * To disable Value attribute mutation
   */
  @Prop({ reflect: true }) preventValueMutation = false;
  /**
   * To define -hover, -focus statuses
   */
  @Prop() _status: string;
  /**
   * Triggered when an alteration to the element's value is committed by the user
   */
  @Event({ eventName: 'chiChange' }) eventChange: EventEmitter<string>;
  /**
   * Triggered when the user changed the element's value but did not commit the change yet
   */
  @Event({ eventName: 'chiInput' }) eventInput: EventEmitter<string>;
  /**
   * Triggered when the user sets focus on the element.
   */
  @Event({ eventName: 'chiFocus' }) eventFocus: EventEmitter;
  /**
   * Triggered when the element has lost focus.
   */
  @Event({ eventName: 'chiBlur' }) eventBlur: EventEmitter;

  statusMessage = false;
  statusMessageColor;

  @Watch('state')
  stateValidation(newValue: ChiStates) {
    const validValues = CHI_STATES.join(', ');

    if (newValue && !CHI_STATES.includes(newValue)) {
      throw new Error(`${newValue} is not a valid state for input. If provided, valid values are: ${validValues}. `);
    }
  }

  @Watch('size')
  sizeValidation(newValue: TextInputSizes) {
    const validValues = TEXT_INPUT_SIZES.join(', ');

    if (newValue && !TEXT_INPUT_SIZES.includes(newValue)) {
      throw new Error(`${newValue} is not a valid size for input. If provided, valid values are: ${validValues}. `);
    }
  }

  colorValidation(newValue: IconColors) {
    const validValues = ICON_COLORS.join(', ');

    if (newValue && !ICON_COLORS.includes(newValue)) {
      throw new Error(`${newValue} is not a valid color for icon. If provided, valid values are: ${validValues}. `);
    }
  }

  @Watch('iconLeftColor')
  iconLeftColorValidation(newValue: IconColors) {
    this.colorValidation(newValue);
  }

  @Watch('iconRightColor')
  iconRightColorValidation(newValue: IconColors) {
    this.colorValidation(newValue);
  }

  @Watch('type')
  typeValidation(newValue: TextInputTypes) {
    const validValues = TEXT_INPUT_TYPES.join(', ');

    if (newValue && !TEXT_INPUT_TYPES.includes(newValue)) {
      throw new Error(`${newValue} is not a valid type for input. If provided, valid values are: ${validValues}. `);
    }
  }

  _handleValueInput(valueChange: Event) {
    const newValue = (valueChange.target as HTMLInputElement).value;

    if (!this.preventValueMutation) {
      this.value = newValue;
    }
    this.eventInput.emit(newValue);
  }

  _handleValueChange(valueChange: Event) {
    const newValue = (valueChange.target as HTMLInputElement).value;

    this.eventChange.emit(newValue);
  }

  connectedCallback() {
    const statusMessageSlot = this.el.querySelector("[slot=chi-form__helper-message]");

    if (statusMessageSlot) {
      const statusMessageSlotColor = statusMessageSlot.getAttribute('color');

      this.statusMessage = true;
      this.statusMessageColor = statusMessageSlotColor ? `-${statusMessageSlotColor}` : '';
    }
  }

  componentWillLoad() {
    this.stateValidation(this.state);
    this.iconLeftColorValidation(this.iconLeftColor);
    this.iconRightColorValidation(this.iconRightColor);
    this.sizeValidation(this.size);
    this.typeValidation(this.type);
  }

  render() {
    const inputElement = <input
      type={this.type}
      class={
        `chi-input
        ${this.state ? `-${this.state}` : ''}
        ${this.size ? `-${this.size}` : ''}
        ${this._status ? `-${this._status}` : ''}
        `}
      placeholder={this.placeholder || ''}
      value={this.value}
      name={this.name || ''}
      disabled={this.disabled}
      id={this.el.id ? `${this.el.id}-control` : null}
      onFocus={() => this.eventFocus.emit()}
      onBlur={() => this.eventBlur.emit()}
      onInput={(ev) => this._handleValueInput(ev)}
      onChange={(ev) => this._handleValueChange(ev)}
    />;
    const iconClasses = `
      ${this.iconLeft ? '-icon--left' : ''}
      ${this.iconRight ? '-icon--right' : ''}
    `;
    const iconLeft = this.iconLeft && <chi-icon color={this.iconLeftColor || ''} icon={this.iconLeft} />;
    const iconRight = this.iconRight && <chi-icon
      color={this.iconRightColor ? this.iconRightColor :
        this.state ? this.state : ''}
      icon={this.iconRight} />;
    const textInputstatusMessage = this.statusMessage ? <div class={`
      chi-form__helper-message
      ${this.statusMessageColor}
      `}><slot name="chi-form__helper-message"></slot></div> : null;

    const input = this.iconLeft || this.iconRight ?
      <div class={`chi-input__wrapper ${iconClasses}`}>
        {inputElement}
        {iconLeft}
        {iconRight}
      </div> : inputElement;

    return <div>
      {input}
      {textInputstatusMessage}
    </div>;
  }
}
