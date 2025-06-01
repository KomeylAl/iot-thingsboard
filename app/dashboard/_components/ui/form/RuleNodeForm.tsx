import { useState } from "react";

import React from "react";
import { NodeType } from "./nodeTypes";

interface NodeProps {
  onChange?: (newConfig: any) => void;
  value?: Record<string, any>;
}

const STATUS_OPTIONS = [
  "ACTIVE_UNACK",
  "ACTIVE_ACK",
  "CLEARED_UNACK",
  "CLEARED_ACK",
];

export const AlarmStatusForm = ({ onChange, value }: NodeProps) => {
  const alarmStatusList: string[] = value?.alarmStatusList || [];

  const toggleStatus = (status: string) => {
    const isChecked = alarmStatusList.includes(status);
    const updatedList = isChecked
      ? alarmStatusList.filter((s) => s !== status)
      : [...alarmStatusList, status];

    // ارسال config جدید با alarmStatusList آپدیت‌شده
    onChange?.({
      ...value,
      alarmStatusList: updatedList,
    });
  };

  return (
    <div className="w-full space-y-4">
      {STATUS_OPTIONS.map((status) => (
        <div key={status} className="w-full flex items-center gap-3">
          <input
            type="checkbox"
            checked={alarmStatusList.includes(status)}
            onChange={() => toggleStatus(status)}
          />
          <p>{status}</p>
        </div>
      ))}
    </div>
  );
};

export const CheckRelationForm = () => {
  return <div>CheckRelationForm</div>;
};

type Props = {
  nodeType: NodeType;
  value: Record<string, any>;
  onChange: (newConfig: Record<string, any>) => void;
};

const RuleNodeForm = ({ nodeType, value, onChange }: Props) => {

  console.log(value);

  switch (nodeType) {
    case "org.thingsboard.rule.engine.filter.TbCheckAlarmStatusNode":
      return <AlarmStatusForm onChange={onChange} value={value} />;
    case "org.thingsboard.rule.engine.filter.TbCheckMessageNode":
      return <AlarmStatusForm />;
    case "org.thingsboard.rule.engine.filter.TbCheckRelationNode":
      return <CheckRelationForm />;
    case "org.thingsboard.rule.engine.filter.TbMsgTypeFilterNode":
      return <AlarmStatusForm />;
    case "org.thingsboard.rule.engine.filter.TbJsFilterNode":
      return <AlarmStatusForm />;
    case "org.thingsboard.rule.engine.filter.TbJsSwitchNode":
      return <AlarmStatusForm />;
    case "org.thingsboard.rule.engine.mail.TbMsgToEmailNode":
      return <AlarmStatusForm />;
    case "org.thingsboard.rule.engine.transform.TbTransformMsgNode":
      return <AlarmStatusForm />;
    case "org.thingsboard.rule.engine.action.TbAssignToCustomerNode":
      return <AlarmStatusForm />;
    case "org.thingsboard.rule.engine.action.TbCreateAlarmNode":
      return <AlarmStatusForm />;
    case "org.thingsboard.rule.engine.action.TbClearAlarmNode":
      return <AlarmStatusForm />;
    case "org.thingsboard.rule.engine.action.TbCreateRelationNode":
      return <AlarmStatusForm />;
    case "org.thingsboard.rule.engine.action.TbDeleteRelationNode":
      return <AlarmStatusForm />;
    case "org.thingsboard.rule.engine.delay.TbMsgDelayNode":
      return <AlarmStatusForm />;
    case "org.thingsboard.rule.engine.mail.TbSendEmailNode":
      return <AlarmStatusForm />;
    case "org.thingsboard.rule.engine.notification.TbNotificationNode":
      return <AlarmStatusForm />;
    case "org.thingsboard.rule.engine.sms.TbSendSmsNode":
      return <AlarmStatusForm />;
    case "org.thingsboard.rule.engine.mqtt.TbMqttNode":
      return <AlarmStatusForm />;
    case "org.thingsboard.rule.engine.flow.TbRuleChainInputNode":
      return <AlarmStatusForm />;
    default:
      return <div></div>;
  }
};

export default RuleNodeForm;
