# JSON Formatter - Chromium Extension

🚧 **This extension is reserved for future development**

This directory will contain the Chrome/Edge/Chromium version of the JSON Formatter extension.

## Planned Features

- Context menu integration for selected JSON text
- JSON validation and formatting
- Syntax highlighting with dark theme
- Search functionality within formatted JSON
- Side panel UI (Chrome's equivalent to Firefox's sidebar)

## Development Status

The Chromium version is planned for future development. The Firefox (gecko) version is fully implemented and can serve as a reference for the Chromium implementation.

## Key Differences from Firefox Version

When implementing the Chromium version, consider:

1. **Manifest Version**: Chrome uses Manifest V3 (vs Firefox's V2/V3)
2. **Background Scripts**: Service workers in Chrome vs persistent background pages in Firefox
3. **Sidebar**: Chrome uses Side Panel API (Chrome 114+) vs Firefox's sidebar action
4. **Browser API**: Use `chrome.*` API namespace (with compatibility for `browser.*` via polyfill)
5. **Permissions**: Some permission names differ between browsers

## Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Side Panel API](https://developer.chrome.com/docs/extensions/reference/sidePanel/)

---

For the working Firefox version, see [../gecko/README.md](../gecko/README.md)
