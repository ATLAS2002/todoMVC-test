/// <reference types="cypress" />
/// <reference types="../../../../cypress/support" />

import { Item } from "../item";
import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../../constants";

describe("Component: Item", () => {
  beforeEach(() => {
    const mount = (
      { id, title, dispatch, completed } = {
        id: 1,
        title: "item",
        completed: false,
        dispatch: cy
          .stub()
          .as("dispatch")
          .returns({ id: 1, title: "item", completed: true }),
      }
    ) => {
      cy.mount(
        <Item todo={{ id, title, completed }} dispatch={dispatch} index={id} />
      );
    };

    cy.wrap(mount).as("mount");
  });

  it("Child Component: Toggle button", () => {
    cy.get("@mount").then((mount) => mount());

    cy.getTestId("todo-item-toggle")
      .should("be.visible")
      .should("not.be.checked")
      .click();

    cy.get("@dispatch").should("be.calledOnceWith", {
      type: TOGGLE_ITEM,
      payload: {
        id: 1,
      },
    });

    cy.get("@mount").then((mount) => mount({ completed: true }));
    cy.getTestId("todo-item-toggle").should("be.checked");
  });

  it("Child Component: Label", () => {
    cy.get("@mount").then((mount) => mount());

    cy.getTestId("todo-item-label")
      .should("be.visible")
      .should("not.be.disabled");
  });

  it("Child Component: Input", () => {
    cy.get("@mount").then((mount) => mount());

    cy.getTestId("text-input").should("not.exist");
    cy.getTestId("todo-item-label").dblclick();

    cy.getTestId("text-input")
      .should("be.focused")
      .clear()
      .type("Updated!")
      .should("not.exist");

    cy.get("@dispatch").should("be.calledOnceWith", {
      type: UPDATE_ITEM,
      payload: {
        id: 1,
        title: "Updated!",
      },
    });
  });

  it("Child Component: Destroy Button", () => {
    cy.get("@mount").then((mount) => mount());

    cy.getTestId("todo-item-button").should("be.hidden").click({ force: true });
    cy.get("@dispatch").should("be.calledOnceWith", {
      type: REMOVE_ITEM,
      payload: {
        id: 1,
      },
    });
  });
});
