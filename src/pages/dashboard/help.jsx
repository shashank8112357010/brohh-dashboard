import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  Chip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { GetHelpService, MarkStatusDoneHelpService } from "@/services/api.service";
import { SyncLoader } from "react-spinners";
import { setPopup } from "@/store/slice/dashboardSlice";
import { useDispatch } from "react-redux";

export function Help() {
  const [helpData, setHelpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false)
  const [rowIndex, setRowIndex] = useState("")
  const dispatch = useDispatch()



  const getHelpData = async () => {
    setLoading(true);
    try {
      const res = await GetHelpService();
      setHelpData(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHelpData();
  }, []);





  // handleMarkDelivery
  const handleMarkDelivered = async (Id, index) => {
    setRowIndex(index)
    console.log('data')
    setButtonLoading(true)
    await MarkStatusDoneHelpService(Id).then(() => {
      getHelpData()
      dispatch(setPopup({ message: "Help status updated ", type: "success" }))
      setButtonLoading(false)

    }).catch((err) => {
      console.log(err)
      dispatch(setPopup({ message: "Failed to mark help, Please try again ", type: "error" }))
      setButtonLoading(false)
    })
  };
  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12 min-h-screen">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Help
            </Typography>
          </CardHeader>

          <CardBody className="px-0 pt-0 pb-2">
            {loading ? (
              <div className="flex items-center justify-center h-52 p-3">
                <SyncLoader color="#000" size={15} />
              </div>
            ) : helpData.length === 0 ? (
              <div className="text-center py-10 text-gray-600">
                <Typography>No data available.</Typography>
              </div>
            ) : (
              <div className="overflow-x-auto min-h-[65vh]">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      {[
                        "Id",
                        "User Id",
                        "Order Id",
                        "Date",
                        "issue",
                        "Status",
                        "Action"
                      ].map((el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 py-3 px-5 text-left"
                        >
                          <Typography
                            variant="small"
                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                          >
                            {el}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {helpData.map((helpData, key) => (
                      <tr key={key} className="hover:bg-gray-50 border-b border-blue-gray-50">
                        <td className="py-3 px-5 text-xs font-bold text-black">{helpData._id.slice(-10)}</td>

                        <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">{helpData.userId.slice(-10)}</td>
                        <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">{helpData.orderId.slice(-10)}</td>
                        <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">{new Date(helpData.createdAt).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",

                        })}</td>
                        <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">{helpData.issue}</td>
                        <td

                        >
                          <Chip
                            variant="gradient"
                            color={helpData.status === "Pending" ? "yellow" : "green"}
                            value={helpData.status === 'Pending' ? helpData.status : "completed"}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        </td>
                        <td className="py-3 px-5">
                          <button
                            className={`w-16 text-xs font-medium py-1 px-1 text-white rounded ${helpData.status == "Pending"
                                ? "bg-black"
                                : "bg-gray-500 cursor-not-allowed"
                              }`}
                            disabled={helpData.status !== "Pending"}
                            onClick={() => handleMarkDelivered(helpData._id, key)}
                          >

                            {buttonLoading && key === rowIndex ? (
                              <SyncLoader size={3} color="#fff" />
                            ) : (
                              helpData.status === "Pending" ? "Resolve" : "Resolved"
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>


              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Help;
