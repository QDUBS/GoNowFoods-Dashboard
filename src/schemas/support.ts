import * as yup from "yup";

export const supportFormSchema = yup.object({
  issue: yup.string().required("Issue cannot be blank").min(2),
  subject: yup.string().required("Subject cannot be blank").min(2),
  message: yup
    .string()
    .required("Please describe your issue"),
});
