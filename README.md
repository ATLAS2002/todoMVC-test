# TodoMVC App UI testing strategy

#### Testing framework: Cypress

---

- ### E2E Tests:

  - ##### Core: _Check if each functionality of a TODO list app is working._

    <table>
      <tr>
        <th align="center">Test Case</th>
        <th align="center">Implementation Details</th>
      </tr>
      <tr>
        <td align="center"><b>Add items</b></td>
        <td>
          🔹Type some tasks in <code>text-input</code>.<br/>
          🔸Each item should appear inside <code>todo-list</code>.
        </td>
      </tr>
      <tr>
        <td align="center"><b>Rename items</b></td>
        <td>
          🔹Double click on any item <code>.view</code>. This should replace the inner elements with an input element <code>[data-testid=text-input]</code>.<br/>
          🔹Clear the input element and type something new.<br/>
          🔸Selected item should have the new name.
        </td>
      </tr>
      <tr>
        <td align="center"><b>Delete items</b></td>
        <td>
          🔹Hover on an item, so that the <code>destroy</code> button reveals itself.<br/>
          🔹Click on the X.<br/>
          🔸Total count of <code>todo-items</code> should decrease by one.
        </td>
      </tr>
      <tr>
        <td colspan="2" align="center"><h6>Toggling items</h6></td>
      </tr>
      <tr>
        <td align="center"><b>Check items</b></td>
        <td>
          🔹Check the <code>todo-item-toggle</code> button for couple of items.<br/>
          🔸Each of those checked items should have the <code>completed</code> class.
        </td>
      </tr>
      <tr>
        <td align="center"><b>Uncheck items</b></td>
        <td>
          🔹Uncheck items that already have <code>completed</code> class. <br />
          🔸None of the <code>todo-item</code> should have the <code>completed</code> class now.
        </td>
      </tr>
    </table>

  - ##### Validation: _Check if the inputs are being validated before appending to the list._

    <table>
      <tr>
        <th align="center">Test Case</th>
        <th align="center">Implementation Details</th>
      </tr>
      <tr>
        <td align="center"><b>Add valid items</b></td>
        <td>
          🔹Type these into the input box: <b>"", "a", "ab"</b>.<br/>
          🔸First two should not be added to the <code>todo-list</code>.<br/> 
          🔸Last text should be added to the list.
        </td>
      </tr>
      <tr>
        <td align="center"><b>Rename valid items</b></td>
        <td>
          🔹Select any item from the list. <br/>
          🔹Try to rename the current item with these: <b>"", "a", "item 2"</b>.<br/>
          🔸Only the final attempt should be successfull.
        </td>
      </tr>
      <tr>
        <td align="center"><b>Allow special characters</b></td>
        <td>
          🔹Add texts that has <b>[", ', /, &, <, >]</b> in it. <br/>
          🔸The text in <code>todo-item</code> should appear as expected.
        </td>
      </tr>
      <tr>
        <td colspan="2" align="center"><h6>Extra spaces</h6></td>
      </tr>
      <tr>
        <td align="center"><b>Remove Leading spaces</b></td>
        <td>
          🔹Enter a text with a lot of spaces appended before it.<br/>
          🔹Rename it with any other text that has leading space.<br/>
          🔸In both cases, the text should not start with spaces.
        </td>
      </tr>
      <tr>
        <td align="center"><b>Remove Trailing spaces</b></td>
        <td>
          🔹Enter a text with a lot of spaces appended after it.<br/>
          🔹Rename it with any other text that has trailing space.<br/>
          🔸In both cases, the text should not end with spaces.
        </td>
      </tr>
      <tr>
        <td align="center"><b>Remove Wide spaces</b></td>
        <td>
          🔹Enter a text that has more than one space between two words.<br/>
          🔹Rename it with any other text with wide space. <br/>
          🔸In both cases, the text should not have repeated spaces.
        </td>
      </tr>
    </table>

  - ##### Behaviour: _Check if other components are working as expected._
    <table>
      <tr>
        <th align="center">Test Case</th>
        <th align="center">Implementation Details</th>
      </tr>
      <tr>
        <td colspan="2" align="center"><h5>Before adding any item</h5></td>
      </tr>
      <tr>
        <td align="center"><b>Show heading</b></td>
        <td>🔸Inside header, a <code>&lt;h1&gt;</code> element should exist with text: <b>'todos'</b>.</td>
      </tr>
      <tr>
        <td align="center"><b>Show input</b></td>
        <td>🔸A text input field should be visible.</td>
      </tr>
      <tr>
        <td align="center"><b>Hide items</b></td>
        <td>🔸The <code>todo-list</code> should be empty.</td>
      </tr>
      <tr>
        <td align="center"><b>Hide toggle-all button</b></td>
        <td>🔸<code>toggle-all</code> button should not be found in DOM.</td>
      </tr>
      <tr>
        <td align="center"><b>Hide footer</b></td>
        <td>🔸Footer should not exist in DOM.</td>
      </tr>
      <tr>
        <td colspan="2" align="center"><h5>After adding a few items</h5></td>
      </tr>
      <tr>
        <td align="center"><b>Show items</b></td>
        <td>🔸Each item should be displayed in order.</td>
      </tr>
      <tr>
        <td align="center"><b>Show toggle-all button</b></td>
        <td>🔸<code>toggle-all</code> should be visible and clickable.</td>
      </tr>
      <tr>
        <td colspan="2" align="center"><h6>Use toggle-all button</h6</td>
      </tr>
      <tr>
        <td align="center"><b>Check all items<b/></td>
        <td>
          🔹Click on <code>toggle-all</code> button.<br/>
          🔸All items should be checked out.
        </td>
      </tr>
      <tr>
        <td align="center"><b>Unheck all items<b/></td>
        <td>
          🔹Click on <code>toggle-all</code> button again.<br/>
          🔸All items should be unchecked now.
        </td>
      </tr>
      <tr>
        <td colspan="2" align="center"><h6>Test footer components</h6</td>
      </tr>
      <tr>
        <td align="center"><b>Show footer components</b></td>
        <td>
          🔸<code>todo-count</code> should be visible.<br/>
          🔸Each <code>footer-navigation</code> link: <code><b>'All', 'Active', 'Completed'</b></code> should be visible.<br/>
          🔸<code>clear-all</code> button should be visible.
        </td>
      </tr>
      <tr>
        <td align="center"><b>Todo counter</b></td>
        <td>
          🔸Count should be equal to the total number of items.<br/>
          🔹Add a new item to the list.<br/>
          🔸Count should increase by 1.<br/>
          🔹Rename an item from the list.<br/>
          🔸Count should be unchanged.<br/>
          🔹Check all items (either manually or click <code>toggle-all</code> button).<br/>
          🔸Count should be 0.<br/>
          🔹Uncheck 1 item.<br/>
          🔸Count should be 1.<br/>
          🔹Delete a checked item.<br/>
          🔸Count should be unchanged.<br/>
          🔹Delete the unchecked item.<br/>
          🔸Count should be 0 again.<br/>
        </td>
      </tr>
      <tr>
        <td align="center"><b>Navigation buttons</b></td>
        <td>
          🔹Click <b><code>Active</code></b> button.<br/>
          🔸<code>todo-list</code> should not be empty.<br/>
          🔹Click <b><code>Completed</code></b> button.<br/>
          🔸<code>todo-list</code> should be empty.<br/>
          🔹Click <b><code>All</code></b> button.<br/>
          🔸<code>todo-list</code> should not be empty.<br/>
          🔹Check all items / Click <code>toggle-all</code> button.<br/>
          🔸<code>todo-list</code> should not be empty.<br/>
          🔹Click <b><code>Completed</code></b> button.<br/>
          🔸<code>todo-list</code> should not be empty.<br/>
          🔹Click <b><code>Active</code></b> button.<br/>
          🔸<code>todo-list</code> should be empty.<br/>
        </td>
      </tr>
      <tr>
        <td align="center"><b>Clear Completed button</b></td>
        <td>
          🔸Initially the <code>clear-completed</code> button should be disabled.<br/>
          🔹Check all items / Click <code>toggle-all</code> button.<br/>
          🔸Now the button should not be disabled anymore, and <code>todo-list</code> should have some items. <br/>
          🔹Click <code>clear-completed</code> button.<br/>
          🔸<code>todo-list</code> should be empty after that.
        </td>
      </tr>
    </table>

---

- ### Component Tests:

  - ##### Component: `footer.jsx`
  - ##### Tests Cases:

    - should not render footer
    - should render footer
      ###### [child component - todo counter]
      - should show 1 item left
      - should show 0 or 1+ items left
      ###### [child component - navigation buttons]
      - `All` button should redirect to `/#`
      - `Active` button should redirect to `/#/active`
      - `Completed` button should redirect to `/#/completed`
      ###### [child component - clear completed button]
      - should be disabled
      - should clear completed items on click

  - ##### Component: `header.jsx`
  - ##### Tests Cases:

    - should render the header
    - should render the input field
    - input field should correctly handle adding items

  - ##### Component: `input.jsx`
  - ##### Tests Cases:

    - should render and autofocus input field
    - should show the label
    - should take input with valid length
    - should parse the sanitized text before showing

  - ##### Component: `item.jsx`
  - ##### Tests Cases:

    - toggle button should work properly
    - label should work properly
    - input field should work properly
    - destroy button should work properly

  - ##### Component: `main.jsx`
  - ##### Tests Cases:

    - should show all items
    - should show active items only
    - should show completed items only
    - should show toggle-all button when there are visible items
    - should toggle all items when clicked on toggle-all button

  - ##### Component: `reducer.js`
  - ##### Tests Cases:
    - `adding item` should work properly
    - `updating item` should work properly
    - `removing item` should work properly
    - `toggling items` should work properly
    - `removing all items` should work properly
    - `toggling all items` should work properly
    - `removing completed items` should work properly
    - `error handling` should work properly
