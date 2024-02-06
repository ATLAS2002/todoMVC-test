/// <reference types="cypress" />
/// <reference types="../support" />

import {
  useFixture,
  addTodo,
  toggleTodo,
  renameTodo,
  removeTodo,
  tapToggleAllButton,
  validateTodoCounter,
} from "../support/utils";

describe("Component behaviors", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.getTestId("todo-list").as("list");
    cy.getTestId("text-input").as("input");
  });

  context("Before adding items", () => {
    it("should show heading", () => {
      cy.contains("h1", "todos");
    });

    it("should show todo input field", () => {
      cy.get("@input").should("be.visible");
    });

    it("should not show any items", () => {
      cy.get("@list").should("be.empty");
    });

    it("should not show toggle-all button", () => {
      cy.getTestId("toggle-all").should("not.exist");
    });

    it("should not show footer", () => {
      cy.getTestId("footer").should("not.exist");
    });
  });

  context("After adding items", () => {
    beforeEach(() => {
      useFixture("todos", (todo) => {
        addTodo(todo);
        cy.getTestId("todo-item").as("items");
      });
    });

    it("should show items", () => {
      cy.fixture("todos").then((todos) => {
        cy.get("@list").children().should("have.length", todos.length);
      });
    });

    it("should show toggle-all button", () => {
      cy.getTestId("toggle-all").should("exist");
    });

    context("Use toggle-all button", () => {
      beforeEach(() => {
        tapToggleAllButton();
      });

      it("should check all items", () => {
        cy.get("@items")
          .its("length")
          .then((length) => {
            cy.get(".completed").should("have.length", length);
          });
      });

      it("should uncheck all items", () => {
        tapToggleAllButton();
        cy.get(".completed").should("not.exist");
      });
    });

    context("Test footer components", () => {
      beforeEach(() => {
        cy.getTestId("footer").as("footer");
        cy.getTestId("footer-navigation").as("footer-nav");

        cy.get("@footer-nav").find("a[href='#/']").as("all-btn");
        cy.get("@footer-nav").find("a[href='#/active']").as("active-btn");
        cy.get("@footer-nav").find("a[href='#/completed']").as("completed-btn");

        cy.get("@footer").find(".clear-completed").as("clear-btn");
      });

      it("should show all footer components", () => {
        cy.get("@footer").find(".todo-count").should("be.visible");
        cy.log("Todo Counter is visible.");

        cy.get("@all-btn").should("be.visible");
        cy.get("@active-btn").should("be.visible");
        cy.get("@completed-btn").should("be.visible");
        cy.log("Navigation buttons are visible.");

        cy.get("@clear-btn").should("be.visible");
        cy.log("'Clear All' button is visible.");
      });

      it("Todo counter should show correct number of active items", () => {
        validateTodoCounter("no changes");

        addTodo("new task");
        validateTodoCounter("new item added");

        renameTodo("renaming task");
        validateTodoCounter("item renamed");

        tapToggleAllButton();
        validateTodoCounter("all items checked");

        toggleTodo(0, false);
        validateTodoCounter("1 item unchecked");

        removeTodo(-1);
        validateTodoCounter("checked item deleted");

        removeTodo(0);
        validateTodoCounter("unchecked item deleted");
      });

      it("Navigation buttons should work properly", () => {
        cy.get("@active-btn").click();
        cy.get("@list").should("not.be.empty");

        cy.get("@completed-btn").click();
        cy.get("@list").should("be.empty");

        cy.get("@all-btn").click();
        cy.get("@list").should("not.be.empty");

        tapToggleAllButton();
        cy.get("@list").should("not.be.empty");

        cy.get("@completed-btn").click();
        cy.get("@list").should("not.be.empty");

        cy.get("@active-btn").click();
        cy.get("@list").should("be.empty");
      });

      it("Clear Completed button should work properly", () => {
        cy.get("@clear-btn").should("be.disabled");

        tapToggleAllButton();
        cy.get("@clear-btn").should("not.be.disabled").click();
        cy.get("@list").should("be.empty");
      });
    });
  });
});
