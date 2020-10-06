import I18n from './intl/i18n';
import Router from './router/router';
import Config from './config';
import Component from './component/component';

export const { translate } = I18n;
export { I18n, Router, Config, Component };
export { html } from './template/template';
export { createState } from './state/state';
export { registerCss } from './css';
export { defineWebComponent } from './component/web_component';
