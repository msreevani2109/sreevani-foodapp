import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { MENU_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const params = useParams();
  const { resId } = params;
  console.log(resId);
  useEffect(() => {
    fetchMenu();
  }, []);
  const fetchMenu = async () => {
    const data = await fetch(MENU_URL + resId);
    const json = await data.json();
    console.log("resMenu");
    console.log(json);
    setResInfo(json.data);
  };
  if (resInfo == null) {
    return <Shimmer />;
  }
  const { name, costForTwoMessage, cuisines } = resInfo.cards[2].card.card.info;
  return (
    <div className="menu">
      <h2>{name}</h2>
      <ul>
        <li>{cuisines.join(",")}</li>
        <li>{costForTwoMessage}</li>
      </ul>
    </div>
  );
};

export default RestaurantMenu;
