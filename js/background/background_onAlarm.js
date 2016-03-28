var background_onAlarm = function(alarm) {
	
	//console.log(alarm);
	var local = chrome.storage.local;
	
	if(alarm.name != '') {
		
		switch(alarm.name) {
			
			case 'git_commits':{
				
				console.log('git_commits');
				
				local.get(function(list) {
					
					for(var k in list.repolist) {
						
						var repo = list.repolist[k] || {};
						
						if(repo.id != '' && repo.url != '') {
							
							//console.log(repo.id);
							
							$.getJSON(repo.url, {},
								function(data){
										
										var last = data[0];
										
										if(typeof repo.last_commit.sha == 'string') {
											
											if(last.sha.indexOf(repo.last_commit.sha) > -1) {
												
											} else {
												
												Azbn.notify({
													title : repo.id,
													preview : last.commit.committer.email + ': ' + last.commit.message,
												});
												
											}
											
										} else {
											
											Azbn.notify({
												title : repo.id,
												preview : last.commit.committer.email + ': ' + last.commit.message,
											});
											
										}
										
										//repo.last_commit = {};
										repo.last_commit = last;
										
										local.set({repolist : list.repolist}, function(){
											console.log(list.repolist);
										});
										
								}
							);
							
						}
						
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