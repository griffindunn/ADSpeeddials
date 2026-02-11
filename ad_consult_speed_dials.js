import {Desktop} from "@wxcc-desktop/sdk";

export const logger = Desktop.logger.createLogger("cisco-conference-speed-dial");

export default class InfoCard extends HTMLElement {
    buttonStateMap = null;
    initialized = false;
    lastButtonPressTime = 0;
    latestCallState = 'unknown';

    constructor() {
        super();

        // **STEP (1)** //
        logger.info('lee-health-wxcc-consult-buttons version 1.0')
        logger.info("JS Step 1 - attachShadow")
        this.attachShadow({mode: "open"});
        logger.debug('Requesting Button Map Update from background process in constructor... ')
    }

    async connectedCallback() {
        logger.debug('*/*/*/*/*/*/*/*/*/*/*/*/*/*/ Connected Callback */*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/');
        logger.debug("connectedCallback in UI Widget");

        if (this.initialized === false) {
            logger.debug('Not previously initialized - doing Desktop.config.init()')
            await Desktop.config.init();
        } else {
            logger.debug('Previously initialized - skipping Desktop.config.init()')
            this.removeButtonPressListener();
        }

        logger.debug("Removing Old Event Listeners")
        this.removeListeners();
        logger.debug("Initializing Event Listeners")
        this.initListeners();

        logger.debug("Adding Button Press Listener")
        this.addButtonPressListener();
        logger.debug("Getting Call State")
        this.latestCallState = await this.getCallState();

        logger.debug("Rendering template")
        this.render();

        this.initialized = true;
    }

    async disconnectedCallback() {
        logger.debug('*/*/*/*/*/*/*/*/*/*/*/*/*/*/ Disconnected Callback */*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/')
        this.removeButtonPressListener();
        this.removeListeners();
        logger.debug("disconnectedCallback in UI Widget");

    }

    initListeners() {
        logger.info('Adding WebexCC Event Listeners')
        Desktop.agentContact.addEventListener("eAgentContact", msg => this.logEvent(msg, "eAgentContact"));
        Desktop.agentContact.addEventListener("eAgentContactAssigned", msg => this.logEvent(msg, "eAgentContactAssigned"));
        Desktop.agentContact.addEventListener("eAgentContactAssignFailed", msg => this.logEvent(msg, "eAgentContactAssignFailed"));
        Desktop.agentContact.addEventListener("eAgentContactEnded", msg => this.logEvent(msg, "eAgentContactEnded"));
        Desktop.agentContact.addEventListener("eAgentContactWrappedUp", msg => this.logEvent(msg, "eAgentContactWrappedUp"));
        Desktop.agentContact.addEventListener("eAgentOfferContact", msg => this.logEvent(msg, "eAgentOfferContact"));
        Desktop.agentContact.addEventListener("eAgentOfferContactRona", msg => this.logEvent(msg, "eAgentOfferContactRona"));
        Desktop.agentContact.addEventListener("eAgentOfferConsult", msg => this.logEvent(msg, "eAgentOfferConsult"));
        Desktop.agentContact.addEventListener("eAgentWrapup", msg => this.logEvent(msg, "eAgentWrapup"));
        Desktop.agentContact.addEventListener("eAgentContactHeld", msg => this.logEvent(msg, "eAgentContactHeld"));
        Desktop.agentContact.addEventListener("eAgentContactUnHeld", msg => this.logEvent(msg, "eAgentContactUnHeld"));
        Desktop.agentContact.addEventListener("eConsultTransfer", msg => this.logEvent(msg, "eConsultTransfer"));
        Desktop.agentContact.addEventListener("eAgentConsultCreated", msg => this.logEvent(msg, "eAgentConsultCreated"));
        Desktop.agentContact.addEventListener("eAgentConsultConferenced", msg => this.logEvent(msg, "eAgentConsultConferenced"));
        Desktop.agentContact.addEventListener("eAgentConsultEnded", msg => this.logEvent(msg, "eAgentConsultEnded"));
        Desktop.agentContact.addEventListener("eAgentConsultConferenceEnded", msg => this.logEvent(msg, "eAgentConsultConferenceEnded"));
        Desktop.agentContact.addEventListener("eAgentConsulting", msg => this.logEvent(msg, "eAgentConsulting"));
        Desktop.agentContact.addEventListener("eAgentConsultFailed", msg => this.logEvent(msg, "eAgentConsultFailed"));
        Desktop.agentContact.addEventListener("eAgentConsultEndFailed", msg => this.logEvent(msg, "eAgentConsultEndFailed"));
        Desktop.agentContact.addEventListener("eAgentConsultConferenceEndFailed", msg => this.logEvent(msg, "eAgentConsultConferenceEndFailed"));
        Desktop.agentContact.addEventListener("eParticipantLeftConference", msg => this.logEvent(msg, "eParticipantLeftConference"));
        Desktop.agentContact.addEventListener("eParticipantJoinedConference", msg => this.logEvent(msg, "eParticipantJoinedConference"));
        Desktop.agentContact.addEventListener("eContactUpdated", msg => this.logEvent(msg, "eContactUpdated"));
    }

