/// <reference types="cypress" />

import { mount } from "cypress/react18";

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to select DOM element by data-testid attribute.
       * @example cy.getTestId('greeting') // is equivalent to cy.get("[data-testid=greeting]")
       */
      getTestId(qaSelector: string, args?: any): Chainable<JQuery<HTMLElement>>;
      /** Mounts a React node
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      mount: typeof mount;
    }
    interface TypeOptions {
      /**
       * `.type()` method will not append _`enter`_ at the end, if value is true
       */
      unfinished: boolean;
    }
  }
}

export {};
