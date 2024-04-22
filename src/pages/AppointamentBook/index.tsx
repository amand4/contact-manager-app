import { Grid } from "@mui/material";
import { FormRegistration } from "../../components/Form";
import { useUserContext } from "../../contexts/useStorage";
import { UserProps } from "../../interfaces/User";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header";

export const AppointamentBook = () => {
  const { formData, getContact, saveData } = useUserContext();
  const [currentContact, setCurrentContact] = useState(formData)
  const { userId } = useParams();
  
  const fetchData = useCallback(async () => {
    if(userId) { 
    const response =  await getContact(userId)
      setCurrentContact(response)
    }
  }, [userId])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])


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
          userType="contacts"
          initialValues={currentContact}
          handleSave={saveData}
        />
      </Grid>
    </Grid>
  );
};
