# TodoMVC App

#### Testing framework: Cypress

---

- ### e2e tests:
  - ##### Core: _Check if each functionality of a TODO list app is working._
    |   Test Case   | Implementation Details                                                                                                                                                                                                                      |
    | :-----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    |   Add items   | 🔹Type some tasks in `text-input`.<br /> 🔸 Each item should appear inside `todo-list`.                                                                                                                                                     |
    |  Check items  | 🔹Check the `todo-item-toggle` button for couple of items. <br /> 🔸Each of those checked items should have the `completed` class.                                                                                                          |
    | Uncheck items | 🔹Uncheck items that already have `completed` class. <br />🔸None of the `todo-item` should have the `completed` class now.                                                                                                                 |
    | Rename items  | 🔹Double click on any item`(".view")`. This should replace the inner elements with an input element`("[data-testid=text-input]")`. <br /> 🔹Clear the input element and type something new. <br />🔸Selected item should have the new name. |
    | Delete items  | 🔹Hover on a item, so that the `destroy` button reveals itself. <br/> 🔹Click on the X button. <br /> 🔸Total count of `todo-items` should decrease by one.                                                                                 |
