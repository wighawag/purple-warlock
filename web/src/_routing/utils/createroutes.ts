import {prepareRoutes, createRouter, RouterOptions} from '@curi/router';
import {browser, createBase} from '@hickory/browser';

import routes from '../../pages';

const routesConfig = [];
for (const routePath of routes) {
  routesConfig.push({
    name: routePath.name,
    path: !routePath.path || routePath.path == '/' ? '' : routePath.path + '/',
    respond() {
      return {
        body: routePath.component,
      };
    },
  });
}

const options: RouterOptions = {};

if (typeof window.basepath !== 'undefined' && window.basepath !== '') {
  let base = window.basepath;
  if (base.endsWith('/')) {
    base = base.slice(0, base.length - 1);
  }
  if (base !== '') {
    options.history = {base: createBase(base)};
  }
}

export const router = createRouter(browser, prepareRoutes(routesConfig), options);
