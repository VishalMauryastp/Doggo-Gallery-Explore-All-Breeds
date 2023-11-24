import axios from "axios";
import React, { useEffect, useState } from "react";

const Result = ({ breed, selectedSubcetagory }) => {
  const [data, setData] = useState([]);
  console.log(selectedSubcetagory);

  const subBreed = `/${selectedSubcetagory}`;

  useEffect(() => {
    if (breed) {
      axios({
        method: "get",
        url: `https://dog.ceo/api/breed/${breed}${selectedSubcetagory ? subBreed :""}/images`,
      })
        .then((result) => {
          setData(result.data.message);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [breed,selectedSubcetagory]);
  return (
    <div className={`bg-white  ${data.length > 0 ? "min-h-[calc(100vh-90px)]":""} `}>
      {data.length > 0 ? (
        <h1 className="text-2xl font-bold ml-8 pt-8">
          Result for{" "}
          <span className=" uppercase text-black/60">
           '{breed} {selectedSubcetagory}'
          </span>
        </h1>
      ) : null}

      {data.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 mt-8">
          {data.map((val, i) => (
            <div key={i} className="h-[400px]">
              <img
                className="w-full h-full"
                src={val}
                alt={`Dog ${i}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Result;
