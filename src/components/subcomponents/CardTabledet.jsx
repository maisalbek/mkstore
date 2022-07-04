import React, { useState } from "react";
import Card from "@mui/material/Card";

const CardTabledet = ({ item }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Card
        key={item.id}
        sx={{
          maxWidth: 262,
          height: 360,
          padding: "0",
          border: "none",
          borderRadius: "0",
        }}
      >
        <div className="cardTable-image-container">
          <img
            width="262px"
            height="360px"
            src={item.image[currentPhoto]}
            alt=""
          />
        </div>
      </Card>
    </div>
  );
};

export default CardTabledet;
