import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";

const courseData = createContext();

const DataFunc = ({ children }) => {
  const [data, setData] = useState([]);
  const getCourseData = async() => {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const array = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      array.push(data);
    });
    setData(array);
  }

  useEffect(() => {
    getCourseData();
  },[data])
  return (
    <courseData.Provider value={{data, setData}}>
      {children}
    </courseData.Provider>
  );
}

export default DataFunc;
export { courseData };
