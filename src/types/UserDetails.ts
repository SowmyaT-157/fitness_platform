export interface UserDataTypes{
  id: string;
  name: string;
  email: string;
  password: string;
  image:string;
}

export interface verifyDataTypes{
  email: string;
  otp: string;
}

export interface signInDataTypes{
  email: string;
  password: string;
}


export type newImageTypes = {
    email:string;
    selectedFile:string;
}