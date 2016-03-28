"# chrome-ext-test" 

Права расширений
http://chrome-ext.blogspot.ru/2014/02/blog-post_19.html


/*
Простой вариант работы с сообщениями

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(sender.tab ? "from a content script: " + sender.tab.url : "from the extension");
	console.log(request);
	sendResponse({msg : 'azbn_test_response'});
});

chrome.runtime.sendMessage({msg : 'azbn_test'}, function(response) {
	console.log(response);
});
*/


/*
Событие изменения DOM

$('#page_layout #page_body').bind("DOMSubtreeModified",function(){
	
});
*/


/*
Устанавливаем значение на значке

chrome.browserAction.setBadgeText({text : '' + Azbn.lenTab(AzbnExtCfg.id),});
*/