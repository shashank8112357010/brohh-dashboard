import { setData, setRole, setToken } from "@/helper/tokenHelper";
import { setUserName, setUserProfile, setUserRole } from "@/store/slice/userSlice";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Input, Button, Typography, } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { setPopup } from "@/store/slice/dashboardSlice";
import { AdminLoginService } from "@/services/api.service";


export function SignIn() {
  const [isLoading, setLoading] = useState(false)
  const [hide, setHide] = useState(false)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const navigate = useNavigate()



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    await AdminLoginService(formData).then((res) => {
      setToken(res.data.token)
      setData(res.data.user)
     
      dispatch(setUserName(res.data.user.name))
      setLoading(false)
      dispatch(setPopup({ message: "Logged In Successfully" || "Server Error", type: "success" }))

      navigate("/dashboard/home")
      console.log(res);
    }).catch((err) => {
      dispatch(setPopup({ message: err.response.data.message || "Server Error", type: "error" }))
      setLoading(false)
      console.log(err);
    })

  }


  return (
    <section className=" flex gap-4">
      <div className="w-[100%] lg:w-[60%] mt-24">

        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-72 sm:w-96 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@gmail.com"
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your password
            </Typography>
            <div className="relative">
              <Input
                type={hide ? "text" : "password"}
                size="lg"
                placeholder="****************"
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="h-5 w-5 absolute right-3 bottom-3.5 cursor-pointer"
                onClick={() => setHide(!hide)}
              >
                {hide ?
                  <EyeIcon />
                  :
                  <EyeSlashIcon />
                }
              </div>
            </div>

          </div>
          <div className="flex items-center justify-end gap-2 mt-2">
            <Typography variant="small" className="font-medium text-gray-900">
              <Link to="/auth/reset-password">
                Forgot Password
              </Link>
            </Typography>
          </div>

          <Button className="mt-6" fullWidth onClick={handleSubmit}>
            {isLoading ? <SyncLoader size={8} color="#fff" /> : "Sign In"}
          </Button>

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

export default SignIn;
