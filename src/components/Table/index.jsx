import { updateDoc } from "firebase/firestore";
import {
  DeleteOutlined,
  FormOutlined,
  UserOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  Card,
  Checkbox,
  Dialog,
  DialogBody,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useContext, useEffect, useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "antd";
import { courseData } from "../../contexts/courseData";

export default function DefaultTable({ getStudentData }) {
  const TABLE_HEAD = [
    "Roll_No.",
    "Name",
    "Course",
    "Phone",
    "email",
    "Status",
    "Action",
  ];
  const [tableRows, setTableRows] = useState([]);
  const { data, setData } = useContext(courseData);
  const getData = async () => {
    setTableRows(await getStudentData());
  };

  const deleteStd = async (rollNo) => {
    try {
      await deleteDoc(doc(db, "students", rollNo));
      setTableRows(tableRows.filter((std) => std.rollNo !== rollNo));
      toast.success("Data Deleted");
    } catch (err) {
      console.error("Error deleting data:", err);
      toast.error("Error deleting data");
    }
  };
  const StdDefault = {
    rollNo: "",
    name: "",
    course: "",
    phone: "",
    email: "",
    status: false,
  };
  const [stdData, setStdData] = useState(StdDefault);

  const handelChange = (e) => {
    // Handel change
    return setStdData({
      ...stdData,
      [e.target.name]:
        e.target.name === "status" ? e.target.checked : e.target.value,
    });
  };

  const openUpdate = async (rollNo) => {
    setStdData(tableRows.find((std) => std.rollNo === rollNo));
    handleOpen("sm");
  };

  const handleUpdate = async () => {
    const { rollNo } = stdData;
    const stdToUpdate = tableRows.find((std) => std.rollNo === rollNo);

    const updatedStd = { ...stdToUpdate, ...stdData };

    try {
      await updateDoc(doc(db, "students", rollNo), updatedStd);
      setTableRows(
        tableRows.map((std) => {
          if (std.rollNo === rollNo) {
            return updatedStd;
          }
          return std;
        })
      );
      toast.success("Data Updated");
    } catch (err) {
      toast.success("Data Updated");
    }
    handleOpen(null);
  };

  useEffect(() => {
    getData();
  }, []);
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);

  return (
    <>
      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={size || "md"}
        handler={handleOpen}
      >
        <DialogBody style={{ textAlign: "center" }}>
          {/* UPDATE Form */}
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Update Student
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Enter New Data below
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-full">
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  name="rollNo"
                  type="number"
                  value={stdData.rollNo}
                  size="lg"
                  label="Roll No."
                  onChange={(e) => handelChange(e)}
                />
                <Input
                  name="name"
                  value={stdData.name}
                  size="lg"
                  label="Name"
                  onChange={(e) => handelChange(e)}
                />
                <Input
                  name="phone"
                  value={stdData.phone}
                  size="lg"
                  label="Phone"
                  onChange={(e) => handelChange(e)}
                />
                <Input
                  name="email"
                  value={stdData.email}
                  size="lg"
                  label="Email"
                  onChange={(e) => handelChange(e)}
                />
              </div>
              <Select
                variant="outlined"
                selected={stdData.course}
                onChange={(value) =>
                  handelChange({ target: { name: "course", value } })
                }
                label="Select Course"
              >
                {data && data.length > 0 ? (
                  data.map((course, index) => (
                    <Option key={index} value={course?.name}>
                      {course?.name}
                    </Option>
                  ))
                ) : (
                  <Option disabled>No Course Available</Option>
                )}
              </Select>
              <div className="flex justify-center md:justify-start items-center my-2">
                <Checkbox
                  onChange={(e) => handelChange(e)}
                  label="Available(Status)"
                  checked={stdData.status}
                  name="status"
                  ripple={true}
                  className="text-black accent-slate-600 font-semibold"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  variant="text"
                  color="red"
                  onClick={() => handleOpen(null)}
                  className="mr-2 bg-red-50 my-6"
                >
                  <span>Close</span>
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={(e) => handleUpdate(e)}
                  className=" bg-green-600 text-white text-semibold my-6"
                >
                  <span>Update Data</span>
                </Button>
              </div>
              <ToastContainer />
            </form>
          </Card>
        </DialogBody>
      </Dialog>
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
              ({ rollNo, name, course, phone, email, status }, index) => {
                const isLast = index === tableRows.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={rollNo}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {rollNo}
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
                        {course}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {phone}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {status ? (
                          <UserOutlined className='relative text-green-600 text-xl before:w-[4rem] before:content-["Active"] before:text-white before:font-semibold before:bg-gray-800 before:text-sm before:absolute before:-top-[50%] before:-translate-y-[50%] before:left-[50%] before:-translate-x-[50%] before:hidden hover:before:inline-block' />
                        ) : (
                          <StopOutlined className="text-red-600 text-lg" />
                        )}
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
                        <FormOutlined onClick={() => openUpdate(rollNo)} />
                      </Typography>
                      <Typography
                        as="a"
                        href="#"
                        variant="large"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <DeleteOutlined onClick={() => deleteStd(rollNo)} />
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
