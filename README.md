# JSON Formatter Browser Extensions

This repository contains browser extensions for formatting and viewing JSON with syntax highlighting.

## Project Structure

```
json-formatter/
├── requirements.md          # Original requirements document
├── gecko/                   # Firefox extension (WebExtensions)
│   ├── manifest.json       
│   ├── background.js       
│   ├── content.js          
│   ├── sidebar/            # Sidebar UI and logic
│   ├── icons/              # Extension icons
│   ├── README.md           # Firefox-specific instructions
│   └── DEVELOPER_GUIDE.md  # Detailed technical documentation
└── chromium/                # (Reserved for Chrome/Edge/Chromium extension)
```

## Extensions

### Firefox Extension (gecko/)

✅ **Fully Implemented**

A complete Firefox extension that allows you to:
- Select JSON text on any webpage
- Right-click and choose "View Formatted JSON"
- View beautifully formatted JSON with syntax highlighting in a sidebar
- Search within the formatted JSON
- Navigate between search matches

**Quick Start:**
```bash
cd gecko
# Generate icons (if not already created)
python3 create-icons.py
# Load in Firefox: about:debugging → This Firefox → Load Temporary Add-on → manifest.json
```

See [gecko/README.md](gecko/README.md) for detailed installation and usage instructions.

### Chromium Extension (chromium/)

🚧 **Reserved for Future Development**

This directory is reserved for a Chrome/Edge/Chromium version of the extension.

## Features

All extensions will implement:

1. ✅ Context menu integration ("View Formatted JSON")
2. ✅ JSON validation with error handling
3. ✅ Syntax highlighting (keys, strings, numbers, booleans, null)
4. ✅ Search functionality with match highlighting
5. ✅ Navigation between search results
6. ✅ Dark theme UI

## Development

Each extension directory contains its own README and developer documentation.

- **Firefox (gecko/)**: See [gecko/DEVELOPER_GUIDE.md](gecko/DEVELOPER_GUIDE.md)
- **Chromium (chromium/)**: Coming soon

## Requirements

Original requirements are documented in [requirements.md](requirements.md).

## License

See [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.
