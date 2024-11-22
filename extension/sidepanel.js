// sidepanel.js
// function displayArticles(articles) {
//     const articlesDiv = document.getElementById('articles');
//     articlesDiv.innerHTML = ''; // Clear previous articles
//     articles.forEach(article => {
//         const articleElement = document.createElement('div');
//         articleElement.textContent = article;
//         articlesDiv.appendChild(articleElement);
//     });
// }

// // chrome.runtime.sendMessage({ type: 'GET_ARTICLES' }, response => {
// //     displayArticles(response.articles);
// // });

// document.getElementById('print-articles').addEventListener('click', () => {
//     chrome.runtime.sendMessage({ type: 'GET_ARTICLES' }, response => {
//         displayArticles(response.articles);
//     });
// });

// All content
function displayContent(content) {
    const contentDiv = document.getElementById('articles');
    contentDiv.innerHTML = ''; // Clear previous content
    const contentElement = document.createElement('div');
    contentElement.textContent = content;
    contentDiv.appendChild(contentElement);
}

// Fetch and display content when the side panel is loaded
chrome.runtime.sendMessage({ type: 'GET_PAGE_CONTENT' }, response => {
    displayContent(response.content);
});

// Fetch and display content when the button is clicked
document.getElementById('print-articles').addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'GET_PAGE_CONTENT' }, response => {
        displayContent(response.content);
    });
});