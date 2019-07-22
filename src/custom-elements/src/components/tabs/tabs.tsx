import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop,
  State,
  Watch,
  h
} from '@stencil/core';

import { Tab } from './tab';

const TAB_SIZES = ['sm', 'md', 'lg'];

@Component({
  tag: 'chi-tabs',
  styleUrl: 'tabs.scss',
  scoped: true
})
export class Tabs {
  /**
   * used to set an icon next to the tab name
   */
  @Prop({ reflect: true }) icons: boolean;

  /**
   * used to distribute tabs vertically
   */
  @Prop({ reflect: true }) vertical: boolean;

  /**
   * used to render a border under tabs
   */
  @Prop({ reflect: true }) bordered: boolean;

  /**
   * used to set tabs size in terms of the space a tab occupies
   */
  @Prop({ reflect: true }) size = 'md';

  /**
   * current HTMLElement
   */
  @Element() element: HTMLElement;

  /**
   * used to gather a set of tabs
   */
  @State() tabsGroup: any[] = [];

  @Event() chiChange: EventEmitter<Tab>;

  @Watch('size')
  sizeValidation(newValue: string) {
    if (newValue && !TAB_SIZES.includes(newValue)) {
      throw new Error(
        `${newValue} is not a valid size for this component. If provided, valid values are 'sm' or 'lg'; if not, 'md' value will be set. `
      );
    }
  }

  @Method()
  async addTab(tab) {
    this.tabsGroup = [...this.tabsGroup, tab];
  }

  @Method()
  async removeTab(tab) {
    if (this.tabsGroup.includes(tab)) {
      this.tabsGroup.splice(this.tabsGroup.indexOf(tab), 1);
    }
  }

  componentWillLoad() {
    this.sizeValidation(this.size);
  }

  renderTabs = (tabsGroup, subtabs = false) => {
    return [
      <ul
        class={`${subtabs ? 'a-tabs__subtabs' : 'a-tabs'} ${
          this.vertical ? '-vertical' : ''
        } ${this.icons ? '-icons' : ''} ${this.bordered ? '-border' : ''} ${
          this.size === 'sm' ? `-sm` : ''
        } ${this.size === 'lg' ? `-lg` : ''}`}
      >
        {tabsGroup
          .sort((tab1, tab2) => {
            const nodes = Array.prototype.slice.call(
              tab1.parentElement.children
            );
            return nodes.indexOf(tab1) - nodes.indexOf(tab2);
          })
          .map(tab => [
            <li class={`${tab.active ? '-active' : ''}`}>
              <a
                href={tab.link}
                onClick={event => {
                  if (!tab.active) {
                    const parent = (event.target as HTMLElement).parentElement;
                    const activeItems = Array.from(
                      this.element.getElementsByClassName('-active')
                    );
                    const activePropItems = Array.from(
                      this.element.querySelectorAll('[active]')
                    );

                    activeItems.map(activeItem => {
                      activeItem.classList.remove(
                        '-active',
                        '-active-children'
                      );
                    });

                    activePropItems.map(activePropItem => {
                      activePropItem.removeAttribute('active');
                    });

                    parent.classList.add('-active');
                    if (subtabs) {
                      parent.parentElement.parentElement.classList.add(
                        '-active',
                        '-active-children'
                      );
                    }
                    tab.active = true;

                    this.chiChange.emit(tab);
                  }
                }}
              >
                {tab.icon ? <chi-icon class="a-icon" icon={tab.icon} /> : ''}
                {tab.tabName}
              </a>
              {tab.subtabsGroup && tab.subtabsGroup.length > 0
                ? this.renderTabs(tab.subtabsGroup, true)
                : ''}
            </li>
          ])}
      </ul>,
      subtabs ? (
        ''
      ) : (
        <div class="-text">
          <slot />
        </div>
      )
    ];
  }

  render() {
    return this.renderTabs(this.tabsGroup);
  }
}
