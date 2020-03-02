import Vue, { VueConstructor } from 'vue';

import HelloWorld from '../components/HelloWorld.vue';

declare class ComponentLibrary {
  components: Record<string, VueConstructor<Vue>>;
}

const exportComponent: ComponentLibrary = {
  components: {
    HelloWorld,
  },
};

Object.keys(exportComponent.components).forEach((name: string) => {
  Vue.component(name, exportComponent.components[name]);
});

export const library = exportComponent;
