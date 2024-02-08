// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "todomvc-app-css/index.css";
import "../../src/todo/app.css";

// Alternatively you can use CommonJS syntax:
// require('./commands')
import { mount } from "cypress/react18";
import { MemoryRouter as Router } from "react-router-dom";
// Example use:
// cy.mount(<MyComponent />)

Cypress.Commands.add("mount", (component, options = {}) => {
  const { routerProps = { initialEntries: ["/"] }, ...mountOptions } = options;

  return mount(<Router {...routerProps}>{component}</Router>, mountOptions);
});
