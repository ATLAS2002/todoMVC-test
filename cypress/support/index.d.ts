/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-testid attribute.
       * @example cy.getTestId('greeting')
       */
      getTestId(selector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
