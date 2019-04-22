console.log("background: ");
window.word = "";
let name = document.getElementsByTagName('h1');
/* chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });
  });*/
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log(`tab ::: ${JSON.stringify(tab.url)}`);
    window.url = tab.url;
    if (tab.url.includes('linkedin.com')) {
        window.url = tab.url;
        console.log(`tab ::: ${JSON.stringify(tab.url)}`);
    }
});

// chrome.runtime.onMessage.addListener(receiver);
// function receiver(req,sender,sendResponse){
// 	console.log(req);
// 	window.word = req.text;
//     window.userName = req.userName;
// }