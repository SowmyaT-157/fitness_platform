export interface UserDataTypes{
  id: string;
  name: string;
  email: string;
  password: string;
  image:string;
}

export interface verifyDataTypes{
  email: string;
  code: string;
}

export interface signInDataTypes{
  email: string;
  password: string;
}