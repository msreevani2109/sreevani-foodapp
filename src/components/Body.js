import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
//import resObjList from "../utils/mockData";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  //whenever state variables update,react triggers a reconciliatio cycle(re-renders the component6)
  //console.log("body");
  //const [listOfRestaurants, setListOfRestaurants] = useState(resObjList);
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    //fetch method is provided by javascript API to make network requests, fetching the data/resources from server
    //fetch will return promise
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    // const data = await fetch(
    //   "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4099835&lng=78.58906549999999&collection=83639&tags=layout_CCS_Biryani&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    // );
    const json = await data.json();
    //console.log(json);
    //optionalchaining
    //conditional rendering

    const resData =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    console.log(resData);
    setListOfRestaurants(resData);
    setFilteredRestaurants(resData);
  };
  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="body">
      <div className="filter">
        <div className="search-button">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => {
              console.log(searchText);
              //filter the restaurants based on input and upadte on UI
              const filteredRes = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filteredRes);
            }}>
            search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.1
            );
            setFilteredRestaurants(filteredList);
          }}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurants.map((resObj) => (
          <Link key={resObj.info.id} to={"/restaurants/" + resObj.info.id}>
            <RestaurantCard resData={resObj} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
