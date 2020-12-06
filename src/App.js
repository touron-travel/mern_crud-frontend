import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import { API } from "./backend";

function App() {
  const [foodName, setFoodName] = useState("");
  console.log("foodName", foodName);
  const [days, setDays] = useState();
  console.log("days", days);

  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");

  useEffect(() => {
    Axios.get(`${API}/read`).then((response) => {
      setFoodList(response.data);
    });
  }, [foodList]);

  const addToList = () => {
    console.log("Foodname fields:", foodName);
    console.log("Days fields:", days);

    Axios.post(`${API}/insert`, {
      foodName: foodName,
      days: days,
    });
    setFoodName("");
    setDays("");
  };

  const updateFood = (id) => {
    Axios.put(`${API}/update`, {
      id: id,
      newFoodName: newFoodName,
    });
  };
  const deleteFood = (id) => {
    Axios.delete(`${API}/delete/${id}`, {
      id: id,
    });
  };

  return (
    <>
      <div className="app-image">
        <div className="app">
          <h1 className="title">CRUD App with MERN</h1>
          <label className="foodname">Food Name:</label>
          <input
            type="text"
            value={foodName}
            onChange={(event) => {
              setFoodName(event.target.value);
            }}
          />
          <label className="days">Days Since Ate:</label>
          <input
            type="number"
            value={days}
            onChange={(event) => {
              setDays(event.target.value);
            }}
          />
          <button onClick={addToList}>Add To List</button>
          <h1 className="foodlist">Food List</h1>

          {foodList.map((val, key) => {
            return (
              <div key={key} className="list">
                <div className="headtag">
                  <h1>Food Name:</h1>
                  <h1>{val.foodName}</h1>
                </div>
                <div className="headtag">
                  <h1>Days Since Ate:</h1>
                  <h1>{val.daysSinceIAte}</h1>
                </div>
                <div className="food-list">
                  <input
                    type="text"
                    placeholder="New Food name"
                    onChange={(event) => {
                      setNewFoodName(event.target.value);
                    }}
                  />
                  <div>
                    <button onClick={() => updateFood(val._id)}>Update</button>
                    <button onClick={() => deleteFood(val._id)}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
