import { Component, Element, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'chi-tab',
  styleUrl: 'tabs.scss',
  scoped: true
})
export class Tab {
  /**
   * used to store the name of the tab
   */
  @Prop({ reflect: true }) tabName: string;

  /**
   * used to store the link of the tab
   */
  @Prop({ mutable: true, reflect: true }) link = '#0';

  /**
   * used to set the active state of a tab
   */
  @Prop({ mutable: true, reflect: true }) active = false;

  /**
   * used to store the icon of a tab
   */
  @Prop({ reflect: true }) icon: string;

  /**
   * used to store the subtabs of a tab (if any)
   */
  @Prop({ reflect: true }) subtabsGroup: any[] = [];

  /**
   * current HTMLElement
   */
  @Element() el: HTMLElement;

  /**
   * parent of current tab
   */
  @State() parent: any;

  @Method()
  async addSubtab(tab) {
    this.subtabsGroup = [...this.subtabsGroup, tab];
  }

  @Method()
  async removeSubtab(tab) {
    if (this.subtabsGroup.includes(tab)) {
      this.subtabsGroup.splice(this.subtabsGroup.indexOf(tab), 1);
    }
  }

  connectedCallback() {
    if (this.el.parentElement.nodeName === 'CHI-TAB') {
      const innerParent: HTMLChiTabElement = this.el.parentElement as any;

      this.parent = innerParent;
      this.parent.addSubtab(this.el);
    } else if (this.el.parentElement.parentElement.nodeName === 'CHI-TABS') {
      const innerParent: HTMLChiTabsElement = this.el.parentElement
        .parentElement as any;

      this.parent = innerParent;
      this.parent.addTab(this.el);
    } else if (this.el.parentElement.nodeName === 'CHI-TABS') {
      const innerParent: HTMLChiTabsElement = this.el.parentElement as any;

      this.parent = innerParent;
      this.parent.addTab(this.el);
    } else {
      throw new Error(
        `This tab does not have a valid parent. It can only be a descendant of a chi-tabs element or of another chi-tab. `
      );
    }
  }

  disconnectedCallback() {
    if (this.parent.nodeName === 'CHI-TAB') {
      this.parent.removeSubtab(this.el);
    } else if (this.parent.nodeName === 'CHI-TABS') {
      this.parent.removeTab(this.el);
    } else {
      throw new Error(
        `This tab does not have a valid parent. It can only be a descendant of a chi-tabs element or of another chi-tab. `
      );
    }
  }

  render() {
    return;
  }
}
