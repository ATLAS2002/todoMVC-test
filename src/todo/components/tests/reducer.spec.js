/// <reference types="cypress" />
/// <reference types="../../../../cypress/support" />

import {
  ADD_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM,
  TOGGLE_ITEM,
  REMOVE_ALL_ITEMS,
  TOGGLE_ALL,
  REMOVE_COMPLETED_ITEMS,
} from "../../constants";
import { todoReducer } from "../../reducer";

describe("Test reducer actions", () => {
  beforeEach(() => {
    const reducer = (action, callback, mutate) => {
      cy.fixture("todos").then((todos) => {
        if (mutate) mutate(todos);
        const state = todoReducer(todos, action);
        callback(state);
      });
    };

    cy.wrap(reducer).as("reducer");
  });

  it("Action: Add Item", () => {
    cy.get("@reducer").then((reducer) =>
      reducer(
        {
          type: ADD_ITEM,
          payload: { title: "New Item" },
        },
        (todos) => {
          expect(todos.length).to.be.equal(5);
          const latestItem = todos[4];
          expect(latestItem.title).to.be.equal("New Item");
          expect(latestItem.completed).to.be.equal(false);
        }
      )
    );
  });

  it("Action: Update Item", () => {
    cy.get("@reducer").then((reducer) =>
      reducer(
        {
          type: UPDATE_ITEM,
          payload: { id: 0, title: "Updated Item" },
        },
        (todos) => {
          expect(todos.length).to.be.equal(4);
          expect(todos[0].title).to.be.equal("Updated Item");
          expect(todos[0].completed).to.be.equal(false);
        }
      )
    );
  });

  it("Action: Remove Item", () => {
    cy.get("@reducer").then((reducer) =>
      reducer(
        {
          type: REMOVE_ITEM,
          payload: { id: 2 },
        },
        (todos) => {
          expect(todos.length).to.be.equal(3);
          todos.forEach(({ id }) => expect(id).to.not.equal(2));
        }
      )
    );
  });

  it("Action: Toggle Item", () => {
    cy.get("@reducer").then((reducer) =>
      reducer(
        {
          type: TOGGLE_ITEM,
          payload: { id: 0 },
        },
        (todos) => {
          expect(todos.length).to.be.equal(4);
          expect(todos[0].completed).to.be.equal(true);
        }
      )
    );
  });

  it("Action: Remove All Items", () => {
    cy.get("@reducer").then((reducer) =>
      reducer({ type: REMOVE_ALL_ITEMS }, (todos) => {
        expect(todos.length).to.be.equal(0);
      })
    );
  });

  it("Action: Toggle All Items", () => {
    cy.get("@reducer").then((reducer) =>
      reducer(
        {
          type: TOGGLE_ALL,
          payload: {
            completed: true,
          },
        },
        (todos) => {
          expect(todos.length).to.be.equal(4);
          todos.forEach(({ completed }) => expect(completed).to.be.equal(true));
        }
      )
    );
  });

  it("Action: Remove Completed Items", () => {
    cy.get("@reducer").then((reducer) =>
      reducer(
        { type: REMOVE_COMPLETED_ITEMS },
        (todos) => {
          expect(todos.length).to.be.equal(2);
          todos.forEach(({ completed }) =>
            expect(completed).to.be.equal(false)
          );
        },
        (todos) => {
          todos[0].completed = todos[1].completed = true;
        }
      )
    );
  });

  it("Error: Invalid Action Type", () => {
    try {
      todoReducer([], { type: "INVALID_ACTION" });
    } catch (err) {
      expect(err.message).to.equal("Unknown action: INVALID_ACTION");
    }
  });
});
