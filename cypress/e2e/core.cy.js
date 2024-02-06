/// <reference types="cypress" />
/// <reference types="../support" />

import {
  useFixture,
  addTodo,
  toggleTodo,
  renameTodo,
  removeTodo,
} from "../support/utils";

describe("Core functionlities", () => {
  beforeEach(() => {
    cy.visit("/");

    useFixture("todos", (todo) => {
      addTodo(todo);
    });

    cy.getBySel("todo-list").as("list");
    cy.getBySel("todo-item").as("items");
    cy.getBySel("text-input").as("input");
  });

  it("Add items to list", () => {
    cy.log("Adding tasks to list...");
    useFixture("todos", (todo) => {
      cy.get("@list").contains(todo);
    });
  });

  it("Rename an item", () => {
    cy.log("Renaming first task to 'Success!!!'");
    renameTodo("Success!!!");

    cy.get("@items").first().contains("Success!!!");
  });

  it("Remove an item", () => {
    cy.get("@items")
      .its("length")
      .then((intialLength) => {
        cy.log("Removing last item");
        removeTodo(-1);

        cy.get("@items").its("length").should("be.lessThan", intialLength);
      });
  });

  context("Toggling tasks", () => {
    beforeEach(() => {
      useFixture("todos", (_, id) => {
        toggleTodo(id);
      });
    });

    it("Check items from list", () => {
      cy.log("Checking out tasks...");

      useFixture("todos", (_, id) => {
        cy.getBySel("todo-item").eq(id).should("have.class", "completed");
      });
    });

    it("Unchecking items from list", () => {
      cy.log("Unchecking tasks...");
      useFixture("todos", (_, id) => {
        toggleTodo(id);
      });

      useFixture("todos", (_, id) => {
        cy.getBySel("todo-item").eq(id).should("not.have.class", "completed");
      });
    });
  });
});
