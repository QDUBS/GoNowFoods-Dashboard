import * as yup from "yup";

export const companyFormSchema = yup.object({
  name: yup.string().required("Name cannot be blank"),
  image: yup.string().required("Image cannot be blank"),
  mobile_number: yup.string().required("Mobile cannot be blank"),
  delivery_fee: yup.number().required("Delivery fee cannot be blank"),
  min_delivery_time: yup
    .number()
    .required("Please provide a minimum delivery time"),
  max_delivery_time: yup
    .number()
    .required("Please provide a maximum delivery time"),
  fileName: yup.string(),
});

export const addressFormSchema = yup.object({
  house_no: yup.string().required("Name cannot be blank"),
  street1: yup.string().required("Image cannot be blank"),
  street2: yup.string().required("Mobile cannot be blank"),
  city: yup.string().required("Delivery fee cannot be blank"),
  state: yup.string().required("Please provide a minimum delivery time"),
  country: yup.string().required("Please provide a maximum delivery time"),
  postal_code: yup.string().required("Please provide a maximum delivery time"),
});

export const subscriptionFormSchema = yup.object({});
