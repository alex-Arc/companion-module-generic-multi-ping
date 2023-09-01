const { combineRgb } = require('@companion-module/base')

module.exports = {
    // ##########################
    // #### Define Feedbacks ####
    // ##########################
    initFeedbacks() {
        let self = this;
        const feedbacks = {};

        const foregroundColorWhite = combineRgb(255, 255, 255) // White
        const foregroundColorBlack = combineRgb(0, 0, 0) // Black
        const backgroundColorRed = combineRgb(255, 0, 0) // Red
        const backgroundColorGreen = combineRgb(0, 255, 0) // Green
        const backgroundColorOrange = combineRgb(255, 102, 0) // Orange

        feedbacks['aliveState'] = {
            type: 'boolean',
            name: 'Show Host Alive State On Button',
            description: 'Indicate if Host is Alive or Not Alive',
            style: {
                color: foregroundColorWhite,
                bgcolor: backgroundColorRed,
            },
            options: [
                {
                    type: 'dropdown',
                    label: 'Indicate in X Status',
                    id: 'state',
                    default: 0,
                    choices: [
						{ id: false, label: 'Not Alive' },
                        { id: true, label: 'Alive' },
                    ]
                }
            ],
            callback: function (feedback) {
                let opt = feedback.options;

				if (self.alive == opt.state) {
					return true;
				}

                return false;
            }
        }

        self.setFeedbackDefinitions(feedbacks);
    }
}