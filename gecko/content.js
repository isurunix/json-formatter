// Content script to handle text selection
// This script runs on all web pages

// Listen for messages from the sidebar
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_SELECTION") {
    const selection = window.getSelection().toString();
    sendResponse({ selection: selection });
  }
  return true;
});

// Optional: Add keyboard shortcut handling or other interactive features
console.log("JSON Formatter content script loaded");
