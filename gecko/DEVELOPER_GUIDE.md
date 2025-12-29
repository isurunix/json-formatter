# Developer Guide - JSON Formatter Extension

## Architecture Overview

### Extension Components

1. **Manifest (manifest.json)**
   - Defines extension metadata and configuration
   - Specifies permissions: contextMenus, activeTab, storage
   - Registers background script, content script, and sidebar

2. **Background Script (background.js)**
   - Runs persistently in the background
   - Creates the context menu item "View Formatted JSON"
   - Handles context menu clicks
   - Stores selected JSON in browser.storage.local
   - Opens the sidebar when JSON is selected

3. **Content Script (content.js)**
   - Runs on all web pages
   - Currently minimal but available for future enhancements
   - Can be extended to add custom keyboard shortcuts or UI elements

4. **Sidebar (sidebar/)**
   - **sidebar.html**: UI structure
   - **sidebar.js**: Main logic for JSON formatting and search
   - **sidebar.css**: Styling with dark theme

### Data Flow

```
User selects text → Right-clicks → Clicks "View Formatted JSON"
                                          ↓
                              background.js receives click
                                          ↓
                        Stores JSON in browser.storage.local
                                          ↓
                              Opens/focuses sidebar
                                          ↓
                      sidebar.js listens for storage changes
                                          ↓
                        Loads JSON from storage.local
                                          ↓
                    Parses and formats JSON with syntax highlighting
                                          ↓
                              Displays in sidebar
```

## Key Features Implementation

### 1. Context Menu Integration

**Location**: `background.js`

```javascript
browser.contextMenus.create({
  id: "format-json",
  title: "View Formatted JSON",
  contexts: ["selection"]  // Only shows when text is selected
});
```

### 2. JSON Validation and Formatting

**Location**: `sidebar/sidebar.js` - `displayJSON()` function

- Uses `JSON.parse()` to validate JSON
- Catches parsing errors and displays error messages
- Formats valid JSON with `JSON.stringify(obj, null, 2)` for indentation

### 3. Syntax Highlighting

**Location**: `sidebar/sidebar.js` - `syntaxHighlight()` function

