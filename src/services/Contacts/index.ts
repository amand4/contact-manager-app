import { UserProps } from "../../interfaces/User";

const create = async (key: string, item: UserProps) => {
  let data: UserProps[] = JSON.parse(localStorage.getItem(key) || '[]');
  let newData: UserProps[] = [];

  if (item.id) {
    const currentItemIndex = data.findIndex((currentItem) => item.id === currentItem.id);
    if (currentItemIndex !== -1) {
      data[currentItemIndex] = {
        ...data[currentItemIndex],
        ...item
      };
    }
  } else {
    const newId = gerarId(data);
    const newItem = {
      ...item,
      id: newId
    };

    newData = [
      ...data,
      newItem
    ];
  }

  const string = JSON.stringify(newData.length > 0 ? newData : data);
  localStorage.setItem(key, string);
  return newData;
};

const getAll = async (key: string) => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("Erro ao receber dados da API:", error);
    return [];
  }
};

const getContact = async (key: string, userId: string) => {
  try {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const existingData = JSON.parse(storedData);
      const currentItem = existingData?.find((contact: UserProps) => contact.id === Number(userId))
      return currentItem
    }

  } catch (error) {
    console.error("Erro ao receber dados da API:", error);
    return [];
  }
};

const gerarId = (data: UserProps[]) => {
  return data?.length + 1

};

const deleteContact = (key: string, id: string) => {


  const data = JSON.parse(localStorage.getItem(key))

  if (key.length > 0 && id) {

    const currentItem = data.filter((currentItem: UserProps) => id !== currentItem.id)
    const string = JSON.stringify(currentItem)
    localStorage.setItem(key, string)

    return currentItem
  }

}
export const contactsService = {
  getAll,
  create,
  getContact,
  deleteContact
};