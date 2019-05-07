import { Component, Prop, Watch } from '@stencil/core';
import { VALID_TEXT_COLORS } from '../../models/color';
import { VALID_TEXT_SIZES } from '../../models/size';

@Component({
  tag: 'chi-spinner',
  styleUrl: 'spinner.scss',
  scoped: true
})
export class Spinner {
  /**
   *  to set size of a spinner { xs, sm, sm--2, sm--3, md, lg, xl, xxl }.
   */
  @Prop({ reflectToAttr: true }) size: string;

  /**
   *  to set color of a spinner { primary, success, warning, danger, muted }.
   */
  @Prop({ reflectToAttr: true }) color: string;

  @Watch('size')
  sizeValidation(newValue: string) {
    if (newValue && !VALID_TEXT_SIZES.includes(newValue)) {
      throw new Error(`Not valid size ${newValue} for spinner. Valid values are xs, sm, sm--2, sm--3, md, lg, xl, xxl or ''. `);
    }
  }

  @Watch('color')
  colorValidation(newValue: string) {
    if (newValue && !VALID_TEXT_COLORS.includes(newValue)) {
      throw new Error(`Not valid color ${newValue} for spinner. Valid values are primary, success, warning, danger, muted or ''. `);
    }
  }

  componentWillLoad(): void {
    this.colorValidation(this.color);
    this.sizeValidation(this.size);
  }

  render() {
    return (
      <svg class={`a-spinner
        ${this.color ? `-text--${this.color}` : ''}
        ${this.size ? `-${this.size}` : ''}`} viewBox='0 0 66 66'
      >
        <title>Loading</title>
        <circle class='path' cx='33' cy='33' r='30' fill='none' stroke-width='6' />
      </svg>
    );
  }
}
