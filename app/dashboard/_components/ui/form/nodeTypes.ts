// nodeTypeConfigs.ts
export type FieldType = 'string' | 'number' | 'boolean' | 'json';

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
  | 'org.thingsboard.rule.engine.input.InputNode'
  | 'org.thingsboard.rule.engine.telemetry.TbSaveTimeseriesNode'
  | 'org.thingsboard.rule.engine.telemetry.TbSaveAttributesNode'
  | 'org.thingsboard.rule.engine.filter.TbCheckRelationNode'
  | 'org.thingsboard.rule.engine.filter.TbDeviceTypeSwitchNode'
  | 'org.thingsboard.rule.engine.script.TbJsFilterNode'
  | 'org.thingsboard.rule.engine.script.TbTransformMsgNode'
  | 'org.thingsboard.rule.engine.rpc.TbSendRpcRequestNode'
  | 'org.thingsboard.rule.engine.rest.TbRestApiCallNode'
  | 'org.thingsboard.rule.engine.action.TbSendEmailNode'
  | 'org.thingsboard.rule.engine.action.TbSendSlackMessageNode'
  | 'org.thingsboard.rule.engine.mqtt.TbSendMqttRequestNode'
  | 'org.thingsboard.rule.engine.debug.TbLogNode'
  | 'org.thingsboard.rule.engine.delay.TbMsgDelayNode'
  | 'org.thingsboard.rule.engine.filter.TbSwitchNode'
  | 'org.thingsboard.rule.engine.originator.TbOriginatorTelemetryNode';

export const nodeTypeConfigs: Record<NodeType, NodeConfig> = {
  "org.thingsboard.rule.engine.input.InputNode": {
    label: "Start Node",
    fields: [],
    relations: []
  },
  "org.thingsboard.rule.engine.telemetry.TbSaveTimeseriesNode": {
    label: "Save Timeseries",
    fields: [
      { name: "defaultTTL", label: "Default TTL", type: "number", default: 0 }
    ],
    relations: [{ name: "Success", label: "Success" }]
  },

  "org.thingsboard.rule.engine.telemetry.TbSaveAttributesNode": {
    label: "Save Attributes",
    fields: [
      { name: "scope", label: "Scope", type: "string", default: "SERVER_SCOPE" }
    ],
    relations: [{ name: "Success", label: "Success" }]
  },

  "org.thingsboard.rule.engine.filter.TbCheckRelationNode": {
    label: "Check Relation",
    fields: [
      { name: "relationType", label: "Relation Type", type: "string", default: "Contains" },
      { name: "entityType", label: "Entity Type", type: "string", default: "DEVICE" }
    ],
    relations: [
      { name: "True", label: "True" },
      { name: "False", label: "False" }
    ]
  },

  "org.thingsboard.rule.engine.filter.TbDeviceTypeSwitchNode": {
    label: "Device Type Switch",
    fields: [
      { name: "switchCases", label: "Switch Cases (JSON)", type: "json", default: {} }
    ],
    relations: [
      { name: "default", label: "Default" },
      { name: "typeA", label: "Type A" },
      { name: "typeB", label: "Type B" }
    ]
  },

  "org.thingsboard.rule.engine.script.TbJsFilterNode": {
    label: "Script Filter",
    fields: [
      { name: "script", label: "JavaScript Function", type: "string", default: "return msg.value > 10;" }
    ],
    relations: [
      { name: "True", label: "True" },
      { name: "False", label: "False" }
    ]
  },

  "org.thingsboard.rule.engine.script.TbTransformMsgNode": {
    label: "Script Transformation",
    fields: [
      { name: "script", label: "Transform Script", type: "string", default: "msg.value = msg.value * 2; return msg;" }
    ],
    relations: [{ name: "Success", label: "Success" }]
  },

  "org.thingsboard.rule.engine.rpc.TbSendRpcRequestNode": {
    label: "RPC Request",
    fields: [
      { name: "rpcCommand", label: "RPC Command", type: "string", default: "" },
      { name: "persist", label: "Persist", type: "boolean", default: true }
    ],
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" }
    ]
  },

  "org.thingsboard.rule.engine.rest.TbRestApiCallNode": {
    label: "REST API Call",
    fields: [
      { name: "restEndpointUrl", label: "Endpoint URL", type: "string", default: "" },
      { name: "httpMethod", label: "HTTP Method", type: "string", default: "POST" }
    ],
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" }
    ]
  },

  "org.thingsboard.rule.engine.action.TbSendEmailNode": {
    label: "Send Email",
    fields: [
      { name: "to", label: "To", type: "string", default: "" },
      { name: "subject", label: "Subject", type: "string", default: "" },
      { name: "body", label: "Body", type: "string", default: "" }
    ],
    relations: [{ name: "Success", label: "Success" }]
  },

  "org.thingsboard.rule.engine.action.TbSendSlackMessageNode": {
    label: "Send Slack Message",
    fields: [
      { name: "webhookUrl", label: "Webhook URL", type: "string", default: "" },
      { name: "message", label: "Message", type: "string", default: "" }
    ],
    relations: [{ name: "Success", label: "Success" }]
  },

  "org.thingsboard.rule.engine.mqtt.TbSendMqttRequestNode": {
    label: "Send MQTT",
    fields: [
      { name: "topic", label: "Topic", type: "string", default: "" },
      { name: "qos", label: "QoS", type: "number", default: 0 }
    ],
    relations: [{ name: "Success", label: "Success" }]
  },

  "org.thingsboard.rule.engine.debug.TbLogNode": {
    label: "Log",
    fields: [
      { name: "logLevel", label: "Log Level", type: "string", default: "INFO" },
      { name: "msgPattern", label: "Message Pattern", type: "string", default: "${msg}" }
    ],
    relations: [{ name: "Success", label: "Success" }]
  },

  "org.thingsboard.rule.engine.delay.TbMsgDelayNode": {
    label: "Delay",
    fields: [
      { name: "delayInMs", label: "Delay (ms)", type: "number", default: 1000 }
    ],
    relations: [{ name: "Success", label: "Success" }]
  },

  "org.thingsboard.rule.engine.filter.TbSwitchNode": {
    label: "Switch",
    fields: [
      { name: "switchExpression", label: "Switch Expression", type: "string", default: "" },
      { name: "cases", label: "Cases (JSON)", type: "json", default: {} }
    ],
    relations: [
      { name: "default", label: "Default" },
      { name: "case1", label: "Case 1" },
      { name: "case2", label: "Case 2" }
    ]
  },

  "org.thingsboard.rule.engine.originator.TbOriginatorTelemetryNode": {
    label: "Originator Telemetry",
    fields: [
      { name: "telemetry", label: "Telemetry Keys", type: "string", default: "" }
    ],
    relations: [{ name: "Success", label: "Success" }]
  },
};
