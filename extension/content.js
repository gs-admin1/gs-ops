// // content.js
// const articles = Array.from(document.querySelectorAll('article')).map(article => article.innerText);

// chrome.runtime.sendMessage({ type: 'ARTICLES_FETCHED', articles });

// content.js
const pageContent = document.body.innerText;

chrome.runtime.sendMessage({ type: 'PAGE_CONTENT_FETCHED', content: pageContent });