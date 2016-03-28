
var Azbn = new AzbnExt();

chrome.alarms.onAlarm.addListener(function(alarm) {
	background_onAlarm(alarm);
});
 
chrome.alarms.create('git_commits', {
	delayInMinutes: 0.1,
	periodInMinutes: 2,
});
