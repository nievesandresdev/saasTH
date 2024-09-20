import { defineAsyncComponent } from 'vue';

export default app => {
    const requireComponent = require.context(
      '../components',
      true,
      /Base\w+\.(vue|js)$/
    );
  
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName);
      const componentName = fileName.split('/').pop().replace(/\.\w+$/, '');
      app.component(componentName, defineAsyncComponent(() => componentConfig.default || componentConfig));
    });
};