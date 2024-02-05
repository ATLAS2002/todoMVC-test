/// <reference types="./" />

/**
 *
 * @param {string} log - what you want to log after test passes
 */
export const validateTodoCounter = (log = "") => {
  cy.getTestId("footer")
    .find(".todo-count")
    .then(($el) => {
      const remaining = parseInt($el.text().split(" ")[0]);

      cy.getTestId("todo-item")
        .not(".completed")
        .should("have.length", remaining);
    });

  if (log.length) cy.log("test passed: " + log);
};

/**
 *
 * @param {string} fixture - path to fixture file
 * @param {function(string, number)} callback - callback function that is called with fixture data
 */
export const useFixture = (fixture, callback) => {
  cy.fixture(fixture).then((data) => {
    data.forEach((item, index) => {
      callback(item, index);
    });
  });
};

/**
 *
 * @param {string} text - content of the item
 */
export const addTodo = (text) => {
  cy.getTestId("text-input").type(text);
};

/**
 *
 * @param {string} text - new content of the item
 * @param {number} index - index of the item, `default: 0`
 */
export const renameTodo = (text, index = 0) => {
  if (index < 0) cy.get(".view").last().dblclick();
  else cy.get(".view").eq(index).dblclick();

  cy.get(".view > .input-container > [data-testid=text-input]")
    .first()
    .clear()
    .type(text);

  cy.get(".view")
    .then(($view) => {
      if ($view.find("[data-testid=text-input]").length) {
        return "[data-testid=text-input]";
      }
      return null;
    })
    .then((target) => {
      if (target) cy.get(target).first().focus().blur();
    });
};

/**
 *
 * @param {number} index - index of the item, `default: 0`, `last item: -1`
 */
export const removeTodo = (index = 0) => {
  cy.getTestId("todo-item-button").as("destructors");
  if (index < 0) cy.get("@destructors").last().invoke("show").click();
  else cy.get("@destructors").eq(index).invoke("show").click();
};

/**
 *
 * @param {number} item - index of the item, `default: 0`, `last item: -1`
 * @param {boolean} check - `true: check`, `false: uncheck`, `default: click`
 */
export const toggleTodo = (item = 0, check = null) => {
  if (item >= 0) cy.getTestId("todo-item-toggle").eq(item).as("target");
  else cy.getTestId("todo-item-toggle").last().as("target");

  if (check === null) cy.get("@target").click();
  else if (check) cy.get("@target").check();
  else cy.get("@target").uncheck();
};

/**
 *
 * @param {boolean} check - `true: check`, `false: uncheck`, `default: click`
 */
export const tapToggleAllButton = (check = null) => {
  if (check === null) cy.getTestId("toggle-all").click();
  else if (check) cy.getTestId("toggle-all").check();
  else cy.getTestId("toggle-all").uncheck();
};
