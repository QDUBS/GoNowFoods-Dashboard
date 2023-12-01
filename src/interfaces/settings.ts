export interface ICompanyFormInputs {
  name: string;
  image: string;
  mobile_number: string;
  delivery_fee: number;
  min_delivery_time: number;
  max_delivery_time: number;
  fileName: string;
}

export interface IAddressFormInputs {
  house_no: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

export interface ISubscriptionFormInputs {}