    async logEvent(msg, event_name) {
        logger.debug('Start logEvent');
        // logger.debug('**************** CALL STATE *****************');
        // let call_state = await this.getCallState()
        // this.latestCallState = call_state;
        // logger.debug('Latest Call State: ' + this.latestCallState);
        // logger.debug('Updating Buttons')
        // await this.updateButtons(call_state)
        logger.debug(`************** LOGGING EVENT - ${event_name} ****************`);
        logger.debug(msg);
        let call_state = await this.getCallStateFromEvent(msg);

        if (call_state === 'terminated') {
            // Check that call is really terminated
            call_state = await this.getCallState();
        }
        logger.debug('Updating Buttons')
        await this.updateButtons(call_state)
        logger.debug("*********************************************");
    }

    removeListeners() {
        logger.info('Removing WebexCC Event Listeners');
        Desktop.agentContact.removeAllEventListeners();
    }

    async getCallState() {
        const details = this.details;
        const call_interaction_id = await this.getInteractionId()
        logger.debug(`Getting Call State for interaction id ${call_interaction_id}`)

        let call_state = 'unknown'
        let interaction_type = 'unknown'

        for (const [interaction_id, interaction_data] of Object.entries(details.toJSON())) {
            logger.debug("getCallState - Dumping Interaction Data for interaction_id " + interaction_id);
            logger.debug(interaction_data)

            if (interaction_id === call_interaction_id) {
                logger.debug(`Found Interaction Data for id ${call_interaction_id}`)

                const owner = interaction_data.interaction.owner;
                logger.debug(`interaction_owner is ${owner}`);

                if (interaction_data.interaction.isTerminated === true) {
                    call_state = 'terminated'
                } else if (owner === null) {
                    call_state = 'wrapup'
                } else {
                    call_state = interaction_data.interaction.state;
                }

                interaction_type = interaction_data.type;
                logger.debug('interaction_type = ' + interaction_type)

                switch (interaction_type) {
                    case 'AgentConsultCreated':
                        call_state = 'consulting';
                        break;
                    case 'AgentConsulting':
                        call_state = 'consulting';
                        break;
                    case 'AgentConsultConferenced':
                         let owner_participant_data = interaction_data.interaction.participants[owner];
                         let consult_state = owner_participant_data.consultState;
                         if (consult_state === 'consultInitiated') {
                             call_state = 'consulting';
                         }
                         break;
                    case 'AgentWrapup':
                        call_state = 'wrapup';
                        break;
                }
            }
        }

        logger.debug(`*********** Returning call_state: ${call_state}`);

        return call_state
    }

    async getCallStateFromEvent(msg) {
        const call_interaction_id = await this.getInteractionId()
        const agent_id = this.agent_id;
        const selected_task = this.selected_task;

        logger.debug('call_interaction_id = ' + call_interaction_id)
        logger.debug('agent id = ' + agent_id)
        logger.debug('selected task dump:')
        logger.debug(selected_task)

        let call_state = 'unknown'

        if (call_interaction_id === undefined) {
            logger.debug('Getting Call State From Event - No call interaction id found - returning unknown')
        } else {
            logger.debug(`Getting Call State From Event for interaction id ${call_interaction_id}`)

            let interaction_type = 'unknown'

            logger.debug("getCallStateFromEvent - Dumping Interaction Data for interaction_id " + call_interaction_id);

            let interaction_data = msg.data.interaction;

            logger.debug(interaction_data)

            const owner = interaction_data.owner;
            logger.debug(`interaction_owner is ${owner}`);
            logger.debug(`isTerminated = ${interaction_data.isTerminated}`)
            logger.debug(`state = ${interaction_data.state}`)
            logger.debug('relationshipType = ' + interaction_data.callProcessingDetails.relationshipType)

            if (interaction_data.isTerminated === true) {
                call_state = 'terminated'
            } else if (owner === null) {
                call_state = 'wrapup'
            } else {
                call_state = interaction_data.state;
            }

            logger.debug('provisional call state = ' + call_state)

            interaction_type = msg.data.type;
            logger.debug('interaction_type = ' + interaction_type)

            switch (interaction_type) {
                case 'AgentConsultCreated':
                    call_state = 'consulting';
                    break;
                case 'AgentConsulting':
                    call_state = 'consulting';
                    break;
                case 'AgentWrapup':
                case 'AgentWrappedUp':
                    call_state = 'wrapup';
                    break;
            }

            // Look through dictionary of participants to see if any are in a consultState of "consulting" or "consultInitiated
            for (const [participant_id, participant_data] of Object.entries(interaction_data.participants)) {
                logger.debug('participant id = ' + participant_id)
                logger.debug('consultState = ' + participant_data.consultState)
                logger.debug('participant_data = ' + participant_data)
                if (participant_data.hasLeft === false && participant_data.isWrapUp === false) {
                    logger.debug('participant is still in call')
                    if ((participant_data.consultState === 'consulting') || (participant_data.consultState === 'consultInitiated')) {
                        logger.debug('participant is consulting')
                        call_state = 'consulting';
                    }
                }
            }

            if (interaction_data.state === "connected" &&
                interaction_data.callProcessingDetails.relationshipType === "consult" &&
                msg.data.reason !== "Consult_Transfer_To_EpDn") {
                call_state = 'consulting';
            }
        }



        logger.debug(`*********** Returning call_state: ${call_state}`);

        return call_state
    }
    getEmptyButtonMap() {
        return {
            button1: {
                display: 'none',
                disabled: true
            },
            button2: {
                display: 'none',
                disabled: true
            },
            button3: {
                display: 'none',
                disabled: true
            },
        }
    }

