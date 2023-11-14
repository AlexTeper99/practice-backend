export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  phoneNumber: string;
  phoneNumberTwo?: string;
  email: string;
  gender: string;
  birthDate: Date;
  newsletterSuscribed: boolean;
  newsletterPartnersSuscribed: boolean;
  password: string;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
