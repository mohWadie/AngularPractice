export interface User {
  user: {
    userName: string;
    email: string;
    fullName: string;
    phoneNo: string;
    dob: Date;
    registrationDate: Date;
  };
  token: string;
}