     addButtonPressListener() {
        document.documentElement.addEventListener("uiButtonPressEvent", this.buttonListener);
    }

    removeButtonPressListener() {
        document.documentElement.removeEventListener("uiButtonPressEvent", this.buttonListener);
    }


    async getInteractionId() {
        const currentTaskMap = await Desktop.actions.getTaskMap();
        for (const iterator of currentTaskMap) {
            return iterator[1].interactionId;
        }
    }

    async consultToDN(consultDNId) {
        logger.debug("consultToDN started");

        let holdParticipants = true;
        try {
            holdParticipants = this.holdParticipants;
        } catch (e) {
            logger.error("Error getting holdParticipants from config, defaulting to true.")
        }

        // For now just hard-coding holdParticipants to true until this API is officially supported
        holdParticipants = true;
        logger.debug("Hold Participants Setting: " + holdParticipants)

        let interactionId = await this.getInteractionId();
        let response = await Desktop.agentContact.consult({
            interactionId,
            data: {
                destinationType: "DN",
                destAgentId: consultDNId
            }
        });

        // When we want to support holdParticipants, we can use the following code:

        // let response = await Desktop.agentContact.consult({
        //     interactionId,
        //     data: {
        //         destinationType: "DN",
        //         destAgentId: consultDNId,
        //         holdParticipants: holdParticipants
        //     }
        // });

        logger.debug("consultToDN response: " + JSON.stringify(response));

        return response;
    }


    async processButtonPress(button_name, button_payload) {
        logger.debug(`Sending button click event for button ${button_name} with payload ${button_payload}`)
            logger.debug(`button name: ${button_name}, payload = ${button_payload}`);

        switch (button_name) {
            case 'button1':
            case 'button2':
            case 'button3':
                let currentTime = Date.now();
                let deltaTime = currentTime - this.lastButtonPressTime
                this.lastButtonPressTime = currentTime;
                // Only process button press if last button press was more than 5 seconds ago
                if (deltaTime > 5000) {
                    logger.debug(`Processing button press (${button_name}) - ${deltaTime}ms since last button press.`);
                    let consult_result = await this.consultToDN(button_payload);
                    logger.debug(consult_result);
                } else {
                    logger.error(`Ignoring button press (${button_name}) - only ${deltaTime}ms since last button press.`)
                }
                break;
        }
    }

    showConsultModal() {
        this.shadowRoot.getElementById('custom-interaction-control-transfer-modal').style.display = 'inline'
    }

    closeConsultModal() {
        this.shadowRoot.getElementById('custom-interaction-control-transfer-modal').style.display = 'none'
    }

