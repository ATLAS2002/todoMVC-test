/// <reference types="cypress" />
/// <reference types="../../../../cypress/support" />

import { Header } from "../header";
import { ADD_ITEM } from "../../constants";

describe("Component: Header", () => {
  beforeEach(() => {
    cy.mount(<Header dispatch={cy.stub().as("dispatch")} />);
    cy.getTestId("text-input").as("input");
  });

  it("should render the header", () => {
    cy.getTestId("header").contains("h1", "todos").should("be.visible");
  });

  it("should render the input field", () => {
    cy.get("@input")
      .should("be.focused")
      .should("have.value", "")
      .should("have.attr", "placeholder", "What needs to be done?");
  });

  it("input field should correctly handle adding items", () => {
    const input = "New item";
    cy.get("@input")
      .type(input, { unfinished: true })
      .should("have.value", input);

    cy.get("@input").type("{enter}");
    cy.get("@dispatch")
      .should("have.been.calledOnce")
      .its("args")
      .then((args) => {
        const { type, payload } = args[0][0];
        expect(type).to.be.equal(ADD_ITEM);
        expect(payload.title).to.be.equal(input);
      });
  });
});
