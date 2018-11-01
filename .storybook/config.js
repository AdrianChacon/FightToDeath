import { configure, addDecorator } from '@storybook/react';
import { configureViewport, INITIAL_VIEWPORTS, withViewport } from '@storybook/addon-viewport'

configureViewport({
  viewports: INITIAL_VIEWPORTS,
  defaultViewport: 'iphone6'
})

const req = require.context('../src/ui', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withViewport('iphone6'))

configure(loadStories, module);
