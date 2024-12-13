import { Card, CardHeader, CardBody, Typography, Avatar, Chip, Tooltip, Progress, Button, B } from "@material-tailwind/react";
import { authorsTableData } from "@/data";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import RegisterFreelancer from "@/components/RegisterFreelancer";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import NoData from "@/components/NoData";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { Link, useLocation } from "react-router-dom";
import { setHeaderDetails } from "@/store/slice/headerSlice";
import { DeleteModal } from "@/components/DeleteModal";
import IndividualProfile from "@/components/individualProfile";
import { setFreelancerData, setIndividualOpen } from "@/store/slice/freelancerSlice";
import { setPopup } from "@/store/slice/dashboardSlice";
import Pagination from "@/components/Pagination";

export function Testimonial() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [toggle, setToggle] = useState(false)
  const [deletedName, setDeletedName] = useState({ name: "", id: "" })
  const dispatch = useDispatch()
  const handleOpen = () => setOpen(!open);
  const [isIndividual, setIndividualData] = useState({ isOpen: false, userId: null })
  const { isIndividualOpen, } = useSelector((state) => state.freelancer);
  const { search } = useSelector((state) => state.header)
  const [isLoading , setLoading] = [true]


const freelancerDataArray=[]




  useEffect(() => {
    dispatch(setHeaderDetails(pathname))
  }, [])

  const showForm = () => {
    setIsFormVisible(true);
    boydHide()
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setToggle(document.body.classList.remove('overflow-hidden'))
  };

  const handleDeleteFreelancer = async (e, id) => {
   
  }

  const boydHide = () => {
    setToggle(document.body.classList.add('overflow-hidden'));
  }



  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">

        {
          !isIndividualOpen ?
            <>
              <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                  <Typography variant="h6" color="white">
                    Testimonial
                  </Typography>
                </CardHeader>
                {
                  isFormVisible &&
                  <div className={`fixed inset-0 bg-black z-20 bg-opacity-30 ${isFormVisible ? 'blurred-background' : ''}`}></div>
                }
                <div className="flex w-full justify-end pb-0">
                  <Button
                    variant="text"
                    onClick={() => { showForm() }}
                    className="bg-[#212121] text-white mr-4 mb-4 text-lg py-2 px-4 hover:bg-white hover:text-[#212121] border-2 hover:border-[#212121]"
                  >
                    +
                  </Button>
                </div>




                <CardBody className={` ${!freelancerDataArray ? "overflow-hidden" : "overflow-x-scroll"} px-0 pt-0 pb-2`}>
                  <table className="w-full table-auto">



                    {freelancerDataArray?.filter((item) => item?.username?.toLowerCase().includes(search?.toLowerCase())).length !== 0 &&


                      <thead>
                        <tr>
                          {["freelancer", "phone", "status", "state", "Actions"].map((el) => (
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



                    }


                    <tbody >

                      <tr>
                        <td colSpan={12}>
                          {(isLoading && !freelancerDataArray) &&
                            <div className="flex items-center justify-center h-52 p-3 mr-32 sm:mr-0">
                              <SyncLoader color="#000" size={15} />
                            </div>
                          }
                        </td>
                      </tr>

                      {false &&
                        freelancerDataArray?.filter((item) => item?.username?.toLowerCase().includes(search?.toLowerCase()))
                          .map((freelancer, key) => {
                            const className = `py-3 px-5 ${key === authorsTableData.length - 1
                              ? ""
                              : "border-b border-blue-gray-50"
                              }`

                            return (
                              <tr key={freelancer?.username}>
                                <td className={className}
                                  onClick={(e) => { dispatch(setIndividualOpen(true)), setIndividualData({ isOpen: true, data: freelancer }) }}
                                >
                                  <div className="flex items-center gap-4 capitalize">

                                    <Avatar src={freelancer?.profile ? freelancer?.profile : "/img/team-2.jpeg"}
                                      alt={freelancer?.username} size="sm" variant="rounded" />
                                    <div >
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-semibold cursor-pointer hover:text-black/75"
                                      >
                                        {freelancer?.firstName} {freelancer?.lastName}
                                      </Typography>
                                      <Typography className="text-xs lowercase font-normal text-blue-gray-500">
                                        {freelancer?.email}
                                      </Typography>
                                    </div>
                                  </div>
                                </td>
                                <td className={className}>
                                  <Typography className="text-xs font-semibold text-blue-gray-600">
                                    {freelancer?.phone}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Button variant="filled" color="green" className="py-1 px-2 text-[10px] rounded-lg">
                                    Online
                                  </Button>
                                </td>
                                <td className={className}>
                                  <Typography className="text-xs font-semibold text-blue-gray-600">
                                    {freelancer?.state}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <div className="flex flex-row gap-x-[8px] items-center my-2 py-2">
                                    {/* Edit  */}
                                    <div >
                                      <PencilIcon className="h-4 w-4 cursor-pointer text-black/80 hover:text-black" />
                                    </div>
                                    {/* Delete  */}
                                    <div onClick={() => {
                                      handleOpen();
                                      setDeletedName({ name: freelancer?.firstName, id: freelancer?._id })
                                    }}>
                                      <TrashIcon className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-600" />
                                    </div>
                                  </div>
                                </td>

                              </tr>
                            );
                          })}



                      {freelancerDataArray?.length === 0
                        ? <tr>
                          <td colSpan={9}>
                            <div className="flex flex-col justify-center items-center">
                              <img src="../../../img/Add.svg" alt="" width="391px" />
                              <p>PLEASE ADD MORE DATA</p>
                            </div>
                          </td>
                        </tr>
                        : freelancerDataArray?.filter((item) => item?.username?.toLowerCase().includes(search?.toLowerCase())).length === 0
                          ? <tr>
                            <td colSpan={9}>
                              <div className=" flex justify-center items-center">
                                <NoData />
                              </div>
                            </td>
                          </tr>
                          : ""
                      }
                    </tbody>
                  </table>
                </CardBody>
              </Card>

              <div className="flex items-start">
                {freelancerDataArray?.filter((item) => item?.username?.toLowerCase().includes(search?.toLowerCase())).length != 0
                  &&
                  <Pagination freelancerData={freelancerData || []} page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
                }
              </div>
            </>

            :

            <IndividualProfile data={isIndividual.data} />
        }

        {/* //Form ================================================================================> */}
        {true && (
          <>
            <div className="p-4 xl:ml-80 ">
              <Modal title="Add Freelancer" closeForm={closeForm} isFormVisible={isFormVisible} >
                <RegisterFreelancer closeForm={closeForm} />
              </Modal>
            </div>
          </>
        )}
        {/* //Form ================================================================================> */}

        {/* //DeleteForm ================================================================================> */}

        <DeleteModal handleOpen={handleOpen} open={open} deletedName={deletedName} handleDeleteFreelancer={handleDeleteFreelancer} isLoading={isLoading} />

        {/* //DeleteForm ================================================================================> */}

      </div>

    </>
  );
}

export default Testimonial;







