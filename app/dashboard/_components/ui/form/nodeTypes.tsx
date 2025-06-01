import { AlarmStatusForm } from "./RuleNodeForm";

// nodeTypeConfigs.ts
export type FieldType = "string" | "number" | "boolean" | "json";

export type NodeRelation = {
  name: string;
  label: string;
};

export type NodeConfig = {
  label: string;
  form: React.ReactNode;
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
    form: <AlarmStatusForm />,
    relations: [
      { name: "Failure", label: "Failure" },
      { name: "False", label: "False" },
      { name: "True", label: "True" },
    ],
  },

  "org.thingsboard.rule.engine.filter.TbCheckMessageNode": {
    label: "Check Fields Presence",
    form: <AlarmStatusForm />,
    relations: [
      { name: "Failure", label: "Failure" },
      { name: "False", label: "False" },
      { name: "True", label: "True" },
    ],
  },

  "org.thingsboard.rule.engine.filter.TbCheckRelationNode": {
    label: "Check Relation Presence",
    form: <AlarmStatusForm />,
    relations: [
      { name: "True", label: "True" },
      { name: "False", label: "False" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.filter.TbMsgTypeFilterNode": {
    label: "Message Type Filter",
    form: <AlarmStatusForm />,
    relations: [
      { name: "True", label: "True" },
      { name: "False", label: "False" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.filter.TbJsFilterNode": {
    label: "Script Filter",
    form: <AlarmStatusForm />,
    relations: [
      { name: "True", label: "True" },
      { name: "False", label: "False" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.filter.TbJsSwitchNode": {
    label: "Switch Filter",
    form: <AlarmStatusForm />,
    relations: [{ name: "Failure", label: "Failure" }],
  },

  "org.thingsboard.rule.engine.mail.TbMsgToEmailNode": {
    label: "To Email",
    form: <AlarmStatusForm />,
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.transform.TbTransformMsgNode": {
    label: "Transfer Script",
    form: <AlarmStatusForm />,
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.action.TbAssignToCustomerNode": {
    label: "Assign To Customer",
    form: <AlarmStatusForm />,
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.action.TbCreateAlarmNode": {
    label: "Create Alarm",
    form: <AlarmStatusForm />,
    relations: [
      { name: "Created", label: "Created" },
      { name: "Failure", label: "Failure" },
      { name: "False", label: "False" },
      { name: "Updated", label: "Updated" },
    ],
  },

  "org.thingsboard.rule.engine.action.TbClearAlarmNode": {
    label: "Create Alarm",
    form: <AlarmStatusForm />,
    relations: [
      { name: "Cleared", label: "Cleared" },
      { name: "Failure", label: "Failure" },
      { name: "False", label: "False" },
    ],
  },

  "org.thingsboard.rule.engine.action.TbCreateRelationNode": {
    label: "Create Relation",
    form: <AlarmStatusForm />,
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.action.TbDeleteRelationNode": {
    label: "Delete Relation",
    form: <AlarmStatusForm />,
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.delay.TbMsgDelayNode": {
    label: "Delay",
    form: <AlarmStatusForm />,
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.mail.TbSendEmailNode": {
    label: "Send Email",
    form: <AlarmStatusForm />,
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.notification.TbNotificationNode": {
    label: "Send Notification",
    form: <AlarmStatusForm />,
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.sms.TbSendSmsNode": {
    label: "Send Sms",
    form: <AlarmStatusForm />,
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.mqtt.TbMqttNode": {
    label: "MQTT",
    form: <AlarmStatusForm />,
    relations: [
      { name: "Success", label: "Success" },
      { name: "Failure", label: "Failure" },
    ],
  },

  "org.thingsboard.rule.engine.flow.TbRuleChainInputNode": {
    label: "Rule Chain",
    form: <AlarmStatusForm />,
    relations: [],
  },
};
