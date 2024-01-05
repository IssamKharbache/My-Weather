import React, { useEffect, useRef, useState } from "react";

// importing images
import partlycloud from "../assets/partlycloud.png";
import snow from "../assets/snow.png";
import sun from "../assets/sun.png";
import clear from "../assets/clear.png";

//importing icons
import { WiHumidity } from "react-icons/wi";
import { TbWind } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
//spinner
import { Vortex } from "react-loader-spinner";

export const WeatherApp = () => {
  const city = useRef();
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [condition, setCondition] = useState(null);

  const search = async () => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: city.current.value },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      setFetchedData(response.data);

      setCondition(response.data.current.condition.text);
      setLoading(false);
      setError(false);
    } catch (err) {
      setError(true);
      setFetchedData(null);
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className=" w-full  h-screen mx-auto  ">
        <h1 className="text-6xl py-4 ml-5 flex justify-center items-center md:justify-start  font-Rubik text-white">
          My weather
        </h1>

        <div className="flex justify-center gap-12 m-7 md:m-0 ">
          {error ? (
            <span className="absolute bg-red-700 rounded-lg text-white py-2 px-2 top-[25%] md:top-[20%] left-[20%] md:left-[39%]">
              Cannot found city name , try again{" "}
            </span>
          ) : (
            ""
          )}

          <input
            ref={city}
            type="text"
            placeholder="Search..."
            required
            className="flex w-80 h-16  border-none rounded-md outline-none text-gray-500 pl-6 "
          />
          <button>
            {loading ? (
              <Vortex
                visible={true}
                height="40"
                width="40"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={["red", "blue", "green", "yellow", "green"]}
              />
            ) : (
              <IoIosSearch
                onClick={search}
                size={40}
                className=" mt-3  text-white rounded-full hover:text-yellow-400 cursor-pointer"
              />
            )}
          </button>
        </div>

        {fetchedData ? (
          <div className="flex gap-14 flex-col">
            <div className="w-[200px] h-[200px] ml-[33%] md:ml-[43%] pt-2  flex">
              <img
                src={
                  condition === "Partly cloudy"
                    ? partlycloud
                    : condition === "Patchy light snow"
                    ? snow
                    : condition === "Light snow"
                    ? snow
                    : condition === "Sunny"
                    ? sun
                    : condition === "Clear"
                    ? clear
                    : ""
                }
                alt="img"
              />{" "}
              <p className="text-2xl py-4 text-gray-200">{condition}</p>
            </div>
            <p className="flex justify-center items-center text-7xl mt-7 text-gray-300">
              {fetchedData
                ? fetchedData.current.temp_c.toString().split(".")[0]
                : "24"}{" "}
              °C
            </p>

            <p className="flex items-center text-xl justify-center text-gray-400">
              Feels like{" "}
              {fetchedData
                ? fetchedData.current.feelslike_c.toString().split(".")[0]
                : "24"}{" "}
              °C
            </p>
            <div className="flex justify-center mt-4 items-center">
              <div className="flex gap-10 text-gray-200 text-3xl">
                <p>
                  {" "}
                  {fetchedData ? fetchedData.location.name : "Casablanca"}{" "}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-10 md:gap-24">
              <div className="flex justify-center flex-col  items-center">
                <div className="flex gap-4 text-gray-200 text-3xl">
                  <WiHumidity size={40} className="mb-2" />
                  <p>{fetchedData ? fetchedData.current.humidity : "20"} %</p>
                </div>
              </div>
              <div className="flex justify-center flex-col  items-center">
                <div className="flex gap-4 text-gray-200 text-3xl">
                  <TbWind size={40} />
                  <p>{fetchedData ? fetchedData.current.wind_kph : "1"} km/h</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-start text-4xl text-gray-300 pt-24">
            Search your city name on top to see the weather
          </div>
        )}
      </div>
    </div>
  );
};
