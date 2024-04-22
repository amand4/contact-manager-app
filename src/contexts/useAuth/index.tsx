import { useCallback, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usersService } from "../../services/Users";
import { toast } from 'react-toastify';
import { UserLoginProps } from '../../interfaces/User';

export const UserContext = createContext("");

const useAuth = ({ children }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem('appUex@userInfo'))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUser = async (userId: string) => {
    const response = await usersService.getUser(
      "appUex@users",
      userId
    );
    return response;
  };

  const signOut = useCallback(() => {
    localStorage.removeItem("appUex@userInfo");
    localStorage.removeItem("appUex@token");
    setUserData({});
    navigate('/login');
  }, [navigate]);


  const signIn = async ({ email, password }: UserLoginProps) => {


    try {
      const users = await usersService.getAll("appUex@users")
      const user = users.find((user) => user.email === email);

      if (!user) {
        toast.error('Ops! Usuário não encontrado', {
          autoClose: 1000
        });
        throw new Error('User not found');
      }

      if (user.password !== password) {
        toast.error('Ops! senha inválida', {
          autoClose: 1000
        });
        throw new Error('Invalid password');
      }

      // simulate return token
      const token = `eyJhbGciOiJIUzI1NiVCJ9${user.name}`;
      localStorage.setItem('appUex@token', token);
      const newUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      }
      localStorage.setItem('appUex@userInfo', JSON.stringify(newUser));
      setUserData(newUser)
      navigate('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const goBack = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  return (
    <UserContext.Provider
      value={{
        signIn,
        signOut,
        userData,
        getUser,
        isLoading,
        goBack
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default useAuth;
