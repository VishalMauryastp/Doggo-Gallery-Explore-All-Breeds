import React, { useState } from "react";
import Home from "./components/Home/Home";
import Result from "./components/Result/Result";

const App = () => {
  const [breed, setBreed] = useState([]);

  return (
    <div className={`bg-[url("/dogimg.jpg")]  bg-cover  min-h-screen`}>
      <header>
        <h1 className="md:text-3xl lg:text-[40px] font-bold py-2 px-8 text-center mt-12">
          Doggo Gallery: Explore All Breeds
        </h1>
      </header>
      <main>
        <div>
          <Home breed={breed} setBreed={setBreed} />
          <Result breed={breed} setBreed={setBreed} />
        </div>
      </main>
      <footer class="text-center text-gray-500 text-sm py-4">
        {/* &copy; 2023 Your Company Name. All rights reserved. */}
      </footer>
    </div>
  );
};

export default App;
