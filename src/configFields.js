module.exports = {
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module pings a remote host and updates Feedbacks and Variables accordingly.'
			},
			{
				type: 'textinput',
				id: 'host',
				width: 6,
				label: 'Host/IP Address',
				default: '192.168.0.1'
			},
			{
				type: 'number',
				id: 'timeout',
				width: 6,
				label: 'Ping Timeout (in seconds)',
				default: 10,
			},
			{
				type: 'number',
				id: 'retryrate',
				width: 6,
				label: 'Retry Rate (in ms) (How soon to try again)',
				default: 60000,
			},
			{
				type: 'static-text',
				id: 'dummy2',
				width: 12,
				label: ' ',
				value: ' ',
			},
			{
				type: 'checkbox',
				id: 'verbose',
				label: 'Enable Verbose Logging',
				default: false
			}
		]
	},
}
