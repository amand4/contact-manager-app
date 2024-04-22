import { UserProps } from '../../interfaces/User';

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

export async function getCep(zipCode: string): Promise<
  | {
    zipCode: string
    street: string
    neighborhood: string
    city: string
    state: string
  }
  | undefined
> {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${zipCode.replace(/\D/g, "")}/json/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await response.json()

    return {
      zipCode: data.cep,
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    }
  } catch (error) {
    console.error(error)
    return
  }
}
const getUser = async (key: string, userId: string) => {
  try {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const existingData = JSON.parse(storedData);
      const currentItem = existingData?.find((user: UserProps) => user.id === Number(userId));
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


export const usersService = {
  create,
  getCep,
  getAll,
  getUser
}