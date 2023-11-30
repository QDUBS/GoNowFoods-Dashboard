import * as yup from "yup";

export const dishFormSchema = yup.object({
  name: yup.string().required("Dish name cannot be blank").min(2),
  image: yup.string().required("Dish image cannot be blank").min(2),
  description: yup
    .string()
    .required("Please provide more information about this item"),
  price: yup.number().required("Dish price cannot be blank"),
  category: yup.string().required("Select a category"),
  fileName: yup.string().notRequired(),
});
