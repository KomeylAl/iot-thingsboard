// nodeTypeConfigs.ts
export type FieldType = "string" | "number" | "boolean" | "json";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  default?: any;
};

export type NodeRelation = {
  name: string;
  label: string;
};

export type NodeConfig = {
  label: string;
  fields: Field[];
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
    fields: [
      { name: "defaultTTL", label: "Default TTL", type: "number", default: 0 },
      { name: "ACTIVE_ACK", label: "تصدیق شده فعال", type: "boolean", default: true },
    ],
    relations: [
      { name: "Failure", label: "Failure" },
      { name: "False", label: "False" },
      { name: "True", label: "True" },
    ],
  },

  "org.thingsboard.rule.engine.filter.TbCheckMessageNode": {
    label: "Check Fields Presence",
    fields: [
      {
        name: "scope",
        label: "Scope",
        type: "string",
        default: "SERVER_SCOPE",
      },
    ],
    relations: [
      { name: "Failure", label: "Failure" },
      { name: "False", label: "False" },
      { name: "True", label: "True" },
    ],
  },

  "org.thingsboard.rule.engine.filter.TbCheckRelationNode": {
    label: "Check Relation Presence",
    fields: [
      {
        name: "relationType",
        label: "Relation Type",
        type: "string",
        default: "Contains",
      },
      {
        name: "entityType",
        label: "Entity Type",
        type: "string",
        default: "DEVICE",
      },
    ],
    relations: [
      { name: "True", label: "True" },
      { name: "False", label: "False" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.filter.TbMsgTypeFilterNode": {
    label: "Message Type Filter",
    fields: [
      {
        name: "switchCases",
        label: "Switch Cases (JSON)",
        type: "json",
        default: {},
      },
    ],
    relations: [
      { name: "True", label: "True" },
      { name: "False", label: "False" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.filter.TbJsFilterNode": {
    label: "Script Filter",
    fields: [
      {
        name: "script",
        label: "JavaScript Function",
        type: "string",
        default: "return msg.value > 10;",
      },
    ],
    relations: [
      { name: "True", label: "True" },
      { name: "False", label: "False" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.filter.TbJsSwitchNode": {
    label: "Switch Filter",
    fields: [
      {
        name: "script",
        label: "Transform Script",
        type: "string",
        default: "msg.value = msg.value * 2; return msg;",
      },
    ],
    relations: [{ name: "Failure", label: "Failure" }],
  },

  "org.thingsboard.rule.engine.mail.TbMsgToEmailNode": {
    label: "To Email",
    fields: [
      { name: "rpcCommand", label: "RPC Command", type: "string", default: "" },
      { name: "persist", label: "Persist", type: "boolean", default: true },
    ],
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.transform.TbTransformMsgNode": {
    label: "Transfer Script",
    fields: [
      {
        name: "restEndpointUrl",
        label: "Endpoint URL",
        type: "string",
        default: "",
      },
      {
        name: "httpMethod",
        label: "HTTP Method",
        type: "string",
        default: "POST",
      },
    ],
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.action.TbAssignToCustomerNode": {
    label: "Assign To Customer",
    fields: [
      { name: "to", label: "To", type: "string", default: "" },
      { name: "subject", label: "Subject", type: "string", default: "" },
      { name: "body", label: "Body", type: "string", default: "" },
    ],
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.action.TbCreateAlarmNode": {
    label: "Create Alarm",
    fields: [
      { name: "webhookUrl", label: "Webhook URL", type: "string", default: "" },
      { name: "message", label: "Message", type: "string", default: "" },
    ],
    relations: [
      { name: "Created", label: "Created" },
      { name: "Failure", label: "Failure" },
      { name: "False", label: "False" },
      { name: "Updated", label: "Updated" },
    ],
  },

  "org.thingsboard.rule.engine.action.TbClearAlarmNode": {
    label: "Create Alarm",
    fields: [
      { name: "webhookUrl", label: "Webhook URL", type: "string", default: "" },
      { name: "message", label: "Message", type: "string", default: "" },
    ],
    relations: [
      { name: "Cleared", label: "Cleared" },
      { name: "Failure", label: "Failure" },
      { name: "False", label: "False" },
    ],
  },

  "org.thingsboard.rule.engine.action.TbCreateRelationNode": {
    label: "Create Relation",
    fields: [
      { name: "topic", label: "Topic", type: "string", default: "" },
      { name: "qos", label: "QoS", type: "number", default: 0 },
    ],
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.action.TbDeleteRelationNode": {
    label: "Delete Relation",
    fields: [
      { name: "logLevel", label: "Log Level", type: "string", default: "INFO" },
      {
        name: "msgPattern",
        label: "Message Pattern",
        type: "string",
        default: "${msg}",
      },
    ],
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.delay.TbMsgDelayNode": {
    label: "Delay",
    fields: [
      { name: "delayInMs", label: "Delay (ms)", type: "number", default: 1000 },
    ],
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.mail.TbSendEmailNode": {
    label: "Send Email",
    fields: [
      {
        name: "switchExpression",
        label: "Switch Expression",
        type: "string",
        default: "",
      },
      { name: "cases", label: "Cases (JSON)", type: "json", default: {} },
    ],
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.notification.TbNotificationNode": {
    label: "Send Notification",
    fields: [
      {
        name: "telemetry",
        label: "Telemetry Keys",
        type: "string",
        default: "",
      },
    ],
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.sms.TbSendSmsNode": {
    label: "Send Sms",
    fields: [
      {
        name: "telemetry",
        label: "Telemetry Keys",
        type: "string",
        default: "",
      },
    ],
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.mqtt.TbMqttNode": {
    label: "MQTT",
    fields: [
      {
        name: "telemetry",
        label: "Telemetry Keys",
        type: "string",
        default: "",
      },
    ],
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.flow.TbRuleChainInputNode": {
    label: "Rule Chain",
    fields: [
      {
        name: "telemetry",
        label: "Telemetry Keys",
        type: "string",
        default: "",
      },
    ],
    relations: [],
  },
};
