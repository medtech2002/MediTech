// React & UseState & UseEffect
import React, { useState, useEffect } from "react";

// DiseasesChecker CSS
import "./DiseasesChecker.css";

/* ------------- Components ------------- */

/* ------------- Fetch ------------- */
// Axios
import axios, { all } from "axios";

/* ------------- React Router Dom ------------- */
// UseNavigate && UseParams
import { useNavigate, useParams } from "react-router-dom";

/* ------------- Storage ------------- */
// Cookies
import Cookies from "js-cookie";

// Backend Url
import baseUrl from "../../Helper/BaseUrl";

// React Scrollable Feed
import ScrollableFeed from "react-scrollable-feed";

/* ------------- MUI Component ------------- */
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

/* ------------- MUI Icons ------------- */

const DiseasesChecker = () => {
  const [allSymptom, setAllSymptom] = useState();

  // UseEffect for Loading Symptoms
  useEffect(() => {
    // Take the Token and Userid and UserType
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");
    const type = Cookies.get("type");
    // If token and userid present
    if (token && userid) {
      // Axios Post Request to Backend
      axios
        .get(`${baseUrl}/api/symptoms/all-symptoms/${userid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          //   console.log(res.data);
          setAllSymptom(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }, []);

  const [elseSymp, setElseSym] = useState();

  const [sym1, setSym1] = useState("");

  const [symptoms, setSymptoms] = useState([]);

  const handleChangeSym1 = (e) => {
    setSym1(e.target.value);
    setSymptoms([...symptoms, e.target.value]);
  };

  const [sym2, setSym2] = useState("");

  const handleChangeSym2 = (e) => {
    setSym2(e.target.value);
    setSymptoms([...symptoms, e.target.value]);
  };

  useEffect(() => {
    if (symptoms && symptoms.length !== 0) {
      const token = Cookies.get("token");
      const userid = Cookies.get("userid");
      // If token and userid present
      if (token && userid) {
        // Axios Post Request to Backend
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
            // console.log(res.data);
            setElseSym(res.data);
          })
          .catch((err) => {
            // console.log(err);
          });
      }
    }
  }, [symptoms]);

  return (
    <>
      <div className="box">
        <Box sx={{ width: "500px" }}>
          {allSymptom && (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Symptom 1</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sym1}
                label="Symptom 1"
                onChange={handleChangeSym1}
              >
                {allSymptom &&
                  allSymptom.map((as) => {
                    return (
                      <MenuItem key={as._id} value={as.symptom}>
                        {as.symptom}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          )}

          {elseSymp && (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Symptom 2</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sym2}
                label="Symptom 2"
                onChange={handleChangeSym2}
              >
                {elseSymp &&
                  elseSymp.map((as,i) => {
                    return (
                      <MenuItem key={i} value={as}>
                        {as}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          )}
        </Box>
      </div>
    </>
  );
};

export default DiseasesChecker;
