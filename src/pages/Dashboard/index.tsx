import { SetStateAction, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Box,
  Grid
} from "@mui/material";
import { Edit, Delete, Add, Room } from "@mui/icons-material";
import { useUserContext } from "../../contexts/useStorage";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { UserEditProps } from "../../interfaces/User";
import Map from "../../components/Map";

const Dashboard = () => {
  const navigate = useNavigate();

  const { listContacts, getAllContacts, deleteContact } = useUserContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [contactLocalization, setContactLocalization] = useState<UserEditProps | null>(null);

  const handleDelete = async (id: string) => {
    await deleteContact(id);
    getAllContacts();
  };

  const handleSearch = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (id: string) => {
    navigate(`/contacts/edit/${id}`);
  };
  const handleAddContact = () => {
    navigate("/contacts/register");
  };

  const handleOpenMap = (contact: UserEditProps) => {
    setContactLocalization(contact);
  };

  const filteredContacts = listContacts?.filter((contact: UserEditProps) => {
    return (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.cpf.includes(searchTerm)
    );
  });

  useEffect(() => {
    getAllContacts();
  }, []);


  return (
    <Box>
      <Header />
      <Box sx={{ px: 3 }}>
        <Grid item container spacing={3} xs={12}>
          <Grid item md={5}>
            <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", mt: 5 }}>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                onChange={handleSearch}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleAddContact}
              >
                Adicionar contato
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table aria-label="contacts table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>CPF</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredContacts?.map((contact: UserEditProps) => (
                    <TableRow key={contact.id}>
                      <TableCell>{contact.name}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.cpf}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(contact.id)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(contact.id)}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleOpenMap(contact)}
                        >
                          <Room />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={7} xs={12}>
            {contactLocalization && <Map position={contactLocalization} />}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
