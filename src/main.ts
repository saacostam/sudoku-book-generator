import './style.css';

import { buildConfigDivElement, buildControlDivElement } from './ui';

const ui = document.querySelector<HTMLDivElement>('div#ui');
if (!ui) throw new Error('UI div is null!');

const control = document.querySelector<HTMLDivElement>('div#control');
if (!control) throw new Error('Control div is null!');

const app = document.querySelector<HTMLDivElement>('div#app');
if (!app) throw new Error('App div is null!');

const [configDivElement, getConfig] = buildConfigDivElement();
ui.append(configDivElement);

const controlDivElement = buildControlDivElement(app, getConfig);
control.append(controlDivElement);
