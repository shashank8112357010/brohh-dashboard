
import { Input, Button, Typography, } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setPopup } from "@/store/slice/dashboardSlice";

export function ForgetPassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [changeScreen, setChangeScreen] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [initialData, setInitialData] = useState({ email: null, otp: null, newPassword: null })









    const handleSendOTP = async (e) => {
        e.preventDefault()
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(initialData.email)) {
            setLoading(false)
            return dispatch(setPopup({ message: "Please Enter Valid Email", type: "warning" }))
        }
        else {
            setLoading(true)
            await userOTP({ email: initialData.email })
        }
    }

    const handleResetPassword = async (e) => {
       
    }


    return (
        <section className=" flex gap-4">
            <div className="w-[100%] lg:w-[60%] mt-24">

                <div className="text-center">
                    {changeScreen ? (
                        <>
                            <Typography variant="h2" className="font-bold mb-4">Forget Password</Typography>
                            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email to get OTP.</Typography>
                        </>
                    )
                        : (
                            <>
                                <Typography variant="h2" className="font-bold mb-4">Reset Password</Typography>
                                <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your otp and new password.</Typography>
                            </>
                        )

                    }
                </div>
                <form className="mt-8 mb-2 mx-auto w-72 sm:w-96 max-w-screen-lg lg:w-1/2">
                    {
                        changeScreen ? (
                            <>
                                <div className="mb-1 flex flex-col gap-6">
                                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                        Your email
                                    </Typography>
                                    <Input
                                        size="lg"
                                        placeholder="name@mail.com"
                                        onChange={(e) => setInitialData((prev) => ({ ...prev, email: e.target.value }))}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                    />
                                </div>
                            </>
                        )
                            :
                            (
                                <>
                                    <div className="mb-1 flex flex-col gap-6">
                                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                            Your email
                                        </Typography>
                                        <Input
                                            size="lg"
                                            disabled
                                            placeholder="name@mail.com"
                                            value={initialData.email || ""}
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                    </div>
                                    <div className="mb-1 flex flex-col gap-6">
                                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                            Enter OTP
                                        </Typography>
                                        <div className="relative">
                                            <Input
                                                type="tel"
                                                size="lg"
                                                placeholder="****************"
                                                onChange={(e) => setInitialData((prev) => ({ ...prev, otp: e.target.value }))}
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                            />
                                        </div>

                                    </div>
                                    <div className="mb-1 flex flex-col gap-6">
                                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                            Enter new password
                                        </Typography>
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                size="lg"
                                                placeholder="****************"
                                                onChange={(e) => setInitialData((prev) => ({ ...prev, newPassword: e.target.value }))}
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                            />
                                        </div>

                                    </div>

                                </>
                            )
                    }

                    {changeScreen ?
                        <Button className="mt-6" fullWidth
                            onClick={handleSendOTP}>
                            {isLoading ? <SyncLoader size={8} color="#fff" /> : "Send OTP"}
                        </Button>
                        :
                        <Button className="mt-6" fullWidth
                            onClick={handleResetPassword}>
                            {isLoading ? <SyncLoader size={8} color="#fff" /> : "Reset Password"}
                        </Button>

                    }



                    {/* <div className="flex items-center justify-end gap-2 mt-2">
                        <Typography variant="small" className="font-medium text-gray-900">
                            <Link to="/auth/forget-password">
                                Forgot Password
                            </Link>
                        </Typography>
                    </div> */}


                    <div className="flex items-center justify-center gap-2 mt-2">
                        Already have an account ?
                        <Typography variant="small" className="font-medium text-gray-900">
                            <Link to="/auth/sign-in">
                                Sign in
                            </Link>
                        </Typography>
                    </div>

                </form>

            </div>
            <div className="lg:w-[25%] mt-7 h-[580px] hidden lg:block">
                <img
                    src="/gif/logo.gif"
                    className="h-[580px] w-full object-cover rounded-3xl"
                />
            </div>

        </section>
    );
}

export default ForgetPassword;



