/** @format */

export interface IHomeActionPayload {
  payload: IPayloadHome;
  callback?: ICallback;
}
export interface IResponse {
  status: number;
  data: any;
  errorMessage: '';
  success: boolean;
  message: string;
}
export type ICallback = (results: IResponse) => void;

export interface IAppState {
  loading: boolean;
  language: string;
  error: string | null;
  isAuth: boolean;
  user?: any;
  profile?: any;
}
export interface IPayloadHome {
  isObject?: boolean;
  redirect?: boolean;
  isPaginate?: boolean;
  formData?: any; // IParamsRequest;
  dataKey?: keyof IAppState;

  isPagination?: boolean;
  type?: string | undefined | null;
  endPoint?: string;
  headers?: any;
  isFormData?: boolean;
}

export enum ESetting {
  aboutUs = 'AboutUs',
  policyPasscode = 'PolicyPasscode',
  conditions = 'Conditions',
  banners = 'Banners',
  referral_policy = 'ReferralPolicy',
  withdraw_policy = 'WithdrawPolicy',
  deposit_policy = 'DepositPolicy',
}
