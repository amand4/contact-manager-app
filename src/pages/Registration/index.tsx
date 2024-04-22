import { Grid } from "@mui/material";
import { FormRegistration } from "../../components/Form";
import { UserContext, useUserContext } from "../../contexts/useStorage";
import { useLocation, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";

export const Registration = () => {
  const { saveData } = useUserContext();
  const location = useLocation();

  const isRegistrationContact = location.pathname.includes("contacts") ? "contacts" : "users";


  const [currentContact, setCurrentContact] = useState({
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
  })
  const { getUser, goBack } = useContext(UserContext);

  const { userId } = useParams();

  const fetchData = useCallback(async () => {
    if (userId) {
      const response = await getUser(userId)
      setCurrentContact(response)
    }
  }, [userId])

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <Grid container component="main">
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormRegistration
          userType={isRegistrationContact}
          initialValues={currentContact}
          handleSave={saveData}
          goBack={goBack}
        />
      </Grid>
    </Grid>
  );
};
