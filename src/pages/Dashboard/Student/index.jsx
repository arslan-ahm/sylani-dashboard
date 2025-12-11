import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCollectionLength } from "../../../config/CollectionLength";
import Table from "../../../components/Table";
import { ApartmentOutlined, TeamOutlined } from "@ant-design/icons";
import DialogSizes from "../../../components/DialogBox";
import { db } from "../../../config/firebase";
import { courseData } from '../../../contexts/courseData'
import { collection, getDocs } from "firebase/firestore";

function Student() {
  const { data } = useContext(courseData);
  const [recordCount, setRecordCount] = useState(0);

  const getStudentData = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    const array = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      array.push(data);
    });

    return array
    // console.log(array)
  };
  async function getRecordCountByCourseName() {
    try {
      const snapshot = await db
        .collection("students")
        .where("status", "==", true)
        .get();

        console.log('snapshot =>', snapshot)
      return snapshot.size;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  useEffect(() => {
    getRecordCountByCourseName()
      .then((count) => {
        if (count !== -1) {
          setRecordCount(count);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-evenly text-center">
        <Link to="/student" className="p-4 md:w-1/3 sm:w-1/2 w-full">
          <div
            className={`${true === "light" && "border-2"} ${
              true === "dark" && "shadow-slate-500"
            } shadow-[0_0_10px_rgba(0,0,0,0.3)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl`}
            style={{
              backgroundColor: true === "dark" ? "rgb(46 49 55)" : "",
              color: true === "dark" ? "white" : "",
            }}
          >
            <div
              className={` ${
                true === "light" ? "text-slate-600" : "text-slate-50"
              }  w-12 h-12 mb-3 inline-block`}
              viewBox="0 0 24 24"
            >
              <TeamOutlined
                style={{ fontSize: "55px", color: "rgb(51 65 85)" }}
              />
            </div>
            <h2
              className="title-font font-medium text-3xl text-black fonts1"
              style={{ color: true === "dark" ? "white" : "" }}
            >
              {useCollectionLength("students")}
            </h2>
            <p
              className={` ${
                true === "dark" ? "text-slate-50" : "text-slate-700"
              }  font-bold`}
              style={{ color: true === "dark" ? "white" : "" }}
            >
              Total Students
            </p>
          </div>
        </Link>
        <Link to="/student" className="p-4 md:w-1/3 sm:w-1/2 w-full">
          <div
            className={`${true === "light" && "border-2"} ${
              true === "dark" && "shadow-slate-500"
            } shadow-[0_0_10px_rgba(0,0,0,0.3)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl`}
            style={{
              backgroundColor: true === "dark" ? "rgb(46 49 55)" : "",
              color: true === "dark" ? "white" : "",
            }}
          >
            <div
              className={` ${
                true === "light" ? "text-slate-600" : "text-slate-50"
              }  w-12 h-12 mb-3 inline-block`}
              viewBox="0 0 24 24"
            >
              <TeamOutlined
                style={{ fontSize: "55px", color: "rgb(51 65 85)" }}
              />
            </div>
            <h2
              className="title-font font-medium text-3xl text-black fonts1"
              style={{ color: true === "dark" ? "white" : "" }}
            >
              {recordCount === -1 ? "0" : recordCount}
            </h2>
            <p
              className={` ${
                true === "dark" ? "text-slate-50" : "text-slate-700"
              }  font-bold`}
              style={{ color: true === "dark" ? "white" : "" }}
            >
              Present Students
            </p>
          </div>
        </Link>
        <Link to="/course" className="p-4 md:w-1/3 sm:w-1/2 w-full">
          <div
            className={`${true === "light" && "border-2"} ${
              true === "dark" && "shadow-slate-500"
            } shadow-[0_0_10px_rgba(0,0,0,0.3)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl`}
            style={{
              backgroundColor: true === "dark" ? "rgb(46 49 55)" : "",
              color: true === "dark" ? "white" : "",
            }}
          >
            <div
              className={` ${
                true === "light" ? "text-slate-600" : "text-slate-50"
              }  w-12 h-12 mb-3 inline-block`}
              viewBox="0 0 24 24"
            >
              <ApartmentOutlined
                style={{ fontSize: "55px", color: "rgb(51 65 85)" }}
              />
            </div>
            <h2
              className="title-font font-medium text-3xl text-black fonts1"
              style={{ color: true === "dark" ? "white" : "" }}
            >
              {useCollectionLength("courses")}
            </h2>
            <p
              className={` ${
                true === "dark" ? "text-slate-50" : "text-slate-700"
              }  font-bold`}
              style={{ color: true === "dark" ? "white" : "" }}
            >
              Total Courses
            </p>
          </div>
        </Link>
      </div>
      {/* Dialog Box */}
      <DialogSizes getStudentData={getStudentData} />
      {/* Table Content */}
      <Table getStudentData={getStudentData} />
    </>
  );
}

export default Student;
