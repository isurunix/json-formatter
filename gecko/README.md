# JSON Formatter Firefox Extension

A Firefox extension that allows users to select JSON text on any webpage and view it formatted with syntax highlighting in a sidebar.

## Features

✅ **Context Menu Integration**: Right-click on selected text to format JSON
✅ **Syntax Highlighting**: Color-coded JSON elements (keys, strings, numbers, booleans, null)
✅ **Error Handling**: Clear error messages for invalid JSON
✅ **Search Functionality**: Search within formatted JSON with match highlighting
✅ **Navigation**: Navigate between search matches with keyboard shortcuts or buttons
✅ **Dark Theme**: VS Code-inspired dark theme for comfortable viewing

## Installation

### Development Installation

1. Navigate to the gecko directory:
   ```bash
   cd gecko
   ```

2. Open Firefox and navigate to `about:debugging`

3. Click "This Firefox" in the left sidebar

4. Click "Load Temporary Add-on"

5. Navigate to the `gecko` folder and select the `manifest.json` file

### Creating Icons

The extension requires icons in the following sizes. You can create placeholder icons or design custom ones:

- 16x16 pixels
- 32x32 pixels
- 48x48 pixels
- 96x96 pixels

Place them in the `gecko/icons/` directory with the following names:
- `icon-16.png`
- `icon-32.png`
- `icon-48.png`
- `icon-96.png`

## Usage

1. **Select JSON text** on any webpage
2. **Right-click** on the selected text
3. **Click "View Formatted JSON"** from the context menu
4. The sidebar will open displaying the formatted JSON

### Search Functionality

Once JSON is displayed in the sidebar:

- Type in the search box to find text in the JSON
- Use **↑** and **↓** buttons to navigate between matches
- Or use **Enter** to go to the next match and **Shift+Enter** for previous match
- The current match is highlighted in orange, other matches in brown

## Project Structure

```
gecko/
├── manifest.json           # Extension configuration
├── background.js          # Background script for context menu
├── content.js            # Content script (runs on web pages)
├── sidebar/
│   ├── sidebar.html      # Sidebar UI
│   ├── sidebar.js        # Sidebar logic
│   └── sidebar.css       # Sidebar styling
└── icons/                # Extension icons (to be created)
    ├── icon-16.png
    ├── icon-32.png
    ├── icon-48.png
    └── icon-96.png
```

## Development

### Key Components

- **manifest.json**: Defines permissions, scripts, and sidebar configuration
- **background.js**: Handles context menu creation and message passing
- **content.js**: Content script for potential future enhancements
- **sidebar.html/js/css**: Sidebar interface with JSON formatting and search

### Permissions

- `contextMenus`: Create context menu items
- `activeTab`: Access to the active tab's content
- `storage`: Store selected JSON temporarily

## Browser Compatibility

- Firefox 57.0 or higher (due to WebExtensions API usage)

## Future Enhancements

- Copy formatted JSON to clipboard
- Collapse/expand JSON objects and arrays
- Theme customization (light/dark modes)
- Export formatted JSON to file
- JSON tree view option
- Line numbers
- Minify/beautify controls
