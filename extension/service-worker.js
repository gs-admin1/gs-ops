const GOOGLE_ORIGIN = 'https://www.google.com';

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// // service-worker.js
// let articles = [];

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'ARTICLES_FETCHED') {
//         articles = message.articles;
//         console.log(articles);
//     }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'GET_ARTICLES') {
//         sendResponse({ articles });
//     }
// });

// let pageContent = '';

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'PAGE_CONTENT_FETCHED') {
//         pageContent = message.content;
//     }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'GET_PAGE_CONTENT') {
//         sendResponse({ content: pageContent });
//     }
// });

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === 'complete' && tab.active) {
//         chrome.scripting.executeScript({
//             target: { tabId: tabId },
//             files: ['content.js']
//         });
//     }
// });

// function fetchContentFromActiveTab() {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         if (tabs.length > 0) {
//             chrome.scripting.executeScript({
//                 target: { tabId: tabs[0].id },
//                 files: ['content.js']
//             });
//         }
//     });
// }

// chrome.tabs.onActivated.addListener(fetchContentFromActiveTab);
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === 'complete' && tab.active) {
//         fetchContentFromActiveTab();
//     }
// });