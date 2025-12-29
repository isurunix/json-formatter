# JSON Formatter

This document contains the key requirements for the JSON formatter extension.
JSON Formatter is a browser extension that allows users to select any json string in a webpage and then view the formatted JSON in the browser side bar.

## Requirements

### 1.0.0

1.
As a a user, when I select a text in a webpage and click right click I should be able to see an option "View Formatted JSON" in the right-click context menu

2. 
Given that user has selected a valid JSON in a webpage
When they click "View Formatted JSON" option from context menu
Then the formatted JSON with syntax highlighting should be shown in the sidebar

3.
Given that user has selected a invalid JSON in a webpage
When they click "View Formatted JSON" option from context menu
Then an error message should be shown in the sidebar

4. 
Given the sidebar is visible with a valid formatted JSON
Then the user should see an option to search the text in the formatted JSON and navigate back-and-forth between the matching text.

### 1.0.1

Given that a valid JSON is visible in the sidebar
Then the user should see a button to copy the formatted json
adjacent to the search input 
And when the button is clicked the formatted json should be copied to the clipboard