- Uses regex to match JSON elements
- Wraps elements in `<span>` with appropriate CSS classes
- Colors defined in `sidebar.css`:
  - Keys: Blue (#9cdcfe)
  - Strings: Orange (#ce9178)
  - Numbers: Light green (#b5cea8)
  - Booleans: Dark blue (#569cd6)
  - Null: Dark blue (#569cd6)

### 4. Search Functionality

**Location**: `sidebar/sidebar.js`

Key functions:
- `handleSearch()`: Processes search input and finds matches
- `highlightMatches()`: Highlights all matches in the JSON
- `goToNextMatch()` / `goToPreviousMatch()`: Navigation between matches
- `scrollToCurrentMatch()`: Auto-scrolls to current match

Features:
- Real-time search as you type
- Case-insensitive matching
- Match counter (e.g., "3/10")
- Current match highlighted differently
- Keyboard shortcuts (Enter, Shift+Enter)

## Firefox-Specific APIs Used

### browser.contextMenus
- `create()`: Create context menu items
- `onClicked`: Listen for menu item clicks

### browser.storage.local
- `set()`: Store data
- `get()`: Retrieve data
- `onChanged`: Listen for storage changes

### browser.sidebarAction
- `open()`: Open the sidebar programmatically

### browser.runtime
- `onMessage`: Inter-component communication
- `onInstalled`: Extension initialization

## Testing the Extension

### 1. Load Extension in Firefox

1. Open Firefox
2. Navigate to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select `manifest.json` from the gecko folder

### 2. Test Cases

#### Valid JSON Test
1. Navigate to any webpage
2. Select this text: `{"name": "John", "age": 30, "city": "New York"}`
3. Right-click and choose "View Formatted JSON"
4. Verify: Sidebar opens with formatted, colored JSON

#### Invalid JSON Test
1. Select: `{name: "John", age: 30`
2. Right-click and choose "View Formatted JSON"
3. Verify: Error message appears

#### Search Test
1. Load valid JSON
2. Type "John" in search box
3. Verify: Match is highlighted and counter shows "1/1"
4. Test navigation buttons

#### Complex JSON Test
```json
{
  "users": [
    {"id": 1, "name": "Alice", "active": true},
    {"id": 2, "name": "Bob", "active": false}
  ],
  "total": 2,
  "metadata": null
}
```

## Debugging

### Enable Console Logging

**Background Script:**
```javascript
// Open about:debugging → This Firefox → Inspect (next to the extension)
console.log("Debug message from background");
```

**Sidebar:**
```javascript
// Right-click in sidebar → Inspect Element
console.log("Debug message from sidebar");
```

**Content Script:**
```javascript
// Open DevTools on any webpage (F12)
console.log("Debug message from content script");
```

### Common Issues

1. **Context menu not appearing**
   - Check if text is selected
   - Verify manifest permissions
   - Check background script errors

2. **Sidebar not opening**
   - Check browser.sidebarAction.open() call
   - Verify sidebar path in manifest

3. **JSON not displaying**
   - Check storage operations
   - Verify sidebar.js is loading
   - Check for JavaScript errors in sidebar console

## Extending the Extension

### Add Copy to Clipboard Feature

```javascript
// In sidebar.js
function copyToClipboard() {
  const jsonText = JSON.stringify(currentJsonObject, null, 2);
  navigator.clipboard.writeText(jsonText)
    .then(() => console.log('Copied!'))
    .catch(err => console.error('Failed to copy:', err));
}
```

### Add Collapsible JSON Tree

Consider using libraries like:
- json-viewer
- react-json-tree
- jsoneditor

### Add Export to File

```javascript
function exportJSON() {
  const blob = new Blob([jsonText], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'formatted.json';
  a.click();
}
```

## Performance Considerations

1. **Large JSON Files**
   - Consider implementing lazy rendering for very large JSONs
   - Add pagination or virtualization
   - Limit initial display depth

2. **Search Optimization**
   - Debounce search input for better performance
   - Consider using Web Workers for large documents

3. **Memory Management**
   - Clear storage after sidebar closes
   - Implement size limits for stored JSON

## Packaging for Distribution

### Using web-ext

```bash
# Install web-ext
npm install -g web-ext

# Run extension with auto-reload
cd gecko
web-ext run

# Build extension package
web-ext build

# Sign extension (requires AMO account)
web-ext sign --api-key=$AMO_JWT_ISSUER --api-secret=$AMO_JWT_SECRET
```

### Manual Packaging

```bash
cd gecko
zip -r ../json-formatter.zip * -x "*.git*" "*.DS_Store" "create-icons.*"
```

## Publishing to Firefox Add-ons (AMO)

1. Create account at https://addons.mozilla.org
2. Go to Developer Hub
3. Submit new add-on
4. Upload the .zip file
5. Fill in metadata, screenshots, descriptions
6. Submit for review

## Security Best Practices

1. **Content Security Policy**: Already configured via manifest v2 defaults
2. **Input Sanitization**: JSON.parse handles this
3. **XSS Prevention**: Using textContent and controlled HTML generation
4. **Permissions**: Only request necessary permissions
5. **Data Privacy**: No external servers, all processing is local

## Browser Compatibility

- **Minimum Firefox Version**: 57.0 (specified in manifest)
- **API Compatibility**: All APIs used are stable WebExtension APIs
- **Testing**: Test on latest Firefox, ESR version, and minimum version

## Resources

- [Firefox Extension Workshop](https://extensionworkshop.com/)
- [WebExtensions API Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Firefox Extension Examples](https://github.com/mdn/webextensions-examples)
- [web-ext Tool](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/)
