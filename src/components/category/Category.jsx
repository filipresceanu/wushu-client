import React from "react";
import "./Category.css";
import { useState, useEffect } from "react";
import axios from "axios";
import register from "../../register-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { useCompetition } from "../../context/CompetitionContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Category() {
  const { events, selectedEvent, setSelectedEvent } = useCompetition();
  const [categoriesAge, setCategoriesAge] = useState([]);
  const [categoryAge, setCategoryAge] = useState();
  const [sexCategory, setSexCategory] = useState("M");
  const [lessThanWeight, setLessThanWeight] = useState(0);
  const [greaterThanWeight, setGreaterThanWeight] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => await getAgeCategories())();
  }, []);

  async function getAgeCategories() {
    axios
      .get("https://localhost:7230/api/AgeCategory/get-all-age-categories")
      .then((response) => {
        setCategoriesAge(response.data);
      });
  }

  async function getAgeCategory(ageCategoryId) {
    axios
      .get(
        `https://localhost:7230/api/AgeCategory/get-age-categoty-id/${ageCategoryId}`
      )
      .then((response) => {
        setCategoryAge(response.data);
      });
  }

  const createCategory = async () => {
    axios.put(
      `https://localhost:7230/api/Category/create-category/${selectedEvent}/${categoryAge}`,
      {
        sex: sexCategory,
        lessThanWeight: lessThanWeight,
        graterThanWeight: greaterThanWeight,
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createCategory();
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="form_event">
      <Form className="form_style">
        <div className="flex-fill">
          <Form.Group>
            <Form.Label>Selecteaza sexul</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(event) => setSexCategory(event.target.value)}
              value={sexCategory}
            >
              <option value="M">Masculin</option>
              <option value="F">Feminin</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="flex-full">
          <Form.Group className="mb-3" controlId="formDatetimeInceput">
            <Form.Label>Greutate mai mare decat</Form.Label>
            <Form.Control
              type="number"
              placeholder="50"
              onChange={(event) => {
                setGreaterThanWeight(event.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </div>
        <div className="flex-full">
          <Form.Group className="mb-3" controlId="formDatetimeInceput">
            <Form.Label>Greutate mai mica decat</Form.Label>
            <Form.Control
              type="number"
              placeholder="60"
              onChange={(event) => {
                setLessThanWeight(event.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </div>
      </Form>
      <Form.Select
        aria-label="Default select example"
        className="form_select"
        onChange={(event) => setCategoryAge(event.target.value)}
      >
        {categoriesAge.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Form.Select>

      <Button variant="primary" onClick={handleSubmit}>
        Adauga
      </Button>
    </div>
  );
}
