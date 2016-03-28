var storage = chrome.storage.local;

function saveRepoList(event) {
	event.preventDefault();
	
	var f = $(this);
	var ta = f.find('textarea[name="repolist"]');
	var list = ta.val().split("\n");
	var _list = {};
	for(var i = 0; i < list.length; i++) {
		var id = list[i].trim();
		var url_arr = id.split('/');
		var url = 'https://api.github.com/repos/' + url_arr[3] + '/' + url_arr[4] + '/commits';
		
		_list[id] = {
			id : id,
			url : url,
			last_commit : {},
		};
	}
	storage.set({'repolist' : _list});
}

function loadRepoList() {
	//event.preventDefault();
	
	var f = $('form');
	var ta = f.find('textarea[name="repolist"]');
	
	storage.get(null, function(list) {
		//ta.val(JSON.stringify(list.repolist));
		if(typeof list.repolist == 'object') {
			
			var _arr = [];
			
			$('.last_commit_list').empty();
			
			for(var k in list.repolist) {
				
				var id = list.repolist[k].id;
				_arr.push(id);
				
				if(typeof list.repolist[k].last_commit == 'object') {
					
					var lc = list.repolist[k].last_commit;
					$('.last_commit_list').append(
						'<p>' +
							'<b>' + id + '</b>' +
							'</p><p>' +
							lc.commit.committer.date +
							', ' +
							lc.commit.committer.email +
							'</p><p>' +
							lc.commit.message +
						'</p>'
						);
					
				}
				
			}
			
			ta.val(_arr.join("\n"));
		}
	});
}

$(document).ready(function(){
	
	loadRepoList();
	
	$(document.body).on('submit', 'form', {}, saveRepoList);
	
});