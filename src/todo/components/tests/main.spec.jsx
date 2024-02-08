/// <reference types="cypress" />
/// <reference types="../../../../cypress/support" />

import { Main } from "../main";
import { mutateTodos, useFixture } from "../../../../cypress/support/utils";
import { TOGGLE_ALL } from "../../constants";

describe("Component: Main", () => {
  beforeEach(() => {
    const defaultParams = {
      path: "/",
      indexes: [],
      mutate: () => ({ completed: true }),
      dispatch: cy.stub().as("dispatch"),
    };
    const mount = (params) => {
      const { path, indexes, mutate, dispatch } = {
        ...defaultParams,
        ...params,
      };
      cy.log(path);
      mutateTodos(indexes, mutate, (todos) => {
        cy.mount(<Main todos={todos} dispatch={dispatch} />, {
          routerProps: {
            initialEntries: [path],
          },
        });
      });
    };

    cy.wrap(mount).as("mount");
  });

  it("should show all items", () => {
    cy.get("@mount").then((mount) => mount());

    cy.getTestId("todo-list").as("list").children().should("have.length", 4);

    useFixture("todos", (todo) => {
      cy.getTestId("todo-list").contains(todo.title);
    });
  });

  it("should show active items only", () => {
    cy.get("@mount").then((mount) =>
      mount({ indexes: [0, 1], path: "/active" })
    );

    cy.getTestId("todo-list").as("list").children().should("have.length", 2);

    useFixture("todos", (todo) => {
      if (todo.id < 2) {
        cy.get("@list").contains(todo.title).should("not.exist");
      } else {
        cy.get("@list").contains(todo.title);
      }
    });
  });

  it("should show completed items only", () => {
    cy.get("@mount").then((mount) =>
      mount({ indexes: [0, 1], path: "/completed" })
    );

    cy.getTestId("todo-list").as("list").children().should("have.length", 2);

    useFixture("todos", (todo) => {
      if (todo.id > 1) {
        cy.get("@list").contains(todo.title).should("not.exist");
      } else {
        cy.get("@list").contains(todo.title);
      }
    });
  });

  it("should show toggle-all button when there are visible items", () => {
    cy.get("@mount").then((mount) => mount());
    cy.getTestId("toggle-all").should("exist").should("not.be.disabled");

    cy.get("@mount").then((mount) => mount({ path: "/completed" }));
    cy.getTestId("toggle-all").should("not.exist");
  });

  it("should toggle all items when clicked on toggle-all button", () => {
    cy.get("@mount").then((mount) => mount());
    cy.getTestId("toggle-all").click({ force: true });

    cy.get("@mount").then((mount) => mount({ indexes: [0, 1, 2, 3] }));
    cy.getTestId("toggle-all").click({ force: true });

    cy.get("@dispatch")
      .its("args")
      .then((args) => {
        expect(args.length).to.equal(2);
        args.forEach(([arg, ,], ind) => {
          expect(arg.type).to.equal(TOGGLE_ALL);
          expect(arg.payload.completed).to.equal(!ind);
        });
      });
  });
});
