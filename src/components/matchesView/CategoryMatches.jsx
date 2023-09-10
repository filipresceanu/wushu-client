import React from "react";
import "./CategoryMatches.css";
import Matches from "./Matches";

export default function CategoryMatches({ category }) {
  if (category.matches.length === 0) {
    return;
  }

  return (
    <>
      <div className="category">
        <div>
          <div className="category-title">Varsta</div>
          <div>{category.seniority}</div>
        </div>
        <div>
          <div className="category-title">Sex</div>
          <div>{category.sex}</div>
        </div>
        <div>
          <div className="category-title">Greutate mai mica</div>
          <div>{category.lessThanWeight} Kg</div>
        </div>
        <div>
          <div className="category-title">Greutate mai mare</div>
          <div>{category.graterThanWeight} Kg</div>
        </div>
      </div>
      <Matches matches={category.matches} />
    </>
  );
}
