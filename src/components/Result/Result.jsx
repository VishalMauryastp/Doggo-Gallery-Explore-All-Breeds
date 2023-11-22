import axios from "axios";
import React, { useEffect, useState } from "react";

const Result = ({ breed }) => {
  const [data, setData] = useState([]);
  console.log(breed);

  useEffect(() => {
    if (breed) {
      axios({
        method: "get",
        url: `https://dog.ceo/api/breed/${breed}/images`,
      })
        .then((result) => {
          setData(result.data.message);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [breed]);
  return (
    <div className="bg-white">
      {breed.length > 0 ? (
        <h1 className="text-2xl font-bold ml-8 mt-8"> Result for {breed} </h1>
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
