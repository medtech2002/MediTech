// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import baseUrl from "../../Helper/BaseUrl";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DiseasesChecker = () => {
  const [allSymptom, setAllSymptom] = useState([]);
  const [sym1, setSym1] = useState("");
  const [sym2, setSym2] = useState("");
  const [sym3, setSym3] = useState("");
  const [lastSymptom, setLastSymptom] = useState("");
  const [duration, setDuration] = useState("");
  const [availableSymptoms2, setAvailableSymptoms2] = useState([]); // Define as state variable
  const [availableSymptoms3, setAvailableSymptoms3] = useState([]); // Define as state variable
  const [symptoms, setSymptoms] = useState([]);

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
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    if (symptoms && symptoms.length !== 0) {
      const token = Cookies.get("token");
      const userid = Cookies.get("userid");

      if (token && userid) {
        axios
          .post(
            `${baseUrl}/api/symptoms/symptom-find/${userid}`,
            { symptoms: symptoms },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            // Handle the response and update the state
            if (Array.isArray(res.data)) {
              setLastSymptom(res.data[res.data.length - 1]);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }, [symptoms]);

  const [selectedSymptom1, setSelectedSymptom1] = useState("");

  const handleChangeSym1 = async (e) => {
    const symptom1 = e.target.value;
    setSelectedSymptom1(symptom1);
    setSym1(symptom1);
    setSym2(""); // Clear sym2 when sym1 changes
    setSym3(""); // Clear sym3 when sym1 changes
    setLastSymptom(""); // Clear lastSymptom when sym1 changes

    // Make an API call to fetch available symptoms for sym2 based on selectedSymptom1
    try {
      const token = Cookies.get("token");
      const userid = Cookies.get("userid");

      if (token && userid) {
        const response = await axios.post(
          `${baseUrl}/api/symptoms/symptom-find/${userid}`,
          { selectedSymptom1: symptom1 } // Pass symptom1 to the backend
        );

        if (Array.isArray(response.data)) {
          const availableSymptoms2 = response.data;
          setAvailableSymptoms2(availableSymptoms2);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeSym2 = async (e) => {
    const selectedSymptom2 = e.target.value;
    setSym2(selectedSymptom2);
    setSym3(""); // Clear sym3 when sym2 changes
    setLastSymptom(""); // Clear lastSymptom when sym2 changes
  
    // Check if selectedSymptom2 is the second last symptom in the array
    const isSecondLastSymptom = allSymptom.length > 1 && allSymptom[allSymptom.length - 2].symptom === selectedSymptom2;
  
    if (isSecondLastSymptom) {
      // If selectedSymptom2 is the second last symptom, automatically populate symptom 4
      const lastSymptomValue = allSymptom[allSymptom.length - 1].symptom;
      setSym3(lastSymptomValue);
      setLastSymptom(lastSymptomValue);
    }
  
    // Make an API call to fetch available symptoms for sym3 based on selectedSymptom1 and selectedSymptom2
    try {
      const token = Cookies.get("token");
      const userid = Cookies.get("userid");
  
      if (token && userid) {
        const response = await axios.post(
          `${baseUrl}/api/symptoms/symptom-find/${userid}`,
          { selectedSymptom1: sym1, selectedSymptom2 }
        );
  
        if (Array.isArray(response.data)) {
          const availableSymptoms3 = response.data;
          setAvailableSymptoms3(availableSymptoms3);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeSym3 = (e) => {
    const selectedSymptom3 = e.target.value;
    setSym3(selectedSymptom3);
    setLastSymptom(""); // Clear lastSymptom when sym3 changes
    setSymptoms([sym1, sym2, selectedSymptom3]);
  };

  const handleChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  return (
    <>
      <div className="box">
        <Box sx={{ width: "500px" }}>
          <FormControl fullWidth>
            <InputLabel id="symptom1-label">Symptom 1</InputLabel>
            <Select
              labelId="symptom1-label"
              id="symptom1"
              value={sym1}
              label="Symptom 1"
              onChange={handleChangeSym1}
            >
              {allSymptom.map((as) => (
                <MenuItem key={as._id} value={as.symptom}>
                  {as.symptom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {sym1 && (
            <FormControl fullWidth>
              <InputLabel id="symptom2-label">Symptom 2</InputLabel>
              <Select
                labelId="symptom2-label"
                id="symptom2"
                value={sym2}
                label="Symptom 2"
                onChange={handleChangeSym2}
              >
                {allSymptom.map((as) => (
                  <MenuItem key={as._id} value={as.symptom}>
                    {as.symptom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {sym2 && (
            <FormControl fullWidth>
              <InputLabel id="symptom3-label">Symptom 3</InputLabel>
              <Select
                labelId="symptom3-label"
                id="symptom3"
                value={sym3}
                label="Symptom 3"
                onChange={handleChangeSym3}
              >
                {allSymptom.map((as) => (
                  <MenuItem key={as._id} value={as.symptom}>
                    {as.symptom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {sym3 && (
            <FormControl fullWidth>
              <InputLabel id="duration-label">Duration</InputLabel>
              <Select
                labelId="duration-label"
                id="duration"
                value={duration}
                label="Duration"
                onChange={handleChangeDuration}
              >
                {/* Add duration options */}
                <MenuItem value="1">3 days to 1 week</MenuItem>
                <MenuItem value="2">3 days to 2 weeks</MenuItem>
                <MenuItem value="3">3 days to 3 weeks</MenuItem>
                <MenuItem value="3">1 month</MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>
      </div>
    </>
  );
};

export default DiseasesChecker;

