import { LoadingButton } from "@mui/lab";
import {
  Box,
  Divider,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { useAxios } from "../../hooks";

const PatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = useAxios({ autoSnackbar: true });
  const [isLoading, setIsLoading] = useState(false);

  const [details, setDetails] = useState({
    patient_id: "",
    name: "",
    age: "",
    contact_details: "",
    gender: "",
    date_of_birth: null,
    address: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const onDatePicked = (e) => {
    const date_obj = new Date(e);
    const v = `${date_obj.getFullYear()}-${
      date_obj.getMonth() + 1
    }-${date_obj.getDate()}`;
    setDetails({ ...details, date_of_birth: v });
  };

  const getData = async () => {
    const res = await api.get(`/api/patients/${parseInt(id)}`);
    if (res.status === 200) {
      setDetails({ ...res.data });
    } else {
      navigate(-1);
    }
  };

  const createNew = async () => {
    setIsLoading(true);
    const res = await api.post(`/api/patients/`, {
      ...details,
      date_of_birth: details.date_of_birth || null,
    });
    if (res.status === 200) {
      navigate(-1);
    }
    setIsLoading(false);
  };

  const update = async () => {
    setIsLoading(true);
    const res = await api.put(`/api/patients/${parseInt(id)}`, {
      patient_id: details.patient_id,
      name: details.name,
      age: details.age,
      contact_details: details.contact_details,
      gender: details.gender,
      date_of_birth: details.date_of_birth || null,
      address: details.address,
    });
    if (res.status === 200) {
      navigate(-1);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      getData();
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          paddingLeft: "12px",
        }}
        variant="dense"
        disableGutters={true}
      >
        <BackButton backFunction={() => navigate(-1)} />
        <Typography variant="h5">{id ? "Edit" : "New"}</Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ flexDirection: "column", padding: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography variant="p">ID</Typography>
          </Box>
          <TextField
            size="small"
            sx={{ width: "70%" }}
            margin="dense"
            value={details?.patient_id || ""}
            name="patient_id"
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography variant="p">Name</Typography>
          </Box>
          <TextField
            size="small"
            sx={{ width: "70%" }}
            margin="dense"
            value={details?.name || ""}
            name="name"
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography variant="p">Age</Typography>
          </Box>
          <TextField
            size="small"
            sx={{ width: "70%" }}
            margin="dense"
            value={details?.age || ""}
            name="age"
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography variant="p">Contact Details</Typography>
          </Box>
          <TextField
            size="small"
            sx={{ width: "70%" }}
            margin="dense"
            value={details?.contact_details || ""}
            name="contact_details"
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography variant="p">Gender</Typography>
          </Box>

          <TextField
            select
            fullWidth
            label="Gender"
            size="small"
            sx={{ width: "70%" }}
            margin="dense"
            value={details?.gender || ""}
            name="gender"
            onChange={handleChange}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography variant="p">Date Of Birth</Typography>
          </Box>

          <MobileDatePicker
            inputFormat="yyyy-MM-dd"
            value={details?.date_of_birth}
            onChange={onDatePicked}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ width: "70%" }}
                size="small"
                margin="dense"
              />
            )}
          />

          {/* <TextField
            size="small"
            sx={{ width: "70%" }}
            margin="dense"
            placeholder="YYYY-MM-DD"
            value={details?.date_of_birth || ""}
            name="date_of_birth"
            onChange={handleChange}
          /> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography variant="p">Address</Typography>
          </Box>
          <TextField
            size="small"
            sx={{ width: "70%" }}
            margin="dense"
            value={details?.address || ""}
            name="address"
            onChange={handleChange}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "10px",
        }}
      >
        <LoadingButton
          variant="contained"
          loading={isLoading}
          size="small"
          sx={{ marginRight: "5px" }}
          onClick={id ? update : createNew}
        >
          Save
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default PatientForm;
