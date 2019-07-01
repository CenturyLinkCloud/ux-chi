import { Component, Element, Method, Prop } from '@stencil/core';

@Component({
  tag: 'chi-tab',
  styleUrl: 'tabs.scss',
  scoped: true
})
export class Tab {
  /**
   * used to store the name of the tab
   */
  @Prop({ reflectToAttr: true }) tabName: string;

  /**
   * used to store the link of the tab
   */
  @Prop({ mutable: true, reflectToAttr: true }) link = '#0';

  /**
   * used to set the active state of a tab
   */
  @Prop({ mutable: true, reflectToAttr: true }) active = false;

  /**
   * used to store the icon of a tab
   */
  @Prop({ reflectToAttr: true }) icon: string;

  /**
   * used to store the subtabs of a tab (if any)
   */
  @Prop({ reflectToAttr: true }) subtabsGroup: any[] = [];

  /**
   * current HTMLElement
   */
  @Element() el: HTMLElement;

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
      const parent: HTMLChiTabElement = this.el.parentElement as any;

      parent.addSubtab(this.el);
    } else if (this.el.parentElement.parentElement.nodeName === 'CHI-TABS') {
      const parent: HTMLChiTabsElement = this.el.parentElement
        .parentElement as any;

      parent.addTab(this.el);
    } else {
      throw new Error(
        `This tab does not have a valid parent. It can only be a descendant of a chi-tabs element or of another chi-tab. `
      );
    }
  }

  disconnectedCallback() {
    if (this.el.parentElement.nodeName === 'CHI-TAB') {
      const parent: HTMLChiTabElement = this.el.parentElement as any;

      parent.removeSubtab(this.el);
    } else if (this.el.parentElement.parentElement.nodeName === 'CHI-TABS') {
      const parent: HTMLChiTabsElement = this.el.parentElement
        .parentElement as any;

      parent.removeTab(this.el);
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
