// src/background.ts

console.log("Background script running");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "HELLO") {
    console.log("Received hello message from content script");
    sendResponse({ message: "Hello from background script" });
  }
});