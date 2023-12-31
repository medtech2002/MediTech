// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
import "./DiseasesChecker.css";
import axios from "axios";
import Cookies from "js-cookie";
import baseUrl from "../../Helper/BaseUrl";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

const DiseasesChecker = () => {
  const [allSymptom, setAllSymptom] = useState([]);
  const [sym1, setSym1] = useState("");
  const [sym2, setSym2] = useState("");
  const [sym3, setSym3] = useState("");
  const [sym4, setSym4] = useState("");
  const [duration, setDuration] = useState("");

  const [on, setOn] = useState(false);

  // Define as state variables using useState
  const [availableSymptoms2, setAvailableSymptoms2] = useState([]);
  const [availableSymptoms3, setAvailableSymptoms3] = useState([]);
  const [availableSymptoms4, setAvailableSymptoms4] = useState([]);

  // First UseEffect
  useEffect(() => {
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");

    if (token && userid) {
      axios
        .get(`${baseUrl}/api/symptoms/all-symptoms/${userid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAllSymptom(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleChangeSym1 = async (e) => {
    const symptom1 = e.target.value;
    setSym1(symptom1);
    setSym2("");
    setSym3("");
    setSym4("");
    setAvailableSymptoms3([]);
    setOn(false);

    const token = Cookies.get("token");
    const userid = Cookies.get("userid");

    if (token && userid) {
      // Make an API call to fetch available symptoms for Symptom 2 based on selectedSymptom1
      axios
        .post(
          `${baseUrl}/api/symptoms/symptom-find/${userid}`,
          { symptoms: [symptom1] },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setAvailableSymptoms2(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChangeSym2 = async (e) => {
    const selectedSymptom2 = e.target.value;
    setSym2(selectedSymptom2);
    setSym3("");
    setSym4("");
    setAvailableSymptoms3([]);
    setOn(false);

    const token = Cookies.get("token");
    const userid = Cookies.get("userid");

    if (token && userid) {
      // Make an API call to fetch available symptoms for Symptom 2 based on selectedSymptom1
      axios
        .post(
          `${baseUrl}/api/symptoms/symptom-find/${userid}`,
          { symptoms: [sym1, selectedSymptom2] },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setAvailableSymptoms3(res.data);
          if (res.data.length === 1) {
            setSym3(res.data[0]);
            setOn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChangeSym3 = async (e) => {
    const selectedSymptom3 = e.target.value;
    setSym3(selectedSymptom3);
    setSym4("");
    setOn(false);

    const token = Cookies.get("token");
    const userid = Cookies.get("userid");

    if (token && userid) {
      // Make an API call to fetch available symptoms for Symptom 2 based on selectedSymptom1
      axios
        .post(
          `${baseUrl}/api/symptoms/symptom-find/${userid}`,
          { symptoms: [sym1, sym2, selectedSymptom3] },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setAvailableSymptoms4(res.data);
          if (res.data.length === 1) {
            setSym4(res.data[0]);
            setOn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const handleSubmitDisease = () => {
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");

    if (
      (sym1 !== "") & (sym2 !== "") &&
      (sym3 !== "" || sym4 !== "") &&
      duration !== "" &&
      token &&
      userid
    ) {
      axios
        .post(
          `${baseUrl}/api/symptoms/suggest-med/${userid}`,
          { symptoms: [sym1, sym2, sym3, sym4], durations: duration },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="box">
        <Box
          sx={{
            width: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControl
            fullWidth
            sx={{
              m: 2,
            }}
          >
            <InputLabel id="symptom1-label">Symptom 1</InputLabel>
            <Select
              labelId="symptom1-label"
              id="symptom1"
              value={sym1}
              label="Symptom 1"
              onChange={handleChangeSym1}
              color="secondary"
              variant="outlined"
            >
              {allSymptom.map((as) => (
                <MenuItem key={as._id} value={as.symptom}>
                  {as.symptom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            sx={{
              m: 2,
            }}
          >
            <InputLabel id="symptom2-label">Symptom 2</InputLabel>
            <Select
              disabled={sym1 ? false : true}
              labelId="symptom2-label"
              id="symptom2"
              value={sym2}
              label="Symptom 2"
              onChange={handleChangeSym2}
              color="warning"
              variant="outlined"
            >
              {availableSymptoms2.map((as, i) => (
                <MenuItem key={i} value={as}>
                  {as}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            sx={{
              m: 2,
            }}
          >
            <InputLabel id="symptom3-label">Symptom 3</InputLabel>
            <Select
              disabled={
                availableSymptoms3.length !== 0 &&
                availableSymptoms3.length !== 1
                  ? false
                  : true
              }
              labelId="symptom3-label"
              id="symptom3"
              value={sym3}
              label="Symptom 3"
              onChange={handleChangeSym3}
              color="error"
              variant="outlined"
            >
              {availableSymptoms3.map((as, i) => (
                <MenuItem key={i} value={as}>
                  {as}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            sx={{
              m: 2,
            }}
          >
            <InputLabel id="duration-label">Duration</InputLabel>
            <Select
              disabled={on ? false : true}
              labelId="duration-label"
              id="duration"
              value={duration}
              label="Duration"
              onChange={handleChangeDuration}
            >
              {/* Add duration options */}
              <MenuItem value="3 days to 1 week">3 days to 1 week</MenuItem>
              <MenuItem value="3 days to 2 weeks">3 days to 2 weeks</MenuItem>
              <MenuItem value="3 days to 3 weeks">3 days to 3 weeks</MenuItem>
              <MenuItem value="1 month">1 month or more than</MenuItem>
            </Select>
          </FormControl>

          <Button
            color="success"
            variant="contained"
            onClick={handleSubmitDisease}
            sx={{
              m:2
            }}
          >
            Submit
          </Button>
        </Box>
      </div>
    </>
  );
};

export default DiseasesChecker;
