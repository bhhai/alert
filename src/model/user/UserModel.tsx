export interface IUser {
  id?: number;
  full_name: string;
  avatar_url?: string;
  email?: string;
  phone_number?: string;
  username: string;
  password?: string;
  roles?: string;
  status?: "active" | "locked";
  created_at?: string;
  updated_at?: string;
  expired_cookie?: string;
  department_id?: string | number;
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserPassword {
  password: string;
  newPassword: string;
  newConfirm: string;
}

export interface IForgot {
  username?: string;
  phone_number: string;
  otp: string;
  password: string;
  password_confirmation: string;
  type: string;
}

export const stepForgot = {
  verifiedPhone: "verified_phone",
  verifiedOtp: "verified_otp",
  newPassword: "new_password",
  resendOtp: "resend_otp",
};

export const UserInfoFakeData: IUser = {
  full_name: "Bùi Hoàng Hải",
  username: "admin",
  password: "admin",
  email: "haibh@gmail.com",
  status: "active",
  phone_number: "093245435",
};
