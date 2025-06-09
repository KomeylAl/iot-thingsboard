import { AlarmStatusForm } from "./RuleNodeForm";

// nodeTypeConfigs.ts
export type FieldType = "string" | "number" | "boolean" | "json";

export type NodeRelation = {
  name: string;
  label: string;
};

export type NodeConfig = {
  label: string;
  name: string;
  relations: NodeRelation[];
};

export type NodeType =
  | "org.thingsboard.rule.engine.filter.TbCheckAlarmStatusNode"
  | "org.thingsboard.rule.engine.filter.TbCheckMessageNode"
  | "org.thingsboard.rule.engine.filter.TbCheckRelationNode"
  | "org.thingsboard.rule.engine.filter.TbMsgTypeFilterNode"
  | "org.thingsboard.rule.engine.filter.TbJsFilterNode"
  | "org.thingsboard.rule.engine.filter.TbJsSwitchNode"
  | "org.thingsboard.rule.engine.mail.TbMsgToEmailNode"
  | "org.thingsboard.rule.engine.transform.TbTransformMsgNode"
  | "org.thingsboard.rule.engine.action.TbAssignToCustomerNode"
  | "org.thingsboard.rule.engine.action.TbCreateAlarmNode"
  | "org.thingsboard.rule.engine.action.TbClearAlarmNode"
  | "org.thingsboard.rule.engine.action.TbCreateRelationNode"
  | "org.thingsboard.rule.engine.action.TbDeleteRelationNode"
  | "org.thingsboard.rule.engine.delay.TbMsgDelayNode"
  | "org.thingsboard.rule.engine.mail.TbSendEmailNode"
  | "org.thingsboard.rule.engine.notification.TbNotificationNode"
  | "org.thingsboard.rule.engine.sms.TbSendSmsNode"
  | "org.thingsboard.rule.engine.mqtt.TbMqttNode"
  | "org.thingsboard.rule.engine.flow.TbRuleChainInputNode";

export const nodeTypeConfigs: Record<NodeType, NodeConfig> = {

  "org.thingsboard.rule.engine.filter.TbCheckAlarmStatusNode": {
    label: "Alarm status",
    name: "AlarmStatus",
    relations: [
      { name: "Failure", label: "Failure" },
      { name: "False", label: "False" },
      { name: "True", label: "True" },
    ],
  },

  "org.thingsboard.rule.engine.filter.TbCheckMessageNode": {
    label: "Check Fields Presence",
    name: "CheckFieldsPresence",
    relations: [
      { name: "Failure", label: "Failure" },
      { name: "False", label: "False" },
      { name: "True", label: "True" },
    ],
  },

  "org.thingsboard.rule.engine.filter.TbCheckRelationNode": {
    label: "Check Relation Presence",
    name: "CheckRelationPresence",
    relations: [
      { name: "True", label: "True" },
      { name: "False", label: "False" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.filter.TbMsgTypeFilterNode": {
    label: "Message Type Filter",
    name: "MessageTypeFilter",
    relations: [
      { name: "True", label: "True" },
      { name: "False", label: "False" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.filter.TbJsFilterNode": {
    label: "Script Filter",
    name: "ScriptFilter",
    relations: [
      { name: "True", label: "True" },
      { name: "False", label: "False" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.filter.TbJsSwitchNode": {
    label: "Switch Filter",
    name: "SwitchFilter",
    relations: [{ name: "Failure", label: "Failure" }],
  },

  "org.thingsboard.rule.engine.mail.TbMsgToEmailNode": {
    label: "To Email",
    name: "ToEmail",
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.transform.TbTransformMsgNode": {
    label: "Transfer Script",
    name: "TransferScript",
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.action.TbAssignToCustomerNode": {
    label: "Assign To Customer",
    name: "AssignToCustomer",
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.action.TbCreateAlarmNode": {
    label: "Create Alarm",
    name: "CreateAlarm",
    relations: [
      { name: "Created", label: "Created" },
      { name: "Failure", label: "Failure" },
      { name: "False", label: "False" },
      { name: "Updated", label: "Updated" },
    ],
  },

  "org.thingsboard.rule.engine.action.TbClearAlarmNode": {
    label: "Clear Alarm",
    name: "ClearAlarm",
    relations: [
      { name: "Cleared", label: "Cleared" },
      { name: "Failure", label: "Failure" },
      { name: "False", label: "False" },
    ],
  },

  "org.thingsboard.rule.engine.action.TbCreateRelationNode": {
    label: "Create Relation",
    name: "CreateRelation",
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.action.TbDeleteRelationNode": {
    label: "Delete Relation",
    name: "DeleteRelation",
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.delay.TbMsgDelayNode": {
    label: "Delay",
    name: "Delay",
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.mail.TbSendEmailNode": {
    label: "Send Email",
    name: "SendEmail",
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.notification.TbNotificationNode": {
    label: "Send Notification",
    name: "SendNotification",
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.sms.TbSendSmsNode": {
    label: "Send Sms",
    name: "SendSms",
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.mqtt.TbMqttNode": {
    label: "MQTT",
    name: "Mqtt",
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.flow.TbRuleChainInputNode": {
    label: "Rule Chain",
    name: "RuleChain",
    relations: [],
  },
};
