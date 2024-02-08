/// <reference types="cypress" />
/// <reference types="../../../../cypress/support" />

import { Footer } from "../footer";
import { mutateTodos } from "../../../../cypress/support/utils";

import { REMOVE_COMPLETED_ITEMS } from "../../constants";

describe("Component: Footer", () => {
  beforeEach(() => {
    const mount = (indexes = [], dispatch = () => {}) =>
      mutateTodos(
        indexes,
        (todo) => ({
          title: todo.title,
          completed: true,
        }),
        (todos) => {
          cy.mount(<Footer todos={todos} dispatch={dispatch} />);
        }
      );

    cy.wrap(mount).as("mount");
  });

  it("should not render footer", () => {
    cy.mount(<Footer todos={[]} dispatch={() => {}} />);

    cy.getTestId("footer").should("not.exist");
  });

  it("should render footer", () => {
    cy.get("@mount").then((mount) => mount());

    cy.getTestId("footer")
      .should("exist")
      .should("be.visible")
      .children()
      .should("have.length", 3);
  });

  context("Child Component: Todo Counter", () => {
    it("should show 1 item left", () => {
      cy.get("@mount").then((mount) => mount([1, 2, 3]));
      cy.get(".todo-count").contains("1 item left!");
    });

    it("should show 0 or 1+ items left", () => {
      cy.get("@mount").then((mount) => mount([0, 1, 2, 3]));
      cy.get(".todo-count").contains("0 items left!");

      cy.get("@mount").then((mount) => mount());
      cy.get(".todo-count").contains("4 items left!");
    });
  });

  context("Child Component: Navigation Buttons", () => {
    it("`All` button should redirect to /#", () => {
      cy.get("@mount").then((mount) => mount());

      cy.getTestId("footer-navigation")
        .children()
        .first()
        .children()
        .should("have.attr", "href", "#/")
        .should("be.visible")
        .should("not.be.disabled");
    });

    it("`Active` button should redirect to /#/active", () => {
      cy.get("@mount").then((mount) => mount());

      cy.getTestId("footer-navigation")
        .children()
        .eq(1)
        .children()
        .should("have.attr", "href", "#/active")
        .should("be.visible")
        .should("not.be.disabled");
    });

    it("`Completed` button should redirect to /#/completed", () => {
      cy.get("@mount").then((mount) => mount());

      cy.getTestId("footer-navigation")
        .children()
        .last()
        .children()
        .should("have.attr", "href", "#/completed")
        .should("be.visible")
        .should("not.be.disabled");
    });
  });

  context("Child Component: Clear Completed Button", () => {
    it("should be disabled", () => {
      cy.get("@mount").then((mount) => mount());

      cy.get(".clear-completed").should("be.visible").should("be.disabled");
    });

    it("should clear completed items on click", () => {
      cy.get("@mount").then((mount) => mount([1, 3], cy.stub().as("dispatch")));

      cy.get(".clear-completed")
        .should("be.visible")
        .should("not.be.disabled")
        .click();

      cy.get("@dispatch")
        .should("have.been.calledOnce")
        .its("args")
        .then((args) => {
          const { type, payload } = args[0][0];
          expect(type).to.be.equal(REMOVE_COMPLETED_ITEMS);
          expect(payload).to.be.undefined;
        });
    });
  });
});
