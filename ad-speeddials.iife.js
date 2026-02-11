var v=Object.defineProperty;var w=(l,n,t)=>n in l?v(l,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[n]=t;var g=(l,n,t)=>w(l,typeof n!="symbol"?n+"":n,t);(function(l,n){"use strict";const t=n.Desktop.logger.createLogger("cisco-conference-speed-dial");class p extends HTMLElement{constructor(){super();g(this,"buttonStateMap",null);g(this,"initialized",!1);g(this,"lastButtonPressTime",0);g(this,"latestCallState","unknown");t.info("lee-health-wxcc-consult-buttons version 1.0"),t.info("JS Step 1 - attachShadow"),this.attachShadow({mode:"open"}),t.debug("Requesting Button Map Update from background process in constructor... ")}async connectedCallback(){t.debug("*/*/*/*/*/*/*/*/*/*/*/*/*/*/ Connected Callback */*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/"),t.debug("connectedCallback in UI Widget"),this.initialized===!1?(t.debug("Not previously initialized - doing Desktop.config.init()"),await n.Desktop.config.init()):(t.debug("Previously initialized - skipping Desktop.config.init()"),this.removeButtonPressListener()),t.debug("Removing Old Event Listeners"),this.removeListeners(),t.debug("Initializing Event Listeners"),this.initListeners(),t.debug("Adding Button Press Listener"),this.addButtonPressListener(),t.debug("Getting Call State"),this.latestCallState=await this.getCallState(),t.debug("Rendering template"),this.render(),this.initialized=!0}async disconnectedCallback(){t.debug("*/*/*/*/*/*/*/*/*/*/*/*/*/*/ Disconnected Callback */*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/"),this.removeButtonPressListener(),this.removeListeners(),t.debug("disconnectedCallback in UI Widget")}initListeners(){t.info("Adding WebexCC Event Listeners"),n.Desktop.agentContact.addEventListener("eAgentContact",e=>this.logEvent(e,"eAgentContact")),n.Desktop.agentContact.addEventListener("eAgentContactAssigned",e=>this.logEvent(e,"eAgentContactAssigned")),n.Desktop.agentContact.addEventListener("eAgentContactAssignFailed",e=>this.logEvent(e,"eAgentContactAssignFailed")),n.Desktop.agentContact.addEventListener("eAgentContactEnded",e=>this.logEvent(e,"eAgentContactEnded")),n.Desktop.agentContact.addEventListener("eAgentContactWrappedUp",e=>this.logEvent(e,"eAgentContactWrappedUp")),n.Desktop.agentContact.addEventListener("eAgentOfferContact",e=>this.logEvent(e,"eAgentOfferContact")),n.Desktop.agentContact.addEventListener("eAgentOfferContactRona",e=>this.logEvent(e,"eAgentOfferContactRona")),n.Desktop.agentContact.addEventListener("eAgentOfferConsult",e=>this.logEvent(e,"eAgentOfferConsult")),n.Desktop.agentContact.addEventListener("eAgentWrapup",e=>this.logEvent(e,"eAgentWrapup")),n.Desktop.agentContact.addEventListener("eAgentContactHeld",e=>this.logEvent(e,"eAgentContactHeld")),n.Desktop.agentContact.addEventListener("eAgentContactUnHeld",e=>this.logEvent(e,"eAgentContactUnHeld")),n.Desktop.agentContact.addEventListener("eConsultTransfer",e=>this.logEvent(e,"eConsultTransfer")),n.Desktop.agentContact.addEventListener("eAgentConsultCreated",e=>this.logEvent(e,"eAgentConsultCreated")),n.Desktop.agentContact.addEventListener("eAgentConsultConferenced",e=>this.logEvent(e,"eAgentConsultConferenced")),n.Desktop.agentContact.addEventListener("eAgentConsultEnded",e=>this.logEvent(e,"eAgentConsultEnded")),n.Desktop.agentContact.addEventListener("eAgentConsultConferenceEnded",e=>this.logEvent(e,"eAgentConsultConferenceEnded")),n.Desktop.agentContact.addEventListener("eAgentConsulting",e=>this.logEvent(e,"eAgentConsulting")),n.Desktop.agentContact.addEventListener("eAgentConsultFailed",e=>this.logEvent(e,"eAgentConsultFailed")),n.Desktop.agentContact.addEventListener("eAgentConsultEndFailed",e=>this.logEvent(e,"eAgentConsultEndFailed")),n.Desktop.agentContact.addEventListener("eAgentConsultConferenceEndFailed",e=>this.logEvent(e,"eAgentConsultConferenceEndFailed")),n.Desktop.agentContact.addEventListener("eParticipantLeftConference",e=>this.logEvent(e,"eParticipantLeftConference")),n.Desktop.agentContact.addEventListener("eParticipantJoinedConference",e=>this.logEvent(e,"eParticipantJoinedConference")),n.Desktop.agentContact.addEventListener("eContactUpdated",e=>this.logEvent(e,"eContactUpdated"))}async logEvent(e,a){t.debug("Start logEvent"),t.debug(`************** LOGGING EVENT - ${a} ****************`),t.debug(e);let i=await this.getCallStateFromEvent(e);i==="terminated"&&(i=await this.getCallState()),t.debug("Updating Buttons"),await this.updateButtons(i),t.debug("*********************************************")}removeListeners(){t.info("Removing WebexCC Event Listeners"),n.Desktop.agentContact.removeAllEventListeners()}async getCallState(){const e=this.details,a=await this.getInteractionId();t.debug(`Getting Call State for interaction id ${a}`);let i="unknown",r="unknown";for(const[s,d]of Object.entries(e.toJSON()))if(t.debug("getCallState - Dumping Interaction Data for interaction_id "+s),t.debug(d),s===a){t.debug(`Found Interaction Data for id ${a}`);const o=d.interaction.owner;switch(t.debug(`interaction_owner is ${o}`),d.interaction.isTerminated===!0?i="terminated":o===null?i="wrapup":i=d.interaction.state,r=d.type,t.debug("interaction_type = "+r),r){case"AgentConsultCreated":i="consulting";break;case"AgentConsulting":i="consulting";break;case"AgentConsultConferenced":d.interaction.participants[o].consultState==="consultInitiated"&&(i="consulting");break;case"AgentWrapup":i="wrapup";break}}return t.debug(`*********** Returning call_state: ${i}`),i}async getCallStateFromEvent(e){const a=await this.getInteractionId(),i=this.agent_id,r=this.selected_task;t.debug("call_interaction_id = "+a),t.debug("agent id = "+i),t.debug("selected task dump:"),t.debug(r);let s="unknown";if(a===void 0)t.debug("Getting Call State From Event - No call interaction id found - returning unknown");else{t.debug(`Getting Call State From Event for interaction id ${a}`);let d="unknown";t.debug("getCallStateFromEvent - Dumping Interaction Data for interaction_id "+a);let o=e.data.interaction;t.debug(o);const u=o.owner;switch(t.debug(`interaction_owner is ${u}`),t.debug(`isTerminated = ${o.isTerminated}`),t.debug(`state = ${o.state}`),t.debug("relationshipType = "+o.callProcessingDetails.relationshipType),o.isTerminated===!0?s="terminated":u===null?s="wrapup":s=o.state,t.debug("provisional call state = "+s),d=e.data.type,t.debug("interaction_type = "+d),d){case"AgentConsultCreated":s="consulting";break;case"AgentConsulting":s="consulting";break;case"AgentWrapup":case"AgentWrappedUp":s="wrapup";break}for(const[m,c]of Object.entries(o.participants))t.debug("participant id = "+m),t.debug("consultState = "+c.consultState),t.debug("participant_data = "+c),c.hasLeft===!1&&c.isWrapUp===!1&&(t.debug("participant is still in call"),(c.consultState==="consulting"||c.consultState==="consultInitiated")&&(t.debug("participant is consulting"),s="consulting"));o.state==="connected"&&o.callProcessingDetails.relationshipType==="consult"&&e.data.reason!=="Consult_Transfer_To_EpDn"&&(s="consulting")}return t.debug(`*********** Returning call_state: ${s}`),s}getEmptyButtonMap(){return{button1:{display:"none",disabled:!0},button2:{display:"none",disabled:!0},button3:{display:"none",disabled:!0}}}addButtonPressListener(){document.documentElement.addEventListener("uiButtonPressEvent",this.buttonListener)}removeButtonPressListener(){document.documentElement.removeEventListener("uiButtonPressEvent",this.buttonListener)}async getInteractionId(){const e=await n.Desktop.actions.getTaskMap();for(const a of e)return a[1].interactionId}async consultToDN(e){t.debug("consultToDN started");let a=!0;try{a=this.holdParticipants}catch{t.error("Error getting holdParticipants from config, defaulting to true.")}a=!0,t.debug("Hold Participants Setting: "+a);let i=await this.getInteractionId(),r=await n.Desktop.agentContact.consult({interactionId:i,data:{destinationType:"DN",destAgentId:e}});return t.debug("consultToDN response: "+JSON.stringify(r)),r}async processButtonPress(e,a){switch(t.debug(`Sending button click event for button ${e} with payload ${a}`),t.debug(`button name: ${e}, payload = ${a}`),e){case"button1":case"button2":case"button3":let i=Date.now(),r=i-this.lastButtonPressTime;if(this.lastButtonPressTime=i,r>5e3){t.debug(`Processing button press (${e}) - ${r}ms since last button press.`);let s=await this.consultToDN(a);t.debug(s)}else t.error(`Ignoring button press (${e}) - only ${r}ms since last button press.`);break}}showConsultModal(){this.shadowRoot.getElementById("custom-interaction-control-transfer-modal").style.display="inline"}closeConsultModal(){this.shadowRoot.getElementById("custom-interaction-control-transfer-modal").style.display="none"}render(){t.debug("JS Step 2 - create a const template");const e=document.createElement("template");t.debug("JS Step 3 - attach template to innerHTML");let a="",i=!1,r=!1,s=!1;t.debug("Attaching buttons to template"),this.button1_name!==""&&this.button1_dn!==""&&(t.debug("Attaching Button 1"),a+=`<div class="interactionButtonHolder" id="button1_div"><md-tooltip class="md-tooltip" slot="false" placement="bottom" message="${this.button1_name}" disabled=""><md-button id='button1' arialabel="${this.button1_name}" ariahaspopup="true" size="40" maxwidth="160px" variant="secondary"><md-icon slot="icon" name="icon-headset_16"></md-icon><span class="interactionButtonText" slot="text">${this.button1_name}</span></md-button></md-tooltip></div>`,i=!0),this.button2_name!==""&&this.button2_dn!==""&&(t.debug("Attaching Button 2"),a+=`<div class="interactionButtonHolder" id="button2_div"><md-tooltip class="md-tooltip" slot="false" placement="bottom" message="${this.button2_name}" disabled=""><md-button id='button2' arialabel="${this.button2_name}" ariahaspopup="true" size="40" maxwidth="160px" variant="secondary"><md-icon slot="icon" name="icon-headset_16"></md-icon><span class="interactionButtonText" slot="text">${this.button2_name}</span></md-button></md-tooltip></div>`,r=!0),this.button3_name!==""&&this.button3_dn!==""&&(t.debug("Attaching Button 3"),a+=`<div class="interactionButtonHolder" id="button3_div"><md-tooltip class="md-tooltip" slot="false" placement="bottom" message="${this.button3_name}" disabled=""><md-button id='button3' arialabel="${this.button3_name}" ariahaspopup="true" size="40" maxwidth="160px" variant="secondary"><md-icon slot="icon" name="icon-headset_16"></md-icon><span class="interactionButtonText" slot="text">${this.button3_name}</span></md-button></md-tooltip></div>`,s=!0),e.innerHTML=`
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
                      ${a}
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
        `,t.debug("JS Step 4 - attach to document"),this.shadowRoot.appendChild(e.content.cloneNode(!0)),this.updateButtons=d=>{t.debug(`Creating Update Buttons Event for call state ${d}`);let o=this.getEmptyButtonMap();switch(d){case"connected":o.button1.display="inline",o.button2.display="inline",o.button3.display="inline",o.button1.disabled=!1,o.button2.disabled=!1,o.button3.disabled=!1;break;case"consult":o.button1.display="inline",o.button2.display="inline",o.button3.display="inline",o.button1.disabled=!0,o.button2.disabled=!0,o.button3.disabled=!0;break;case"consulting":o.button1.display="inline",o.button2.display="inline",o.button3.display="inline",o.button1.disabled=!0,o.button2.disabled=!0,o.button3.disabled=!0;break;case"conference":o.button1.display="inline",o.button2.display="inline",o.button3.display="inline",o.button1.disabled=!1,o.button2.disabled=!1,o.button3.disabled=!1;break;default:o.button1.display="none",o.button2.display="none",o.button3.display="none",o.button1.disabled=!0,o.button2.disabled=!0,o.button3.disabled=!0;break}const u=this.shadowRoot.getElementById("button1"),m=this.shadowRoot.getElementById("button2"),c=this.shadowRoot.getElementById("button3"),b=this.shadowRoot.getElementById("button1_div"),h=this.shadowRoot.getElementById("button2_div"),f=this.shadowRoot.getElementById("button3_div");u!==null&&(t.debug("Setting Button 1 State"),b.style.display=o.button1.display,u.disabled=o.button1.disabled),m!==null&&(t.debug("Setting Button 2 State"),h.style.display=o.button2.display,m.disabled=o.button2.disabled),c!==null&&(t.debug("Setting Button 3 State"),f.style.display=o.button3.display,c.disabled=o.button3.disabled),t.debug("Caching buttonStateMap"),this.buttonStateMap=o},i&&this.shadowRoot.getElementById("button1").addEventListener("click",async d=>{this.shadowRoot.getElementById("button1").disabled===!1?(t.debug("Button 1 Pressed. Disabling Buttons."),i&&(this.shadowRoot.getElementById("button1").disabled=!0),r&&(this.shadowRoot.getElementById("button2").disabled=!0),s&&(this.shadowRoot.getElementById("button3").disabled=!0),await this.processButtonPress("button1",this.button1_dn)):t.debug("Button 1 is disabled. Ignoring click event.")}),r&&this.shadowRoot.getElementById("button2").addEventListener("click",async d=>{this.shadowRoot.getElementById("button2").disabled===!1?(t.debug("Button 2 Pressed. Disabling Buttons."),i&&(this.shadowRoot.getElementById("button1").disabled=!0),r&&(this.shadowRoot.getElementById("button2").disabled=!0),s&&(this.shadowRoot.getElementById("button3").disabled=!0),await this.processButtonPress("button2",this.button2_dn)):t.debug("Button 2 is disabled. Ignoring click event.")}),s&&this.shadowRoot.getElementById("button3").addEventListener("click",async d=>{this.shadowRoot.getElementById("button3").disabled===!1?(t.debug("Button 3 Pressed. Disabling Buttons."),i&&(this.shadowRoot.getElementById("button1").disabled=!0),r&&(this.shadowRoot.getElementById("button2").disabled=!0),s&&(this.shadowRoot.getElementById("button3").disabled=!0),await this.processButtonPress("button3",this.button3_dn)):t.debug("Button 3 is disabled. Ignoring click event.")})}static get observedAttributes(){return["name","darkmode","avatar"]}}window.customElements.define("conference-control-ui",p),l.default=p,l.logger=t,Object.defineProperties(l,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})})(this.ADSpeeddials=this.ADSpeeddials||{},Desktop);
