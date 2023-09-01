const { InstanceStatus } = require('@companion-module/base')

const ping = require('ping');

module.exports = {
	startPing() {		
		const host = this.config.host;
		const timeout = this.config.timeout;

		const retryrate = this.config.retryrate;
		
		if (this.PING_INTERVAL == null) {
			sendPing.bind(this)(host, timeout, retryrate);
		}		
	},

	sendCustomPing(host, timeout, customVariable, aliveText, failText) {
		sendCustomPing.bind(this)(host, timeout, customVariable, aliveText, failText);
	},

	stopPing() {
		this.log('info', 'Stopping Ping.');
		clearInterval(this.PING_INTERVAL);
		this.PING_INTERVAL = null;
		this.STOP_PING = true;		
	}
}

async function sendPing(host, timeout, retryrate) {
	let self = this;

	try {
		if (self.config.verbose) {
			self.log('debug', 'Sending Ping to ' + host);
		}

		if (retryrate == 0) {
			self.log('info', 'Retry Rate is 0. Module will send one ping, and then stop.');
		}

		let res = await ping.promise.probe(host, {
			timeout: timeout
		});
		
		self.alive = res.alive;

		if (self.config.verbose) {
			self.log('debug', 'Ping Output: ' + res.output);
		}		

		self.min = res.min;
		self.max = res.max;
		self.avg = res.avg;
		self.packetLoss = res.packetLoss;
		self.lastping = new Date();

		if (res.alive == true) {
			self.updateStatus(InstanceStatus.Ok);
		}
		else if (res.alive == false) {
			self.updateStatus(InstanceStatus.ConnectionFailure);
			self.log('error', 'Host is not alive.');
		}
		else {
			self.updateStatus(InstanceStatus.UnknownError);
		}

		self.checkVariables();
		self.checkFeedbacks();

		if (self.STOP_PING || retryrate == 0) {
			clearInterval(this.PING_INTERVAL);
			self.PING_INTERVAL = null;
		}
		else if (retryrate > 0) {
			self.PING_INTERVAL = setTimeout(sendPing.bind(self), retryrate, host, timeout, retryrate);
		}		
	}
	catch(error) {
		self.log('error', 'Error pinging: ' + error);
	}
}

async function sendCustomPing(host, timeout, customVariable, aliveText, failText) {
	let self = this;

	try {
		if (self.config.verbose) {
			self.log('debug', 'Sending Custom Ping to ' + host);
		}

		let res = await ping.promise.probe(host, {
			timeout: timeout
		});

		if (res.alive == true) {
			self.setCustomVariableValue(customVariable, aliveText);
		}
		else if (res.alive == false) {
			self.log('error', 'Custom Ping Host is not alive: ' + host);
			self.setCustomVariableValue(customVariable, failText);
		}
		else {
			self.log('error', 'Other Error with Custom Ping');
			self.setCustomVariableValue(customVariable, 'Error');
		}

		if (self.config.verbose) {
			self.log('debug', 'Custom Ping Output: ' + res.output);
		}

		self.checkVariables();
		self.checkFeedbacks();
	}
	catch(error) {
		self.log('error', 'Error pinging: ' + error);
	}
}