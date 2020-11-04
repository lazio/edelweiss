import Router from './router/router';
import Config from './config';
import Component from './component/component';
import WebComponent from './component/web_component';

export * as i18n from './intl/i18n';
export { translate } from './intl/i18n';

export { html } from './template/template';
export { createState } from './state/state';
export { registerCss } from './css';
export { defineWebComponent } from './component/web_component';
export { Router, Config, Component, WebComponent };
