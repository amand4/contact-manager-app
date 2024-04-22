import React, { createContext, useContext, useState } from "react";
import { UserProps } from "../../interfaces/User";
import { usersService } from "../../services/Users";
import { contactsService } from "../../services/Contacts";
import { googleMapsServices } from "../../services/GoogleMaps";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

if (!localStorage.getItem("appUex@users")) {
  localStorage.setItem("appUex@users", JSON.stringify([]));
  localStorage.setItem("appUex@contacts", JSON.stringify([]));
}

const UserStorage = ({ children }) => {
  const [formData, setFormData] = useState<UserProps>({
    name: "",
    email: "",
    dateBirth: "",
    cpf: "",
    phone: "",
    zipCode: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
    complement: "",
    street: "",
    password: "",
    lat: 0,
    lng: 0
  });

  const [listContacts, setContacts] = useState([]);
  const navigate = useNavigate();


  const saveData = (data: UserProps, userType: string) => {
    if (userType === "contacts") {
      contactsService.create(`appUex@${userType}`, data);
      toast.success('Contato cadastrado com sucesso', {
        autoClose: 1500
      });
      navigate('/dashboard');

    } else {
      usersService.create(`appUex@${userType}`, data);
      toast.success('Usuário cadastrado com sucesso', {
        autoClose: 1500
      });
      navigate('/login');

    }
  };

  const getAllContacts = async () => {
    const response = await contactsService.getAll("appUex@contacts");
    setContacts(response);
    return response;
  };

  const getContact = async (userId: string) => {
    const response = await contactsService.getContact(
      "appUex@contacts",
      userId
    );
    setFormData(formData);
    return response;
  };

  const deleteContact = async (userId: string) => {
    const response = await contactsService.deleteContact(
      "appUex@contacts",
      userId
    );
    return response;
  };

  const getLocation = async (address: string) => {
    const response = await googleMapsServices.getLocation(
      address
    );
    return response;
  };

  return (
    <UserContext.Provider
      value={{ formData, saveData, getLocation, getAllContacts, deleteContact, listContacts, getContact }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserStorage;

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an AppProvider");
  }
  return context;
};
