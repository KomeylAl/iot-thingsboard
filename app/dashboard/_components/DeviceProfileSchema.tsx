import * as yup from "yup";

const idSchema = yup.object({
  id: yup.string().uuid().required(),
  entityType: yup.string().oneOf(["DEVICE_PROFILE", "RULE_CHAIN", "DASHBOARD", "OTA_PACKAGE"]).required()
});

const predicateSchema = yup.object({
  type: yup.string().required(),
  operation: yup.string().required(),
  value: yup.object({
    defaultValue: yup.mixed().required(),
    userValue: yup.mixed().required(),
    dynamicValue: yup.object({
      sourceType: yup.string().required(),
      sourceAttribute: yup.string().required(),
      inherit: yup.boolean().required()
    }).required()
  }).required()
});

const conditionSchema = yup.array().of(
  yup.object({
    key: yup.object({
      type: yup.string().required(),
      key: yup.string().required()
    }).required(),
    valueType: yup.string().required(),
    value: yup.string().required(),
    predicate: predicateSchema
  })
);

const alarmSchema = yup.array().of(
  yup.object({
    id: yup.string().required(),
    alarmType: yup.string().required(),
    createRules: yup.object().required(),
    clearRule: yup.object().shape({
      condition: yup.object().shape({
        condition: conditionSchema,
        spec: yup.object({
          type: yup.string().required(),
          unit: yup.string().required(),
          predicate: yup.object({
            defaultValue: yup.number().required(),
            userValue: yup.number().required(),
            dynamicValue: yup.object({
              sourceType: yup.string().required(),
              sourceAttribute: yup.string().required(),
              inherit: yup.boolean().required()
            }).required()
          }).required()
        }).required()
      }).required(),
      schedule: yup.object({
        type: yup.string().required(),
        dynamicValue: yup.object({
          sourceType: yup.string().required(),
          sourceAttribute: yup.string().required(),
          inherit: yup.boolean().required()
        }).required()
      }).required(),
      alarmDetails: yup.string().required(),
      dashboardId: idSchema.required()
    }).required()
  })
);

const profileSchema = yup.object({
  id: idSchema.required(),
  name: yup.string().required(),
  description: yup.string().required(),
  image: yup.string().required(),
  type: yup.string().oneOf(["DEFAULT"]).required(),
  transportType: yup.string().oneOf(["DEFAULT"]).required(),
  provisionType: yup.string().oneOf(["DISABLED"]).required(),
  defaultRuleChainId: idSchema.required(),
  defaultDashboardId: idSchema.required(),
  defaultQueueName: yup.string().required(),
  provisionDeviceKey: yup.string().required(),
  firmwareId: idSchema.required(),
  softwareId: idSchema.required(),
  defaultEdgeRuleChainId: idSchema.required(),
  version: yup.number().required(),
  default: yup.boolean().required(),
  profileData: yup.object({
    configuration: yup.object({
      type: yup.string().required()
    }).required(),
    transportConfiguration: yup.object({
      type: yup.string().required(),
      coapDeviceTypeConfiguration: yup.object({
        coapDeviceType: yup.string().required()
      }).required(),
      clientSettings: yup.object({
        powerMode: yup.string().oneOf(["PSM"]).required(),
        psmActivityTimer: yup.number().required(),
        edrxCycle: yup.number().required(),
        pagingTransmissionWindow: yup.number().required()
      }).required()
    }).required(),
    provisionConfiguration: yup.object({
      provisionDeviceSecret: yup.string().required(),
      type: yup.string().required()
    }).required(),
    alarms: alarmSchema
  }).required()
});

export default profileSchema;