import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SyncLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { setFormValue } from '@/store/slice/freelancerSlice';
import { setPopup } from '@/store/slice/dashboardSlice';
import InputAtom from './InputAtom';


const RegisterFreelancer = ({ closeForm }) => {
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.freelancer)


    const handleInput = (key, value) => {
        dispatch(setFormValue({ type: "fill", data: { key, value } }));
    };

    const handleFileInput = (selectedKey, selectedFile) => {
        // const fileURL = URL.createObjectURL(selectedFile);
        dispatch(setFormValue({ type: "fill", data: { key: selectedKey, value: selectedFile } }))
    }




  const handleSubmit = ()=>{

  }

    return (
        <div className=''>
            <form className="registerForm px-4 pt-6 max-w-[464px] pb-[7rem] mb-4 bg-white dark:bg-gray-800 rounded-b-lg h-[600px]  overflow-y-auto"
            >

                <div className="mb-4 flex flex-col sm:flex-row w-full ">
                    {/* First Name  */}
                    <div className=' w-full sm:w-1/2'>
                        <div className="mb-4 md:mr-2 md:mb-4">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 "
                                htmlFor="firstName"
                            >
                                First Name
                            </label>
                             <InputAtom id="fullName"  type="text" placeholder="first name" onchange={(e) => handleInput("firstName", e.target.value)}/>
                        </div>

                        <div className="mb-4 md:mr-2 md:mb-0">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 "
                                htmlFor="email"
                            >
                                Last Name
                            </label>
                            <InputAtom id="lastName"  type="text" placeholder="last name" onchange={(e) => handleInput("lastName", e.target.value)}/>
                        </div>
                    </div>

                    <div className='sm:w-1/2'>

                        {/* //profile photo   */}
                        <div className="md:ml-2">
                            <div className="w-2/3">
                                <label className="block sm:ml-2 mb-2 sm:text-center text-sm  w-full font-medium text-gray-900 " htmlFor="profile">
                                    Profile
                                </label>
                            </div>

                            <div className="flex items-center w-3/3">
                                <label htmlFor="profile" className={`flex flex-col items-center justify-center w-32 h-[8rem] rounded-[50%] cursor-pointer bg-gray-200`}>
                                    {/* //box image is showing  */}
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {data.profile ?
                                            <img className='w-[200px] h-[130px] object-cover rounded-full'
                                                src={window.URL.createObjectURL(data.profile)}
                                                alt='product Img!' />
                                            :
                                            <>
                                                <img className='w-[200px] h-[130px] object-cover rounded-full'
                                                    src="/img/upload-pic.png"
                                                    alt='product Img!' />
                                            </>

                                        }
                                    </div>

                                    <input className="hidden"
                                        id="profile"
                                        type="file"
                                        onChange={(e) => handleFileInput("profile", e.target.files[0])}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>




                </div>

                <div className="mb-6">
                    {/* Email  */}
                    <div className="mb-4 md:mr-2 md:mb-0">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 "
                            htmlFor="email"
                        >
                            Email
                        </label>
                       
                         <InputAtom id="email"  type="email" placeholder="name@gmail.com" onchange={(e) => handleInput("email", e.target.value)}/>
                    </div>
                </div>

                <div className="mb-4 md:flex w-3/3">
                    {/* User Name */}
                    <div className="mb-4 md:w-[48%] md:mb-0">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 "
                            htmlFor="username"
                        >
                            Username
                        </label>
                       
                         <InputAtom id="username"  type="text" placeholder="user name" onchange={(e) => handleInput("username", e.target.value)}/>
                    </div>


                    <div className="md:ml-2 md:w-[48%]">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 "
                            htmlFor="phone"
                        >
                            Phone
                        </label>
                       
                         <InputAtom id="phone"  type="tel" placeholder="phone" onchange={(e) => handleInput("phone", e.target.value)}/>
                    </div>
                </div>

                <div className="mb-6">
                    {/* Address */}
                    <div className="mb-4 md:mr-2 md:mb-0">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 "
                            htmlFor="address"
                        >
                            Address
                        </label>
                       
                        <InputAtom id="address"  type="text" placeholder="address" onchange={(e) => handleInput("address", e.target.value)}/>
                    </div>
                </div>


                <div className="mb-4 md:flex w-3/3">
                    {/* State  */}
                    <div className="mb-4 md:w-[48%] md:mb-0">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 "
                            htmlFor="state"
                        >
                            State
                        </label>
                       
                        <InputAtom id="state"  type="text" placeholder="state" onchange={(e) => handleInput("state", e.target.value)}/>

                    </div>
                    {/* //city  */}
                    <div className="md:ml-2 md:w-[48%]">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 "
                            htmlFor="city"
                        >
                            City
                        </label>
                       
                        <InputAtom id="city"  type="text" placeholder="city" onchange={(e) => handleInput("city", e.target.value)}/>
                    </div>
                </div>

                <div className="mb-4 md:flex w-3/3">
                    {/* //location  */}
                    <div className="mb-4 md:w-[48%] md:mb-0">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 "
                            htmlFor="location"
                        >
                            Location
                        </label>
                        
                        <InputAtom id="location"  type="text" placeholder="location" onchange={(e) => handleInput("location", e.target.value)}/>
                    </div>
                    {/* Pin Code  */}
                    <div className="md:ml-2 md:w-[48%]">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 "
                            htmlFor="pincode"
                        >
                            Pin code
                        </label>
                       
                        <InputAtom id="pincode"  type="tel" placeholder="000000" onchange={(e) => handleInput("pincode", e.target.value)}/>
                    </div>
                </div>



                {/* //button  */}
                <div className="mb-3 flex justify-center">

                    <button
                        className="w-2/4 sm:w-1/4 px-4 py-2 font-bold text-sm text-white bg-black rounded-lg hover:bg-gray-900"
                        type="button"
                        onClick={handleSubmit}
                    >
                        {isLoading ? <SyncLoader size={8} color="#fff" /> : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterFreelancer