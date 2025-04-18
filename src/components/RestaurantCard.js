import { CDN_URL } from "../utils/constants";
const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, costForTwo, cuisines, avgRating, sla } =
    resData.info;
  return (
    <div className="res-card">
      <img
        src={CDN_URL + cloudinaryImageId}
        className="res-card-img"
        alt="chocolateicecream"
      />
      <h3>{name}</h3>
      <h4>{costForTwo}</h4>
      <h4>{cuisines}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{sla.deliveryTime} minutes</h4>
    </div>
  );
};

export default RestaurantCard;
