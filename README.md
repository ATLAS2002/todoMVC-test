# TodoMVC App UI testing strategy

#### Testing framework: Cypress

---

- ### e2e tests:
  - ##### Core: _Check if each functionality of a TODO list app is working._
    |            Test Case            | Implementation Details                                                                                                                                                                                                                      |
    | :-----------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    |            Add items            | 🔹Type some tasks in `text-input`.<br /> 🔸 Each item should appear inside `todo-list`.                                                                                                                                                     |
    |          Rename items           | 🔹Double click on any item`(".view")`. This should replace the inner elements with an input element`("[data-testid=text-input]")`. <br /> 🔹Clear the input element and type something new. <br />🔸Selected item should have the new name. |
    |          Delete items           | 🔹Hover on a item, so that the `destroy` button reveals itself. <br/> 🔹Click on the X button. <br /> 🔸Total count of `todo-items` should decrease by one.                                                                                 |
    |  **Toggle items:** Check items  | 🔹Check the `todo-item-toggle` button for couple of items. <br /> 🔸Each of those checked items should have the `completed` class.                                                                                                          |
    | **Toggle items:** Uncheck items | 🔹Uncheck items that already have `completed` class. <br />🔸None of the `todo-item` should have the `completed` class now.                                                                                                                 |
  - ##### Validation: _Check if the inputs are being validated before appending to the list._
    | Test Case                                    | Implementation Details                                                                                                                                                                 |
    | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | only accept items with length greater than 1 | 🔹Type these into the input box: **"", "a", "ab"**. <br/> 🔸First two should not be added to the `todo-list`. <br/> 🔸Last text should be added to the list.                           |
    | only rename items with length greater than 1 | 🔹Select any item from the list. <br/> 🔹Try to rename the current item with these: **"", "a", "item 2"** <br/> 🔸Only the final attempt should be successfull.                        |
    | render text with special characters          | 🔹Add texts that has **[", ', /, &, <, >]** in it. <br/> 🔸The text in `todo-item` should appear as expected.                                                                          |
    | **Extra space:** Leading spaces              | 🔹Enter a text with a lot of spaces appended before it. <br/> 🔹Rename it with any other text that has leading space. <br/> 🔸In both cases, the text should not start with spaces.    |
    | **Extra space:** Trailing spaces             | 🔹Enter a text with a lot of spaces appended after it. <br/> 🔹Rename it with any other text that has trailing space. <br/> 🔸In both cases, the text should not end with spaces.      |
    | **Extra space:** Wide spaces                 | 🔹Enter a text that has more than one space between two words. <br/> 🔹Rename it with any other text with wide space. <br/> 🔸In both cases, the text should not have repeated spaces. |
  - ##### Behaviour: _Check if other components are working as expected._