    //Render on the DOM
    render() {
        // **STEP (2)** //
        logger.debug("JS Step 2 - create a const template");

        const template = document.createElement("template");

        // **STEP (3)** //
        logger.debug("JS Step 3 - attach template to innerHTML");

        let buttons = '';
        let button1_present = false;
        let button2_present = false;
        let button3_present = false;

        logger.debug("Attaching buttons to template");
        if (this.button1_name !== '' && this.button1_dn !== '') {
            logger.debug("Attaching Button 1");
            buttons += `<div class="interactionButtonHolder" id="button1_div"><md-tooltip class="md-tooltip" slot="false" placement="bottom" message="${this.button1_name}" disabled=""><md-button id='button1' arialabel="${this.button1_name}" ariahaspopup="true" size="40" maxwidth="160px" variant="secondary"><md-icon slot="icon" name="icon-headset_16"></md-icon><span class="interactionButtonText" slot="text">${this.button1_name}</span></md-button></md-tooltip></div>`;
            button1_present = true;
        }

        if (this.button2_name !== '' && this.button2_dn !== '') {
            logger.debug("Attaching Button 2");
            buttons += `<div class="interactionButtonHolder" id="button2_div"><md-tooltip class="md-tooltip" slot="false" placement="bottom" message="${this.button2_name}" disabled=""><md-button id='button2' arialabel="${this.button2_name}" ariahaspopup="true" size="40" maxwidth="160px" variant="secondary"><md-icon slot="icon" name="icon-headset_16"></md-icon><span class="interactionButtonText" slot="text">${this.button2_name}</span></md-button></md-tooltip></div>`;
            button2_present = true;
        }

        if (this.button3_name !== '' && this.button3_dn !== '') {
            logger.debug("Attaching Button 3");
            buttons += `<div class="interactionButtonHolder" id="button3_div"><md-tooltip class="md-tooltip" slot="false" placement="bottom" message="${this.button3_name}" disabled=""><md-button id='button3' arialabel="${this.button3_name}" ariahaspopup="true" size="40" maxwidth="160px" variant="secondary"><md-icon slot="icon" name="icon-headset_16"></md-icon><span class="interactionButtonText" slot="text">${this.button3_name}</span></md-button></md-tooltip></div>`;
            button3_present = true;
        }

        template.innerHTML = `
        <style>
            .container {
                background: var(--back, inherit)
            }
            .cards {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
                grid-auto-rows: auto;
                grid-gap: 1rem;
            }
                h1 {
                text-align: center;
                width: 100%;
                }
                /* User Card */
                .card {
                    border: 2px solid #BEBEBE;
                    border-radius: 10px;
                    padding: .5rem;
                    min-height: 150px;
                    max-height: 300px;
                    overflow: scroll;
                }
                img {
                    margin-top: 15px;
                    border-radius: 10px;
                    display: block;
                }		
                .hide {
                    display: none;
                }
                .show {
                    font-size: large;
                    padding-left:0;
                    display: block;
                }
                .btn {
                    border: none;
                    height: 36px;
                    width: 160px;
                    padding: 6px 18px;
                    border-radius: 20px;
                    background: #007AA3;
                    color: white;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .btn:hover{
                    background: #005E7D;
                    opacity: 1;
                }
                .italic{
                    font-style: oblique;
                    text-decoration: underline #FF3028;
                }
                .input{
                
                }
                .interactionButtonHolder {
                    display: none;
                    margin-left: 0.3125rem;
                }
                .md-button {
                    margin-top: 4px;
                    margin-left: 4px;
                }
                .md-button--40 {
                    margin-top: 4px;
                    margin-left: 4px;
                }
                .btn-group {
                    display: block;
                    margin-top: 4px;
                    padding: 4px;
                    /*justify-content: flex-end;*/
                }
                .interactionButtonText {
                    font-size: 14px;
                }
                                
                :host-context(.hiddenIcons) .cards {
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-auto-rows: auto;
                }
                :host-context(.hiddenIcons) .md-tooltip {
                    margin-bottom: 10px;
                }


                
        </style>
        <div class="container">
            <div class="cards">
                <div class="interaction-button-container">
                    <div class="btn-group">
                      ${buttons}
                    </div>
                </div>
            </div>
        </div>
        <div id="custom-interaction-control-transfer-modal" style="display: none;">
            <div class="s-custom-cms-ui">
              <style id="direflow_styles" type="text/css">.s-custom-cms-ui * {
                 --sandbox-bg-color-default: #e5e5e5; --border-width: 1px; --md-primary-bg-color-default: #ffffff; --md-secondary-bg-color-default: #f7f7f7; --md-secondary-white-bg-color-default: #ffffff; --md-tertiary-bg-color-default: #ededed; --md-quaternary-bg-color-default: #dedede; --defult-button-size: 36px; --md-primary-text-color-default: #121212; --md-secondary-text-color-default: #545454; --md-primary-seperator-color-default: #cccccc; --md-alert-warning-bg-color: #ffecc2; --border: 1px solid var(--md-primary-seperator-color, --md-primary-seperator-color-default); --blue-border: var(--border-width) solid var(--link-color); --red-border: var(--border-width) solid var(--red-color); --interaction-border-bottom: 8px solid var(--gray-30-color); --email-chat-min-width: 600px; --interaction-control-height: 67px; --top-header-height: 65px; --font-size-xlarge: 20px; --font-size-large: 16px; --font-size-medium: 14px; --font-size-small: 12px; --font-size-xsmall: 10px; --space-token-cardinal: 5px; --space-token-even: 2px; --padding-16: 16px; --padding-14: 14px; --padding-12: 12px; --padding-10: 10px; --padding-3: 3px; --conference-button-padding: 4px 8px 4px 4px; --left-spacing-16: 16px; --left-spacing-40: 40px; --margin-8: 8px; --margin-375rem: 0.375rem; --flex-only-two-columns: 50%; --font-weight-normal: 400; --font-weight-bold: 600; --font-family: 'CiscoSansTT Regular', 'Helvetica Neue', Helvetica, Arial, sans-serif; --font-family-light: 'CiscoSansTT Light', 'Helvetica Neue', Helvetica, Arial, sans-serif; --font-family-bold: 'CiscoSansTT Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif; --font-family-icons: 'momentum-ui-icons', sans-serif; --red-color: #ff5c4a; --orange-color: #d67f04; --red-60-color: #d93829; --red-70-color: #a12512; --red-20-color: #ffe1d9; --white-color: #fff; --black-color: #000; --blue-20-color: #b8f2ff; --link-color: #00a0d1; --grey-border: #f2f2f2; --grey-color: #d2d5d6; --green-color: #24ab31; --green-05-color: #edfaf4; --green-10-color: #befade; --green-20-color: #bcf7bf; --green-30-color: #31e88c; --gray-100-color: #171b1f; --gray-80-color: #3b3b3b; --gray-70-color: #535759; --gray-30-color: #d2d5d6; --gray-20-color: #f7f7f7; --gray-10-color: #f2f4f5; --background-color: transparent; --slate-60-color: #6f739e; --sub-header: #535759; --blue-05-color: #e6fbff; --blue-70-color: #005e7d; --brand-60-color: #007ea8; --disabled-lightui-color: #ededed; --disabled-text-color: #b2b2b2; --highlight-color: #737678; --violet-20-color: #f0e3fc; --yellow-20-color: #ffe6b3; --light-green-color: #44cf50; --dark-green-color: #03612c; --disabled-color: #e6e7e7; --red-30-color: #ffc7ba; --gold-color: #7d4705; --border-radius-small: 4px; --border-radius-medium: 8px; --border-radius-large: 10px; --border-radius-medium-top: 8px 8px 0 0; --border-radius-medium-bottom: 0 0 8px 8px; --common-box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.18), 0px 2px 4px rgba(0, 0, 0, 0.16); --simple-box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08); --focused-shadow: 0 0 4px 2px rgba(0, 160, 209, 0.75); --focused-momentum-shadow: 0 0 0 0.125rem var(--button-focus-ring-color, #007aa3); --focused-list-shadow: 0 0 0 0.125rem var(--button-focus-ring-color, #007aa3) inset; --ease-in-out-quint: cubic-bezier(0.83, 0, 0.17, 1); --default-animation-duration: 300ms; --quick-animation-duration: 150ms; --animation-slideIn: slideIn var(--default-animation-duration) var(--ease-in-out-quint) forwards; --animation-slideOut: slideOut var(--default-animation-duration) var(--ease-in-out-quint) forwards; --animation-fadeIn: fadeIn var(--quick-animation-duration) linear forwards; box-sizing: border-box;
                 }
                 @keyframes slideIn {
                     from {
                         transform: translatex(0); 
                     }
                     to {
                        transform: translatex(-100%); 
                    }
                 }
                 @keyframes slideOut {
                    from {
                        transform: translatex(-100%); 
                    }
                    to {
                        transform: translatex(0); 
                    }
                 }
                 @keyframes fadeIn {
                     from {
                        opacity: 0; 
                     }
                     to {
                        opacity: 1; 
                     }
                 }
                 .s-custom-cms-ui 
                 * {
                    --dropdown-width: 510px; --dropdown-max-height: 220px; --dropdown-max-height-connector-view: 255px; --addressbook-max-height-connector-view: 238px; --addressbook-two-row-max-height-connector-view: 204px; --queue-dropdown-max-height: 290px; --queue-dropdown-min-height: 110px; --modal-height: 420px; --modal-radio-height: 24px; --cancel-ctq-container-maxwidth: 500px; --padding-icon-right: 0.5rem; --transfer-modal-content-height: 220px; --queue-dropdown-item: 36px; --dropdown-height: 48px; --menu-overlay-max-height: 325px; --modal-size: 490px; --organization-list-item-max-width: 375px;
                 }
                 .s-custom-cms-ui  .queueDropdown {
                    width: var(--dropdown-width);
                 }
                 .s-custom-cms-ui  .queueDropdown-tabbed {
                    height: 35px;
                 }
                 .s-custom-cms-ui  .queueDropdown::part(overlay) {
                    width: 100%; transform: none; top: calc(100% + 0.2rem);
                 }
                 .s-custom-cms-ui  .queueDropdown::part(overlay-content) {
                    width: 100%;
                 }
                 .s-custom-cms-ui  .epdn-addressbook {
                    width: 100%;
                 }
                 .s-custom-cms-ui  .entry-point-tab {
                    border-bottom: 2px solid var(--md-separator-primary); width: 100%; display: inline-flex; height: 3rem; min-height: 3rem; align-items: center; padding: 0.3rem 1rem; color: var(--md-textColor-secondary);
                 }
                 .s-custom-cms-ui  .entry-point-tab > span {
                    margin-top: 5px;
                 }
                 .s-custom-cms-ui  .no-options {
                    width: 100%; display: inline-flex; height: 3rem; min-height: 3rem; align-items: center; padding: 0.3rem 1rem; color: var(--md-textColor-secondary);
                 }
                 .s-custom-cms-ui  .queueDropdown::part(combobox-options) {
                    line-height: 21px; max-height: var(--queue-dropdown-max-height);
                 }
                 .s-custom-cms-ui  .queueDropdown::part(combobox-option) {
                    max-height: var(--dropdown-height);
                 }
                 .s-custom-cms-ui  .queueDropdown::part(combobox-option) .select-label span {
                    margin-left: 0; margin-right: 0;
                 }
                 .s-custom-cms-ui  .highlighted-part {
                    margin-left: 4px !important;
                 }
                 .s-custom-cms-ui  .modal-container .md-event-overlay__children {
                    height: auto; max-height: var(--dropdown-max-height); width: var(--dropdown-width);
                 }
                 .s-custom-cms-ui  .md-modal__header {
                    padding-bottom: 0.75rem;
                 }
                 .s-custom-cms-ui  .my-radio-group md-radiogroup .radioClass {
                    box-sizing: border-box;
                 }
                 .s-custom-cms-ui  .modal-body-class.list-queue.list-organization #dailNumberId, .s-custom-cms-ui 
                 .modal-body-class.list-queue.list-organization #organizationUsers {
                    margin-top: 9px;
                 }
                 .s-custom-cms-ui  .my-radio-group md-radiogroup::part(radio-group-container) {
                    width: 100%; justify-content: space-between;
                 }
                 .s-custom-cms-ui  .modal-body-class.list-queue:not(.list-organization):not(.radio-two-row):not(.list-dialnumber) .my-radio-group md-radiogroup::part(radio-group-container), .s-custom-cms-ui 
                 .modal-body-class:not(.list-organization):not(.list-queue) .my-radio-group md-radiogroup::part(radio-group-container), .s-custom-cms-ui 
                 .modal-body-class.radio-two-row .my-radio-group md-radiogroup::part(radio-group-container) {
                    flex-flow: wrap; display: grid; grid-template-columns: repeat(2, 1fr);
                 }
                 .s-custom-cms-ui  .org-search-input::part(md-input-container) {
                    margin-bottom: 0;
                 }
                 .s-custom-cms-ui  .modal-container > .md-modal__content {
                    min-height: var(--modal-size);
                 }
                 .s-custom-cms-ui  .my-radio-group .md-radio-group, .s-custom-cms-ui 
                 .my-radio-group .md-radio {
                    display: flex;
                 }
                 .s-custom-cms-ui  .my-radio-group {
                    padding-top: calc(var(--space-token-even) * 6);
                 }
                 .s-custom-cms-ui  .agentAction-container {
                    margin-top: 0.75rem;
                 }
                 .s-custom-cms-ui  md-modal::part(modal-body) {
                    overflow: visible;
                 }
                 .s-custom-cms-ui  .modal-container .md-label.md-radio__label > span {
                    height: var(--modal-radio-height); margin-right: calc(var(--space-token-even) * 36);
                 }
                 .s-custom-cms-ui  .modal-container .md-input-container .input-error-class {
                    border-color: var(--red-color); border-radius: 0; box-shadow: var(--focused-shadow); display: inline-block;
                 }
                 .s-custom-cms-ui  .actionMessage {
                    display: flex; font-size: var(--font-size-small); margin-top: 0.5rem;
                 }
                 .s-custom-cms-ui  .agentAction-error-container {
                    color: var(--md-alert-error-text-color, --red-70-color);
                 }
                 .s-custom-cms-ui  .agentAction-warning-container {
                    color: var(--md-alert-warning-text-color, --yellow-70-color);
                 }
                 .s-custom-cms-ui  .cancelCtq-info-container {
                    color: var(--md-secondary-text-color-default); display: flex; flex-direction: row; font-size: var(--font-size-small); margin-top: 0.5rem; max-width: var(--cancel-ctq-container-maxwidth);
                 }
                 .s-custom-cms-ui  .agentAction-error-icon {
                    color: var(--red-70-color); padding-right: 0.5rem;
                 }
                 .s-custom-cms-ui  .cancelCtq-info-icon {
                    padding-right: var(--padding-icon-right);
                 }
                 .s-custom-cms-ui  md-radio.hideClass {
                    display: none !important; margin: 0; /** due to momentum display: inline !important adding the field below to hide the radio group */ visibility: hidden; width: 0; position: absolute;
                 }
                 .s-custom-cms-ui  .cancelCtq-spinner {
                    padding-right: calc(var(--space-token-even) * 4); padding-top: calc(var(--space-token-even) * 2);
                 }
                 .s-custom-cms-ui  .cancelCtq-link {
                    text-decoration: underline;
                 }
                 .s-custom-cms-ui  .transfer-modal-btn {
                    margin-left: 0.75rem;
                 }
                 .s-custom-cms-ui  #dailNumberId {
                    margin-right: 0;
                 }
                 .s-custom-cms-ui  .modal-body-class {
                    min-height: var(--transfer-modal-content-height);
                 }
                 .s-custom-cms-ui  .transfer-modal-footer {
                    display: flex; flex-direction: row; justify-content: flex-end; width: 100%;
                 }
                 .s-custom-cms-ui  .available {
                    color: var(--md-presence-active-bg-color);
                 }
                 .s-custom-cms-ui  .un-available {
                    color: var(--md-presence-away-bg-color);
                 }
                 .s-custom-cms-ui  .align {
                    vertical-align: middle;
                 }
                 .s-custom-cms-ui  .transfer-modal-search-container {
                    display: flex;
                 }
                 .s-custom-cms-ui  .transfer-modal-search-container.organization {
                    flex-direction: column;
                 }
                 .s-custom-cms-ui  .org-search-container {
                    display: flex;
                 }
                 .s-custom-cms-ui  .org-search-container md-input {
                    width: 100%;
                 }
                 .s-custom-cms-ui  .refresh-spinner {
                    margin: auto calc(var(--space-token-even) * 3) auto calc(var(--space-token-even) * 7); width: calc(var(--space-token-even) * 14);
                 }
                 .s-custom-cms-ui  .refresh-list-tooltip {
                    margin-left: calc(var(--space-token-even) * 4);
                 }
                 .s-custom-cms-ui  .refresh-list-button {
                    height: calc(var(--space-token-even) * 14); width: calc(var(--space-token-even) * 14);
                 }
                 .s-custom-cms-ui  .address-list-item {
                    align-items: center; display: grid; grid-template-columns: 0fr 1fr 0fr; width: 100%;
                 }
                 .s-custom-cms-ui  .address-list-item-detail {
                    padding: 1px calc(var(--space-token-even) * 5);
                 }
                 .s-custom-cms-ui  .address-list-item-detail .address-name, .s-custom-cms-ui 
                 .address-dn {
                    font-size: 14px; max-width: var(--adr-name-width); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
                 }
                 .s-custom-cms-ui  .address-list-item-detail .address-dn {
                    color: var(--md-secondary-text-color); font-size: var(--font-size-small);
                 }
                 .s-custom-cms-ui  .organization-users-list .address-list-item-detail .address-dn {
                    max-width: var(--organization-list-item-max-width);
                 }
                 .s-custom-cms-ui  .dnDropdown::part(combobox-option) {
                    padding-bottom: var(--space-token-even); padding-top: var(--space-token-even);
                 }
                 .s-custom-cms-ui  .radioLabel {
                    margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 88px;
                 }
                 .s-custom-cms-ui  .transfer-modal-btn-primary {
                     background: #007aa3;        
                 }
                 .s-custom-cms-ui  .my-radio-group .radioClass {
                     margin-right: 0; width: fit-content;
                 }
                 .s-custom-cms-ui  .organization-users-list {
                    margin-top: 0.25rem;
                 }
                 .s-custom-cms-ui  .organization-users-list.disabled {
                    opacity: 0.8; pointer-events: none;
                 }
                 .s-custom-cms-ui  .organization-auth-error, .s-custom-cms-ui 
                 .organization-auth-error md-icon, .s-custom-cms-ui 
                 .organization-auth-error md-link::part(link) {
                    font-size: var(--font-size-small); color: var(--link-inline); display: flex; align-items: center;
                 }
                 .s-custom-cms-ui  .organization-auth-error .auth-error-message {
                    margin: 0 calc(var(--space-token-even) * 4);
                 }
                 .s-custom-cms-ui  .organization-users-list .address-book-increased-limit-list .address-book-increased-limit-list-item, .s-custom-cms-ui 
                 .organization-users-list .address-book-increased-limit-list .infinite-scroll-error {
                    padding-left: 0.25rem !important;
                 }
                 @media only screen and (min-width: 41em) {
                     .s-custom-cms-ui  md-modal::part(modal-container) {
                         width: var(--modal-size); 
                     }
                     .s-custom-cms-ui  md-modal::part(modal-content) {
                         height: var(--modal-size); 
                     }
                 }
                 @media screen and (max-width: 640px) and (max-height: 575px) {
                     .s-custom-cms-ui  .radio-two-row .queueDropdown::part(combobox-options) {
                         max-height: var(--dropdown-max-height-connector-view) !important; 
                     }
                     .s-custom-cms-ui  .epdn-addressbook .address-book-increased-limit-list .fixed-size-list 
                     {
                         max-height: var(--addressbook-max-height-connector-view) !important; 
                     }
                     .s-custom-cms-ui  .radio-two-row .epdn-addressbook .address-book-increased-limit-list .fixed-size-list {
                        max-height: var(--addressbook-two-row-max-height-connector-view) !important; 
                     }
                 }
              </style>
            </div>
        </div>        
        `;

        // **STEP (4)** //
        logger.debug("JS Step 4 - attach to document");

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.updateButtons = (call_state) => {
            // Get references to the buttons
            logger.debug(`Creating Update Buttons Event for call state ${call_state}`);

            let buttonStates = this.getEmptyButtonMap()

            switch (call_state) {
                case 'connected':
                    buttonStates.button1.display = 'inline';
                    buttonStates.button2.display = 'inline';
                    buttonStates.button3.display = 'inline';
                    buttonStates.button1.disabled = false;
                    buttonStates.button2.disabled = false;
                    buttonStates.button3.disabled = false;
                    break;
                case 'consult':
                    buttonStates.button1.display = 'inline';
                    buttonStates.button2.display = 'inline';
                    buttonStates.button3.display = 'inline';
                    buttonStates.button1.disabled = true;
                    buttonStates.button2.disabled = true;
                    buttonStates.button3.disabled = true;
                    break;
                case 'consulting':
                    buttonStates.button1.display = 'inline';
                    buttonStates.button2.display = 'inline';
                    buttonStates.button3.display = 'inline';
                    buttonStates.button1.disabled = true;
                    buttonStates.button2.disabled = true;
                    buttonStates.button3.disabled = true;
                    break;
                case 'conference':
                    buttonStates.button1.display = 'inline';
                    buttonStates.button2.display = 'inline';
                    buttonStates.button3.display = 'inline';
                    buttonStates.button1.disabled = false;
                    buttonStates.button2.disabled = false;
                    buttonStates.button3.disabled = false;
                    break;
                default:
                    buttonStates.button1.display = 'none';
                    buttonStates.button2.display = 'none';
                    buttonStates.button3.display = 'none';
                    buttonStates.button1.disabled = true;
                    buttonStates.button2.disabled = true;
                    buttonStates.button3.disabled = true;
                    break;
            }

            const button1 = this.shadowRoot.getElementById('button1');
            const button2 = this.shadowRoot.getElementById('button2');
            const button3 = this.shadowRoot.getElementById('button3');

            const button1_div = this.shadowRoot.getElementById('button1_div');
            const button2_div = this.shadowRoot.getElementById('button2_div');
            const button3_div = this.shadowRoot.getElementById('button3_div');

            if (button1 !== null) {
                logger.debug('Setting Button 1 State');
                button1_div.style.display = buttonStates.button1.display;
                button1.disabled = buttonStates.button1.disabled
            }

            if (button2 !== null) {
                logger.debug('Setting Button 2 State');
                button2_div.style.display = buttonStates.button2.display;
                button2.disabled = buttonStates.button2.disabled
            }

            if (button3 !== null) {
                logger.debug('Setting Button 3 State');
                button3_div.style.display = buttonStates.button3.display
                button3.disabled = buttonStates.button3.disabled
            }

            logger.debug('Caching buttonStateMap')
            this.buttonStateMap = buttonStates
        }

        if (button1_present) {
            this.shadowRoot.getElementById('button1').addEventListener('click', async (e) => {
                const button1 = this.shadowRoot.getElementById('button1')
                if (button1.disabled === false) {
                    logger.debug('Button 1 Pressed. Disabling Buttons.');
                    if (button1_present) {
                        this.shadowRoot.getElementById('button1').disabled = true;
                    }
                    if (button2_present) {
                        this.shadowRoot.getElementById('button2').disabled = true;
                    }
                    if (button3_present) {
                        this.shadowRoot.getElementById('button3').disabled = true;
                    }
                    await this.processButtonPress('button1', this.button1_dn);
                } else {
                    logger.debug('Button 1 is disabled. Ignoring click event.');
                }
            })    
        }

        if (button2_present) {
            this.shadowRoot.getElementById('button2').addEventListener('click', async (e) => {
                const button2 = this.shadowRoot.getElementById('button2')
                if (button2.disabled === false) {
                    logger.debug('Button 2 Pressed. Disabling Buttons.')
                    if (button1_present) {
                        this.shadowRoot.getElementById('button1').disabled = true;
                    }
                    if (button2_present) {
                        this.shadowRoot.getElementById('button2').disabled = true;
                    }
                    if (button3_present) {
                        this.shadowRoot.getElementById('button3').disabled = true;
                    }
                    await this.processButtonPress('button2', this.button2_dn);
                } else {
                    logger.debug('Button 2 is disabled. Ignoring click event.');
                }
            })
        }

        if (button3_present) {
            this.shadowRoot.getElementById('button3').addEventListener('click', async (e) => {
                const button3 = this.shadowRoot.getElementById('button3')
                if (button3.disabled === false) {
                    logger.debug('Button 3 Pressed. Disabling Buttons.')
                    if (button1_present) {
                        this.shadowRoot.getElementById('button1').disabled = true;
                    }
                    if (button2_present) {
                        this.shadowRoot.getElementById('button2').disabled = true;
                    }
                    if (button3_present) {
                        this.shadowRoot.getElementById('button3').disabled = true;
                    }
                    await this.processButtonPress('button3', this.button3_dn);
                } else {
                    logger.debug('Button 3 is disabled. Ignoring click event.');
                }
            })    
        }

    }

    static get observedAttributes() {
        return ["name", "darkmode", "avatar"];
    }
}

window.customElements.define("conference-control-ui", InfoCard);
