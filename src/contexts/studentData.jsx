import React, { createContext, useState } from "react";

const studentContext = createContext();

function Data({ children }) {
  const [stdData, setStdData] = useState([]);
  return (
    <studentContext.Provider value={{ stdData, setStdData }}>
      {children}
    </studentContext.Provider>
  );
}

export default Data;
export { studentContext };
