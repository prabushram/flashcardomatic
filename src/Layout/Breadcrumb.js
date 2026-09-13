import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ items }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li
              className={isCurrent ? "breadcrumb-item active" : "breadcrumb-item"}
              key={`${item.label}-${index}`}
              aria-current={isCurrent ? "page" : undefined}
            >
              {isCurrent || !item.to ? item.label : <Link to={item.to}>{item.label}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;