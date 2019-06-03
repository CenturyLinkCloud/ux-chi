import { Component, Event, EventEmitter, Prop, Watch } from '@stencil/core';
import { ICON_SIZES } from '../../utils/size';

@Component({
  tag: 'chi-brand',
  styleUrl: 'brand.scss',
  scoped: true
})
export class Brand {
  /**
   *  to set the brand type { base, black, white, inverse }.
   */
  @Prop({ reflectToAttr: true }) type: string;

  /**
   *  to set the size of brand.
   */
  @Prop({ reflectToAttr: true }) size: string;

  /**
   *  to emit a custom event when brand is clicked.
   */
  @Event() chiClick: EventEmitter<any>;

  @Watch('type')
  typeValidation(newValue: string) {
    if (newValue && !['', 'inverse', 'white', 'black'].includes(newValue)) {
      throw new Error(`${newValue} is not a valid value for type. Valid values are '', 'inverse', 'white', 'black'`);
    }
  }

  @Watch('size')
  sizeValidation(newValue: string) {
    if (newValue && !ICON_SIZES.includes(newValue)) {
      throw new Error(`${newValue} is not a valid value for size. Valid values are ${ICON_SIZES.map(s => ` '${s}'`)}. `);
    }
  }

  componentWillLoad() {
    this.typeValidation(this.type);
    this.sizeValidation(this.size);
  }

  _onBrandClick() {
    this.chiClick.emit();
  }

  _imgSrc() {
    return `https://assets.ctl.io/images/centurylink-logo${this.type ? `-${this.type}` : ''}.svg`;
  }

  render() {
    return (
      <a class={`a-brand ${this.size ? `-${this.size}` : ''}`} href="#" aria-label="CenturyLink" onClick={() => this._onBrandClick()}>
        <img src={this._imgSrc()} alt="CenturyLink" />
      </a>
    );
  }
}
