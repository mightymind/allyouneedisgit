var background_onAlarm = function(alarm) {
	
	//console.log(alarm);
	var storage = chrome.storage.local;
	
	if(alarm.name != '') {
		
		switch(alarm.name) {
			
			case 'git_commits':{
				
				console.log('git_commits');
				
				storage.get(null, function(list) {
					
					for(var k in list.repolist) {
						
						var repo = list.repolist[k];
						
						if(repo.id != '' && repo.url != '') {
							
							$.getJSON(repo.url, {},
								function(data){
									
									console.log(data);
									
									if(data.length > 0) {
										var last = data[0];
										var need = true;
										
										if(repo.last_commit.sha) {
											
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
										
										repo.last_commit = last;
										
										storage.set({repolist : list.repolist});
										
									}
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