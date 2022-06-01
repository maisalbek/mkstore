import React, { useEffect } from "react";

const Favorite = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div>Favorite page</div>;
};

export default Favorite;
