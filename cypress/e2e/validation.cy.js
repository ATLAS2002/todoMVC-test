/// <reference types="cypress" />
/// <reference types="../support" />

import { addTodo, renameTodo, useFixture } from "../support/utils";

describe("Validate actions", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.getTestId("todo-list").as("list");
  });

  it("should not accept item names that are less than 2 characters", () => {
    addTodo("   ");
    cy.get("@list").should("be.empty");

    addTodo("     a");
    cy.get("@list").should("be.empty");

    addTodo("b");
    cy.get("@list").should("not.be.empty");
  });

  it("should not let rename items with names less than 2 characters", () => {
    addTodo("item 1");

    renameTodo("       ");
    cy.get("@list").contains("item 1");

    renameTodo("a    ");
    cy.get("@list").contains("item 1");

    renameTodo("item 2");
    cy.get("@list").should("not.include.text", "item 1");
  });

  it("should allow special characters", () => {
    const text = "&(''~'')/>";
    addTodo(text);
    cy.get("@list").contains(text);
  });

  context("Extra space", () => {
    it("should not allow leading spaces", () => {
      addTodo("   text message");
      cy.get("@list").contains("text message");

      renameTodo("   text message");
      cy.get("@list").contains("text message");
    });

    it("should not allow trailing spaces", () => {
      addTodo("text message      ");
      cy.get("@list").contains("text message");

      renameTodo("text message      ");
      cy.get("@list").contains("text message");
    });

    it("should not allow wide spaces", () => {
      addTodo("text       message");
      cy.get("@list").contains("text message");

      renameTodo("text       message");
      cy.get("@list").contains("text message");
    });
  });
});
