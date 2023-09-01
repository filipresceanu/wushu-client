import React from "react";
import "./CategoryData.css";
import { useState, useEffect } from "react";
import axios from "axios";
import register from "../../register-svgrepo-com.svg";
import { useCompetition } from "../../context/CompetitionContext";

export default function CategoryData() {
  const { events, selectedEvent, setSelectedEvent } = useCompetition();
  const [categoryData, setCategoryDate] = useState([]);

  useEffect(() => {
    (async () => await getCategories())();
  }, []);

  async function getCategories() {
    axios
      .get(`https://localhost:7230/api/Category/get-category/${selectedEvent}`)
      .then((response) => {
        setCategoryDate(response.data);
      });
  }

  return (
    <div class="table-wrapper">
      <table class="fl-table">
        <thead>
          <tr>
            <th>Categorie</th>
            <th>Varsta mai mica</th>
            <th>Varsta mai mare</th>
            <th>Sex</th>
            <th>Greutate mai mare</th>
            <th>Greutate mai mica</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map((data) => (
            <tr>
              <td>{data.name}</td>
              <td>{data.lessThanAge}</td>
              <td>{data.graterThanAge}</td>
              <td>{data.sex}</td>
              <td>{data.graterThanWeight}</td>
              <td>{data.lessThanWeight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
