
var Azbn = new AzbnExt();

chrome.alarms.onAlarm.addListener(function(alarm) {
	background_onAlarm(alarm);
});
 
chrome.alarms.create('git_commits', {
	delayInMinutes: 0.1,
	periodInMinutes: 5,
});

chrome.notifications.onClicked.addListener(function(n_id){
	
	n_id_arr = n_id.split('@');
	
	if(n_id_arr[0] == AzbnExtCfg.id) {
		chrome.tabs.create({active: true, url: n_id_arr[1]});
	}
	
});