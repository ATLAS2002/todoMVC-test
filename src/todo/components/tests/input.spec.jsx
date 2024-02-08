/// <reference types="cypress" />
/// <reference types="../../../../cypress/support" />

import { Input } from "../input";

describe("Component: Input", () => {
  beforeEach(() => {
    const mount = (
      { onSubmit, placeholder, label, defaultValue, onBlur } = {
        onSubmit: () => {},
        placeholder: "",
        label: "",
        defaultValue: "",
        onBlur: () => {},
      }
    ) => {
      cy.mount(
        <Input
          onSubmit={onSubmit}
          placeholder={placeholder}
          label={label}
          defaultValue={defaultValue}
          onBlur={onBlur}
        />
      );
    };

    cy.wrap(mount).as("mount");
  });

  it("should render and autofocus input field", () => {
    cy.get("@mount").then((mount) => mount());
    cy.getTestId("text-input")
      .should("be.visible")
      .should("be.focused")
      .then(($input) => {
        cy.wrap($input.prop("placeholder")).should("equal", "");
        cy.wrap($input.prop("value")).should("equal", "");
      });
    cy.get("label[for=todo-input]").as("label").should("be.empty");

    const props = {
      placeholder: "What needs to be done?",
      label: "This probably won't be visible",
      defaultValue: "Tests should be written by AI",
      onBlur: cy.stub().as("onBlur"),
    };
    cy.get("@mount").then((mount) => mount(props));
    cy.getTestId("text-input")
      .should("be.visible")
      .should("be.focused")
      .blur()
      .should("not.be.focused")
      .then(($input) => {
        cy.wrap($input.prop("placeholder")).should("equal", props.placeholder);
        cy.wrap($input.prop("value")).should("equal", props.defaultValue);
      });
    cy.get("@onBlur").should("be.calledOnce");
    cy.get("@label").contains(props.label);
  });

  it("should show the label", () => {
    const label = "Enter item name";
    cy.get("@mount").then((mount) => mount({ label }));

    cy.get("label[for=todo-input]")
      .contains(label)
      .as("label")
      .should("be.visible");
    cy.get("@label").invoke("width").should("be.gt", 5);
    cy.get("@label").invoke("height").should("be.gt", 5);
  });

  it("should take input with valid length", () => {
    cy.get("@mount").then((mount) =>
      mount({ onSubmit: cy.stub().as("onSubmit"), defaultValue: "        " })
    );

    const text = "Typing...";
    cy.getTestId("text-input").as("input").type(text[0]);
    cy.get("@input").type(text.slice(1), { unfinished: true });

    cy.get("@input").then(($input) => {
      cy.wrap($input.prop("value")).should(
        "equal",
        $input.prop("defaultValue") + text
      );
    });
    cy.get("@input")
      .type("")
      .then(($input) => {
        cy.wrap($input.prop("value")).should("equal", "");
      });
    cy.get("@onSubmit").should("be.calledOnceWith", text);
  });

  it("should parse the sanitized text before showing", () => {
    const specialCharacters = `&("<>')/`;
    cy.get("@mount").then((mount) =>
      mount({ onSubmit: cy.stub().as("onSubmit") })
    );
    cy.getTestId("text-input").type(specialCharacters);

    cy.get("@onSubmit")
      .should("have.been.calledOnce")
      .its("args")
      .then(([[args, ,], ,]) => {
        cy.wrap(args).should("equal", specialCharacters);
      });
  });
});
