// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
// AllMedicine CSS
import "./AllMedicine.css";

/* ------------- Components ------------- */
// SignIn Page
import SignIn from "../SignIn/SignIn";

// Backend Url
import baseUrl from "../../Helper/BaseUrl";

/* ------------- Fetch ------------- */
// Axios
import axios from "axios";

/* ------------- React Router Dom ------------- */
// UseNavigate && UseParams
import { useNavigate, useParams, Link } from "react-router-dom";

/* ------------- Storage ------------- */
// Cookies
import Cookies from "js-cookie";

import SearchIcon from "@mui/icons-material/Search";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const AllMedicine = () => {
  // Use Navigate
  const navigate = useNavigate();

  // All Medicine UseState
  const [mainMeds, setMainMeds] = useState([]);
  const [allMeds, setAllMeds] = useState([]);

  // UserEffect for get all the notes of the user
  useEffect(() => {
    // Take the Token and Userid
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");
    const type = Cookies.get("type");

    // If token and userid present
    if (token && userid && type) {
      // Axios Get Request from Backend
      axios
        .get(`${baseUrl}/api/medicines/all-medicine/${userid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // Set the Medicine Details
          // console.log(res.data);
          setMainMeds(res.data);
          setAllMeds(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      Cookies.remove("token");
      Cookies.remove("userid");
      Cookies.remove("type");
      window.location.href = "/signin";
      window.location.href("/signin");
    }
  }, []);

  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    // Apply the filter to the original medicine list
    const filteredMeds = mainMeds.filter((med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setAllMeds(filteredMeds);

    if (searchTerm === "") {
      setAllMeds(mainMeds);
    }
  };

  console.log(allMeds);

  return (
    <>
      <div className="allMedicine">
        <div className="filterBox">Filter Part</div>
        <div className="medBox">
          <div className="searchBar">
            <input
              type="text"
              name="search"
              id=""
              placeholder="Search Medicine"
              value={search}
              onChange={handleSearchChange}
            />
            <SearchIcon
              sx={{
                backgroundColor: "#498EDF",
                fontSize: "3rem",
                p: 1,
                borderRadius: "50%",
                color: "white",
                cursor: "pointer",
                left: "10px",
              }}
            />
          </div>
          <div className="products">
            {allMeds && allMeds.length !== 0 ? (
              <>
                {allMeds.map((am) => {
                  return (
                    <div
                      className="card"
                      style={{ width: "16rem", height: "420px" }}
                      key={am._id}
                    >
                      {/* Product Img */}
                      <img src={am.pic} alt="" className="card-img-top" />
                      {/* Product Body */}
                      <div className="card-body">
                        {/* Product Name */}
                        <h5 className="card-title">{am.name}</h5>
                        {/* In Stock */}
                        <p
                          style={{
                            color: am.inStock ? "green" : "red",
                            fontWeight: "500",
                          }}
                        >
                          {am.inStock ? "In Stock" : "Out of Stock"}
                        </p>
                        {/* Price */}
                        <div className="price">
                          <div className="rate">
                            <StarBorderIcon
                              sx={{
                                color: "rgb(223, 171, 2)",
                                mr: 0.2,
                              }}
                            />
                            4.5 Star
                          </div>
                          <div className="cartprice">
                            <ShoppingCartIcon
                              sx={{
                                mr: 1,
                                fontSize: "1.5rem",
                              }}
                            />
                            <strong>
                              <CurrencyRupeeIcon
                                sx={{
                                  fontSize: "18px",
                                }}
                              />
                              {am.price}
                            </strong>
                          </div>
                        </div>
                      </div>
                      <Link
                        className="view"
                        to={`/medicine/${am._id.toString()}`}
                      >
                        View
                      </Link>
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllMedicine;
