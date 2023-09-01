const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')

const UpgradeScripts = require('./src/upgrades')

const configFields = require('./src/configFields');
const api = require('./src/api');
const actions = require('./src/actions');
const variables = require('./src/variables');
const feedbacks = require('./src/feedbacks');
const presets = require('./src/presets');

class GenericPingInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...configFields,
			...api,
			...actions,
			...variables,
			...feedbacks,
			...presets,			
		})

		this.INTERVAL = null;

		this.alive = '';
		this.min = '';
		this.max = '';
		this.avg = '';
		this.packetLoss = '';
		this.lastping = '';

		this.PING_INTERVAL = null;
		this.STOP_PING = false;
	}

	async init(config) {
		this.configUpdated(config);
	}

	async configUpdated(config) {
		this.config = config

		this.initActions();
		this.initFeedbacks();
		this.initVariables();
		this.initPresets();

		this.checkVariables();
		this.checkFeedbacks();

		this.updateStatus(InstanceStatus.Ok);

		if (this.config.host && this.config.host !== '') {
			if (this.PING_INTERVAL) {
				this.stopPing();
			}

			this.updateStatus(InstanceStatus.UnknownWarning);

			this.STOP_PING = false;
			this.startPing();
		}
	}

	async destroy() {
		//close out any connections
		this.stopPing();

		this.debug('destroy', this.id);
	}
}

runEntrypoint(GenericPingInstance, UpgradeScripts)