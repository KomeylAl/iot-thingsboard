import * as yup from "yup";

export const tenantSchema = yup.object({
  title: yup.string().required("عنوان الزامی است"),
  country: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  address: yup.string().optional(),
  address2: yup.string().optional(),
  zip: yup.string().optional(),
  phone: yup.string().required("تلفن الزامی است"),
  region: yup.string().optional(),
  profile: yup.string().optional(),
  additionalInfo: yup.object({
    description: yup.string().optional(),
  }),
  tenantProfileId: yup.object({
    id: yup.string().optional(),
    entityType: yup.string().optional(),
  }),
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
});

export const deviceSchema = yup.object({
  name: yup.string().required("نام الزامی است"),
  type: yup.string().optional(),
  label: yup.string().optional(),
  tenantId: yup.string(),
  additionalInfo: yup.object({
    description: yup.string().optional(),
    location: yup.string().optional(),
  }),
  deviceProfileId: yup.object({
    id: yup.string().optional(),
    entityType: yup.string().optional().default("DEVICE_PROFILE"),
  }),
});
