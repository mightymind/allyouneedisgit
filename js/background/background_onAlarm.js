var background_onAlarm = function(alarm) {
	
	//console.log(alarm);
	var local = chrome.storage.local;
	
	if(alarm.name != '') {
		
		switch(alarm.name) {
			
			case 'git_commits':{
				
				local.get(function(list) {
					
					for(var k in list.repolist) {
						
						var r = list.repolist[k] || {};
						
						(function(repo) {
							
							if(repo.id != '' && repo.url != '') {
								
								$.getJSON(repo.url, {},
									function(data){
											
											var last = data[0];
											
											if(typeof repo.last_commit.sha == 'string') {
												
												if(last.sha.indexOf(repo.last_commit.sha) > -1) {
													
												} else {
													
													chrome.notifications.create(AzbnExtCfg.id + '@' + last.html_url, {
														type : 'basic',
														iconUrl : 'img/logo.png',
														title : repo.user + '/' + repo.repo,
														message : last.commit.committer.email + ': ' + last.commit.message,
														isClickable : true,
													}, function(n_id){
														
													});
													
												}
												
											} else {
												
												chrome.notifications.create(AzbnExtCfg.id + '@' + last.html_url, {
													type : 'basic',
													iconUrl : 'img/logo.png',
													title : repo.user + '/' + repo.repo,
													message : last.commit.committer.email + ': ' + last.commit.message,
													isClickable : true,
												}, function(n_id){
													
												});
												
											}
											
											repo.last_commit = last;
											
											local.set({repolist : list.repolist}, function(){
												
											});
											
									}
								);
								
							}
							
						})(r);
						
					}
					
				});
				
			}
			break;
			
			default: {
				
			}
			break;
			
		}
		
	}
	
}