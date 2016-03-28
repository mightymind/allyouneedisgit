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
			user : url_arr[3],
			repo : url_arr[4],
			last_commit : {},
		};
	}
	storage.set({'repolist' : _list}, function(){
		$('.save-notify').html(chrome.i18n.getMessage('ui_save_notify'));
		setTimeout(function(){
			$('.save-notify').html('');
		},3000);
	});
}

function loadRepoList() {
	//event.preventDefault();
	
	var f = $('form');
	var ta = f.find('textarea[name="repolist"]');
	
	$('form input[type="submit"]').val(chrome.i18n.getMessage('ui_save_btn'));
	
	storage.get(null, function(list) {
		//ta.val(JSON.stringify(list.repolist));
		
		$('.last_commit_list').empty();
		
		if(typeof list.repolist == 'object') {
			
			var _arr = [];
			
			for(var k in list.repolist) {
				
				var repo = list.repolist[k];
				var id = repo.id;
				_arr.push(id);
				
				if(repo.last_commit.sha) {
					if(typeof repo.last_commit.sha == 'string') {
						
						var lc = repo.last_commit;
						$('.last_commit_list').append(
							'<p>' +
								'<b>' + repo.user + '/' + repo.repo + '</b>' +
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
				
			}
			
			ta.val(_arr.join("\n"));
		}
	});
}

$(document).ready(function(){
	
	loadRepoList();
	
	$(document.body).on('submit', 'form', {}, saveRepoList);
	
});