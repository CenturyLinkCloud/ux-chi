import { Component, Element, Prop, State, Watch } from '@stencil/core';

const BADGE_COLOR = ['', 'primary', 'success', 'warning', 'danger', 'dark', 'muted', 'secondary', 'light'];

@Component({
  tag: 'chi-badge',
  styleUrl: 'badge.scss',
  scoped: true
})
export class Badge {
  @Element() el: HTMLElement;
  @State() slotBdgContent = true;
  /**
   *  to render a flat badge.
   */
  @Prop({ reflectToAttr: true }) flat: boolean;

  /**
   *  to render a badge with a more pronounced border-radius.
   */
  @Prop({ reflectToAttr: true }) pill: boolean;

  /**
   *  to set color of a badge.
   */
  @Prop({ reflectToAttr: true }) color: string;

  /**
   *  to transform the badge text { uppercase, lowercase, capitalized }.
   */
  @Prop({ reflectToAttr: true }) textTransform: string;

  /**
   *  to set outline on a badge.
   */
  @Prop({ reflectToAttr: true }) outline: boolean;

  /**
   *  to set size of a badge { small, smaller }.
   */
  @Prop({ reflectToAttr: true }) size: string;

  @Watch('color')
  colorValidation(newValue: string) {
    if (newValue && !BADGE_COLOR.includes(newValue)) {
      throw new Error(`${newValue} is not a valid badge color. Valid values are ${BADGE_COLOR.map(c => ` '${c}'`)}. `);
    }
  }

  @Watch('size')
  sizeValidation(newValue: string) {
    if (newValue && !['', 'small', 'smaller'].includes(newValue)) {
      throw new Error(`${newValue} is not a valid size for badge. Valid values are 'small', 'smaller' or ''. `);
    }
  }

  componentWillLoad() {
    this.colorValidation(this.color);
    this.sizeValidation(this.size);
  }

  componentDidLoad() {
    if (!this.el.children[0].innerHTML.includes('<chi-icon')) {
      this.slotBdgContent = false;
    }
  }

  render() {
    return (
      <div class={`a-badge
        ${this.pill ? '-pill' : ''}
        ${this.outline ? '-outline' : ''}
        ${this.flat ? '-flat' : ''}
        ${this.size ? `-${this.size}` : ''}
        ${this.color ? `-${this.color}` : ''}
        ${this.textTransform ? `-text--${this.textTransform}` : ''}`}
        >
        {this.slotBdgContent ?
          <div class={'a-badge__content'}>
            <slot />
          </div>
          : <span>
             <slot />
          </span>
        }
      </div>
    );
  }
}
