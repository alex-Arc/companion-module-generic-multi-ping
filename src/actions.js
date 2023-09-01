module.exports = {

	initActions() {
		let self = this; // required to have reference to outer `this`
		let actions = {};

		actions.startPing = {
			name: 'Start Ping Interval',
			options: [],
			callback: function(action, bank) {
				self.STOP_PING = false;
				self.startPing();
			}
		};

		actions.stopPing = {
			name: 'Stop Ping Interval',
			options: [],
			callback: function(action, bank) {
				self.stopPing();
			}
		};

		actions.sendCustomPing = {
			name: 'Ping a Custom Host',
			options: [
				{
					type: 'textinput',
					label: 'Host',
					description: 'Host to Ping. Accepts variables',
					id: 'host',
					default: '',
					useVariables: true
				},
				{
					type: 'number',
					label: 'Timeout (in seconds)',
					description: 'Timeout in seconds',
					id: 'timeout',
					default: 10,
					min: 1,
					max: 20,
					range: false,
					required: true,
					regex: self.REGEX_NUMBER
				},
				{
					type: 'custom-variable',
					label: 'Custom Variable to send ping result into',
					id: 'customVariable',
				},
				{
					type: 'textinput',
					label: 'Alive Text',
					description: 'Text to send to Custom Variable if host is alive',
					id: 'aliveText',
					default: 'Alive',
					useVariables: true
				},
				{
					type: 'textinput',
					label: 'Fail Text',
					description: 'Text to send to Custom Variable if host is not alive',
					id: 'failText',
					default: 'Not Alive',
					useVariables: true
				}
			],
			callback: async function (action) {
				let host = await self.parseVariablesInString(action.options.host)
				let aliveText = await self.parseVariablesInString(action.options.aliveText)
				let failText = await self.parseVariablesInString(action.options.failText)

				self.sendCustomPing(host, action.options.timeout, action.options.customVariable, aliveText, failText);
			}
		};

		self.setActionDefinitions(actions);
	},
}
