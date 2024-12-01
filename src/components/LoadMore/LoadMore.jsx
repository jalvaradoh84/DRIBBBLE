import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const LoadMore = ({ startCursor, endCursor, hasPreviousPage, hasNextPage }) => {
  const navigate = useNavigate();

  const handleNavigation = (direction) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (direction === "next" && hasNextPage) {
      currentParams.delete("startCursor");
      currentParams.set("endCursor", endCursor);
    } else if (direction === "first" && hasPreviousPage) {
      currentParams.delete("endCursor");
      currentParams.set("startCursor", startCursor);
    }

    const newParams = currentParams.toString();
    const newPathName = `${window.location.pathname}?${newParams}`;

    navigate(newPathName);
  };

  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {hasPreviousPage && (
        <Button
          title="First Page"
          handleClick={() => handleNavigation("first")}
        />
      )}
      {hasNextPage && (
        <Button title="Next" handleClick={() => handleNavigation("next")} />
      )}
    </div>
  );
};

export default LoadMore;