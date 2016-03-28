var background_onMessage = function(tab, url, msg) {
	
	console.log(msg);
	
	if(msg.action) {
		
		Azbn.notify({
			title : AzbnExtCfg.id,
			preview : msg.action,
		});
		
		switch(msg.action) {
			
			case 'document.ready':{
				console.log('Page ' + url + ' is ready');
			}
			break;
			
			case 'ping':{
				tab.postMessage({action:'pong',});
			}
			break;
			
			default: {
				
			}
			break;
			
		}
		
	}
	
}