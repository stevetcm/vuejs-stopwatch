var timeBegan = null, 
	timePaused = null, 
	pausedDuration = 0, 
	started = null, 
	running = false;

new Vue({
	el: '#section-stopwatch',
	data: {
		mtoggle: 'START',
		time: '00:00:00.000'
	},
	methods: {
		start() {
			if (running) {
				this.mtoggle = "RESUME";
				running = false;
				timePaused = new Date();
				clearInterval(started);
			} else {
				if (timeBegan == null) {
					this.reset();
					timeBegan = new Date();
				}

				if (timePaused != null) {
					pausedDuration += (new Date() - timePaused);
				}

				started = setInterval(this.clockRunning, 10);

				this.mtoggle = "PAUSE";
				running = true;
			};	
		},
		reset() {
			this.mtoggle = "START";
			running = false;
			clearInterval(started);
			pausedDuration = 0;
			timeBegan = null;
			timePaused = null;
      		this.time = "00:00:00.000";
		},
		clockRunning() {
			var current = new Date(),
			elapsed = new Date(current - timeBegan - pausedDuration),
			hour = elapsed.getUTCHours(),
			minute = elapsed.getUTCMinutes(),
			second = elapsed.getUTCSeconds(),
			millisecond = elapsed.getUTCMilliseconds();

			this.time = this.prefix(hour, 2) + ":" +
			this.prefix(minute, 2) + ":" +
			this.prefix(second, 2) + "." +
			this.prefix(millisecond, 3);
		},
		prefix(num, length) {
			var zeroes = '';
			for (var i = 0; i < length - num.toString().length; i++) {
				zeroes += '0';
			}

			return zeroes + num;
		}
	}
});
