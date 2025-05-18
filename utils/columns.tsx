export const alarmColumns = [
  { header: "نام", accessor: "name" },
  { header: "نوع", accessor: "type" },
  { header: "شدت", accessor: "label" },
  { header: "وضعیت", accessor: "status" },
  { header: "زمان ایجاد", accessor: "status" },
];

export const telemetryColumns = [
  { header: "نام", accessor: "name" },
  { header: "نوع", accessor: "type" },
  { header: "شدت", accessor: "label" },
  { header: "وضعیت", accessor: "status" },
  { header: "زمان ایجاد", accessor: "status" },
];

export const auditColumns = [
  { header: "نام", accessor: "entityName" },
  { header: "نوع", accessor: "actionType" },
  { header: "وضعیت", accessor: "actionStatus" },
  { header: "زمان ایجاد", accessor: "createdTime" },
];

export const eventColumns = [
  { header: "سرور", accessor: "entityName" },
  { header: "روش", accessor: "actionType" },
  { header: "خطا", accessor: "actionStatus" },
  { header: "زمان رویداد", accessor: "createdTime" },
];

export const userColumns = [
  { header: "نام", accessor: "firstName" },
  { header: "نام خانوادگی", accessor: "lastName" },
  { header: "ایمیل", accessor: "email" },
  { header: "تلفن", accessor: "phone" },
];