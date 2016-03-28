var AzbnExt = function(param) {
	
	this.__tabs = {};
	
	var ctrl = this;
	
	this.setTab = function(name, url, tab) {
		if(ctrl.__tabs[name]) {
			
		} else {
			ctrl.__tabs[name] = {};
		}
		ctrl.__tabs[name][url] = tab;
	};
	
	this.unsetTab = function(name, url, tab) {
		if(ctrl.__tabs[name]) {
			if(ctrl.__tabs[name][url]) {
				delete ctrl.__tabs[name][url];
			}
		} else {
			
		}
	};
	
	this.getTab = function(name, url) {
		if(ctrl.__tabs[name]) {
			var _name = ctrl.__tabs[name];
			
			if(_name[url]) {
				return _name[url];
			} else {
				return null;
			}
		} else {
			return null;
		}
	};
	
	this.lenTab = function(name) {
		var c = 0;
		if(ctrl.__tabs[name]) {
			for(var k in ctrl.__tabs[name]) {
				c++;
			}
		}
		return c;
	};
	
	this.notify = function(notify) {
		//https://developer.chrome.com/apps/notifications#type-NotificationOptions
		chrome.notifications.create(AzbnExtCfg.id, {
			type : 'basic',
			iconUrl : 'img/logo.png',
			title : notify.title,
			message : notify.preview,
			isClickable : true,
		}, function(n_id){
			
		});
	}
	
}