var AzbnExt = function(param) {
	
	var ctrl = this;
	
	this.now = function() {
		return new Date().getTime();
	};
	
	this.sleep = function(milliSeconds) {
		var startTime = this.now();
		while (this.now() < startTime + milliSeconds);
	};
	
}