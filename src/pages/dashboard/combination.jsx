import { setPopup } from "@/store/slice/dashboardSlice";
import { Card, CardHeader, CardBody, Typography, Chip, } from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";



const projectsData = [
    { title: "Material XD Version", client: "Pranav Bhardwaj", freelancer: "Mohit Jadega", budget: 98000, status: "Completed" },
    { title: "Website Redesign", client: "Alex Thompson", freelancer: "Emily Carter", budget: 75000, status: "In Progress" },
    { title: "Mobile App Development", client: "Sophie Williams", freelancer: "Daniel Anderson", budget: 120000, status: "Completed" },
    { title: "E-commerce Platform", client: "Michael Johnson", freelancer: "Olivia Brown", budget: 150000, status: "Completed" },
    { title: "Logo Design", client: "Aria Davis", freelancer: "Ethan White", budget: 50000, status: "In Progress" }
]



export function Combination() {
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(setPopup({ message: "In Project section", type: "info" }))
    // }, [])

    return (
        <>
            <div className="mt-12 mb-8 flex flex-col gap-12">
                <Card>
                    <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                        <Typography variant="h6" color="white">
                            Combination
                        </Typography>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {["title", "client", "freelancer", "budget", "status"].map(
                                        (el) => (
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
                                        )
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {projectsData.map(
                                    ({ title, client, freelancer, budget, status }, key) => {
                                        const className = `py-3 px-5 ${key === projectsData.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                            }`;

                                        return (
                                            <tr key={title}>
                                                <td className={className}>
                                                    <div className="flex items-center gap-4">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-bold"
                                                        >
                                                            {title}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={className}>
                                                    <Typography
                                                        variant="small"
                                                        className="text-xs font-medium text-blue-gray-600"
                                                    >
                                                        {client}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Typography
                                                        variant="small"
                                                        className="text-xs font-medium text-blue-gray-600"
                                                    >
                                                        {freelancer}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Typography
                                                        variant="small"
                                                        className="text-xs font-medium text-blue-gray-600"
                                                    >
                                                        {budget}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Chip
                                                        variant="gradient"
                                                        color={status === "Completed" ? "green" : "blue-gray"}
                                                        value={status}
                                                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default Combination;
