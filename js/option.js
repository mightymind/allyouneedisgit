var storage = chrome.storage.local;

function saveRepoList(event) {
	event.preventDefault();
	
	var f = $(this);
	var ta = f.find('textarea[name="repolist"]');
	var list = ta.val().split("\n");
	for(var i = 0; i < list.length; i++) {
		var id = list[i].trim();
		var url_arr = id.split('/');
		var url = 'https://api.github.com/repos/' + url_arr[3] + '/' + url_arr[4] + '/commits';
		
		list[id] = {
			id : id,
			url : url,
			last_commit : {},
		};
	}
	storage.set({repolist : list});
}

function loadRepoList() {
	//event.preventDefault();
	
	var f = $(this);
	var ta = f.find('textarea[name="repolist"]');
	
	storage.get('repolist', function(list) {
		for(var i = 0; i < list.length; i++) {
			list[i] = list[i].id;
		}
		ta.val(list.join("\n"));
	});
}

$(document).ready(function(){
	
	loadRepoList();
	
	$(document.body).on('submit', 'form', {}, saveRepoList);
	
});