var background_onAlarm = function(alarm) {
	
	//console.log(alarm);
	var storage = chrome.storage.local;
	
	if(alarm.name != '') {
		
		switch(alarm.name) {
			
			case 'git_commits':{
				
				storage.get('repolist', function(list) {
					
					for(var i = 0; i < list.length; i++) {
						var repo = list[i];
						if(repo.id && repo.id != '' && repo.url != '') {
							
							$.getJSON(repo.url, {},
								function(data){
									
									if(data.length > 0) {
										var last = data[0];
										
										if(repo.last_commit.sha.indexOf(last.sha)) {
											
										} else {
											
											Azbn.notify({
												title : last.commit.committer.email,
												preview : last.commit.message,
											});
											
											repo.last_commit = last;
											
											storage.set({repolist : list});
										}
										
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