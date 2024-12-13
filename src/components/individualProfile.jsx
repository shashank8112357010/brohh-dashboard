import { Card, CardBody, CardHeader, Avatar, Typography, } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIndividualOpen as setFreelancerIndividual } from "@/store/slice/freelancerSlice";
import { useLocation } from "react-router-dom";
import { IndividualModal } from "./IndividualModel";

function IndividualProfile({ data }) {
    const { pathname } = useLocation()
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()


    const handleOpen = () => setOpen(!open);

    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };

    const handleIndividualOpen = () => {
        return true
    };

    const listingData = [
        { key: "username", value: data?.username },
        { key: "firstName", value: data?.firstName },
        { key: "lastName", value: data?.lastName },
        { key: "email", value: data?.email },
        { key: "phone", value: data?.phone },
        { key: "address", value: data?.address },
        { key: "location", value: data?.location },
        { key: "state", value: data?.state },
        { key: "city ", value: data?.city },
        { key: "pincode", value: data?.pincode },

    ]


    return (
        <>
            <div className="flex justify-end px-4 cursor-pointer" onClick={handleIndividualOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 hover:text-black/70">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            <Card className="mx-1 mb-6 lg:mx-4 border border-blue-gray-100">
                <CardBody className="p-4">
                    <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                        <div className="flex items-center gap-6">
                            <div onClick={() => handleOpen()} >
                                <Avatar src={data?.profile ? data?.profile : "/img/team-2.jpeg"}
                                    alt={data?.username} size="xxl" variant="rounded" />

                            </div>
                            <div>
                                <Typography variant="h5" color="blue-gray" className="mb-1 capitalize">
                                    {data?.firstName}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="font-normal text-blue-gray-600 capitalize"
                                >
                                    {data?.role}
                                </Typography>
                            </div>
                        </div>

                    </div>

                    <div className=" mb-12 flex flex-col gap-4 sm:px-4 ">

                        {/* Profile info  */}
                        <CardHeader
                            color="transparent"
                            shadow={false}
                            floated={false}
                            className="mx-0 mt-0 flex items-center justify-between gap-1"
                        >
                            <Typography variant="h6" color="blue-gray">
                                Profile Information
                            </Typography>
                        </CardHeader>

                        <CardBody className="p-0">


                            <ul className="grid grid-cols-1 sm:grid-cols-2 mt-12 gap-4 p-0 ">

                                {listingData.map((item, index) => {
                                    return (
                                        <li key={index} className="flex items-center gap-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-semibold capitalize whitespace-nowrap"
                                            >
                                                {`${item.key} :`}
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                className="font-normal capitalize text-blue-gray-500"

                                            >
                                                {item.value}
                                            </Typography>
                                        </li>
                                    )
                                })}
                            </ul>
                        </CardBody>
                    </div>

                    <div className="sm:px-4 pb-4 grid">

                        <IndividualModal handleOpen={handleOpen} open={open} src={data?.profile} />


                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default IndividualProfile;