module.exports = {
	initVariables() {
		let variables = [
			{ name: 'Host', variableId: 'host'},
			{ name: 'Alive State', variableId: 'alive'},
			{ name: 'Response Time (Min)', variableId: 'response_time_min'},
			{ name: 'Response Time (Max)', variableId: 'response_time_max'},
			{ name: 'Response Time (Avg)', variableId: 'response_time_avg'},
			{ name: 'Packet Loss %', variableId: 'packet_loss'},
			{ name: 'Last Date/Time Ping', variableId: 'last_ping'}
		]

		this.setVariableDefinitions(variables);
	},

	checkVariables() {
		try {
			let variableObj = {};

			variableObj['host'] = this.config.host;
			variableObj['alive'] = (this.alive ? 'True' : 'False');
			variableObj['response_time_min'] = this.min;
			variableObj['response_time_max'] = this.max;
			variableObj['response_time_avg'] = this.avg;
			variableObj['packet_loss'] = this.packetLoss;
			variableObj['last_ping'] = this.lastping;

			this.setVariableValues(variableObj);
		}
		catch(error) {
			//do something with that error
			if (this.config.verbose) {
				this.log('debug', 'Error Updating Variables: ' + error);
			}
		}
	}
}