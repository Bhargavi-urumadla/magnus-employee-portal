export interface Employee {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  address: string;
  country: string;
  city: string;
  otherCity?: string;
  skills: string[];
  createdAt?: Date;
  updatedAt?: Date;
}