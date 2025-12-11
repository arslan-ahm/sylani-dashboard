import React, { useContext } from "react";
import { setDoc, updateDoc } from "firebase/firestore";
import {
  DeleteOutlined,
  FileProtectOutlined,
  FormOutlined,
  TeamOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Card,
  Dialog,
  DialogBody,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useEffect, useState } from "react";
import { courseData } from "../../../contexts/courseData";
import { doc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useCollectionLength } from "../../../config/CollectionLength";

export default function DefaultTable() {
  const { data, setData } = useContext(courseData);
  const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = useState(false);
  const [isUpdateCourseDialogOpen, setIsUpdateCourseDialogOpen] =
    useState(false);
  const TABLE_HEAD = [
    "Course_Code.",
    "Title",
    "Discription",
    "Starts",
    "Ends",
    "Total Std",
    "Actions",
  ];
  const [tableRows, setTableRows] = useState([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const array = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      array.push(data);
    });
    // console.log(array)
    setTableRows(array);
    setData(array);
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteStd = async (id) => {
    try {
      await deleteDoc(doc(db, "courses", id));
      setTableRows(tableRows.filter((std) => std.id !== id));
      toast.success("Data Deleted");
    } catch (err) {
      console.error("Error deleting data:", err);
      toast.error("Error deleting data");
    }
  };
  async function getRecordCountByCourseName(courseName) {
    try {
      const snapshot = await db
        .collection("students")
        .where("course", "==", courseName) // Filter by 'course' field matching 'name'
        .get();

      // Return the number of matching records
      return snapshot.size;
    } catch (error) {
      console.error("Error fetching data:", error);
      return 0; // You can handle the error as needed
    }
  }
  const StdDefault = {
    id: new Date().getTime().toString(),
    code: "",
    name: "",
    discription: "",
    start_Time: "",
    end_Time: "",
  };
  const [stdData, setStdData] = useState(StdDefault);

  const handelChange = (e) => {
    // Handel change
    return setStdData({
      ...stdData,
      [e.target.name]: e.target.value,
    });
  };

  const openUpdate = async (id) => {
    setStdData(tableRows.find((std) => std?.id === id));
    handleEditForm();
  };

  const addCourse = async () => {
    // Handel submit
    try {
      await setDoc(doc(db, "courses", stdData.id), stdData);
      toast.success("Data Added successfully");
      setStdData(StdDefault);
      return;
    } catch (error) {
      toast.error("Error in adding document ");
      console.log("Error", error.message);
    }
  };

  const handleUpdate = async () => {
    const { id } = stdData;
    const stdToUpdate = tableRows.find((std) => std.id === id);

    const updatedStd = { ...stdToUpdate, ...stdData };

    try {
      await updateDoc(doc(db, "courses", stdToUpdate.id), updatedStd);
      setTableRows(
        tableRows.map((std) => {
          if (std.id === id) {
            return updatedStd;
          }
          return std;
        })
      );
      setStdData(StdDefault);
      toast.success("Data Updated");
    } catch (err) {
      toast.success("Data Updated");
    }
    handleEditForm(null);
  };

  const [size, setSize] = useState(null);
  const handleAddForm = () => {
    setIsAddCourseDialogOpen(true);
  };

  const handleEditForm = () => {
    setIsUpdateCourseDialogOpen(true);
  };

  return (
    <>
      <div className="flex flex-wrap justify-evenly text-center">
        <Link to="/course" className="p-4 sm:w-1/2 w-full">
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
              <FileProtectOutlined
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
        <Link to="/student" className="p-4 sm:w-1/2 w-full">
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
      </div>
      {/* Dialog Box */}
      <div className="flex items-center justify-end px-4 mt-3 mb-6">
        <div
          className="font-bold cursor-pointer text-gray-500"
          onClick={() => getData()}
        >
          <Typography
            variant="large"
            color="blue-gray"
            className="px-1 aspect-square mr-3 shadow-md rounded-full"
          >
            <ReloadOutlined />
          </Typography>
        </div>
        <div className="text-end">
          <Button
            style={{
              background: "green",
            }}
            className="font-semibold text-white"
            onClick={() => handleAddForm("sm")}
            variant="gradient"
          >
            Add Course
          </Button>
        </div>
      </div>
      {/* Add Form */}
      <Dialog
        open={isAddCourseDialogOpen}
        size={size || "md"}
        handler={() => setIsAddCourseDialogOpen(false)}
        onClickOutside={() => setIsAddCourseDialogOpen(false)}
      >
        <DialogBody style={{ textAlign: "center" }}>
          {/* UPDATE Form */}
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Add New Course
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Enter Complete Data below
            </Typography>
            <form className="mt-8 mb-2 w-full">
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  name="code"
                  type="text"
                  value={stdData.code}
                  size="lg"
                  label="Course Code"
                  onChange={(e) => handelChange(e)}
                />
                <Input
                  name="name"
                  value={stdData.name}
                  size="lg"
                  label="Title"
                  onChange={(e) => handelChange(e)}
                />
                <Textarea
                  name="discription"
                  value={stdData.discription}
                  size="lg"
                  label="Discription"
                  onChange={(e) => handelChange(e)}
                />
                <div className="flex gap-2">
                  <Input
                    type="date"
                    name="start_Time"
                    value={stdData.start_Time}
                    size="lg"
                    label="Starts At"
                    onChange={(e) => handelChange(e)}
                  />
                  <Input
                    type="date"
                    name="end_Time"
                    value={stdData.end_Time}
                    size="lg"
                    label="Ends At"
                    onChange={(e) => handelChange(e)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="text"
                  color="red"
                  onClick={() => setIsAddCourseDialogOpen(false)}
                  className="mr-2 text-red-600 bg-red-50 my-6"
                >
                  <span>Close</span>
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={() => addCourse()}
                  className=" bg-green-600 text-white text-semibold my-6"
                >
                  <span>Add Course</span>
                </Button>
              </div>
              <ToastContainer />
            </form>
          </Card>
        </DialogBody>
      </Dialog>

      {/* Update Form */}
      <Dialog
        open={isUpdateCourseDialogOpen}
        size={size || "md"}
        handler={() => setIsUpdateCourseDialogOpen(false)}
        onClickOutside={() => setIsUpdateCourseDialogOpen(false)}
      >
        <DialogBody style={{ textAlign: "center" }}>
          {/* UPDATE Form */}
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Update Course
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Add New Data below
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-full">
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  name="code"
                  type="text"
                  value={stdData.code}
                  size="lg"
                  label="Course Code"
                  onChange={(e) => handelChange(e)}
                />
                <Input
                  name="name"
                  value={stdData.name}
                  size="lg"
                  label="Title"
                  onChange={(e) => handelChange(e)}
                />
                <Textarea
                  name="discription"
                  value={stdData.discription}
                  size="lg"
                  label="Discription"
                  onChange={(e) => handelChange(e)}
                />
                <div className="flex gap-2">
                  <Input
                    type="date"
                    name="start_Time"
                    value={stdData.start_Time}
                    size="lg"
                    label="Starts At"
                    onChange={(e) => handelChange(e)}
                  />
                  <Input
                    type="date"
                    name="end_Time"
                    value={stdData.end_Time}
                    size="lg"
                    label="Ends At"
                    onChange={(e) => handelChange(e)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="text"
                  color="red"
                  onClick={() => setIsUpdateCourseDialogOpen(false)}
                  className="mr-2 text-red-600 bg-red-50 my-6"
                >
                  <span>Close</span>
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={() => handleUpdate()}
                  className=" bg-green-600 text-white text-semibold my-6"
                >
                  <span>Update Course</span>
                </Button>
              </div>
              <ToastContainer />
            </form>
          </Card>
        </DialogBody>
      </Dialog>

      {/* Table Content */}
      <Card className="h-full w-full overflow-scroll">
        <ToastContainer />
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows?.map(
              (
                { id, code, name, discription, start_Time, end_Time },
                index
              ) => {
                const isLast = index === tableRows.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={code}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {code}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {discription}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {start_Time}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {end_Time}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {() => getRecordCountByCourseName(name)}
                      </Typography>
                    </td>
                    <td className={`flex justify-start space-x-4 ${classes}`}>
                      <Typography
                        as="a"
                        href="#"
                        variant="large"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <FormOutlined onClick={() => openUpdate(id)} />
                      </Typography>
                      <Typography
                        as="a"
                        href="#"
                        variant="large"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <DeleteOutlined onClick={() => deleteStd(id)} />
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
}
