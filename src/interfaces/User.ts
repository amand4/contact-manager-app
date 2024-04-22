export interface UserProps {
  id?: string | undefined;
  name: string;
  email: string;
  dateBirth: string;
  cpf: string;
  phone: string;
  zipCode: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  complement: string;
  street: string;
  password: string;
  lat: number;
  lng: number;
}

export interface UserEditProps {
  id: string;
  name: string;
  email: string;
  dateBirth: string;
  cpf: string;
  phone: string;
  zipCode: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  complement: string;
  street: string;
  password: string;
  lat: number;
  lng: number;
}

export interface UserLoginProps {
  email: string;
  password: string;
}
