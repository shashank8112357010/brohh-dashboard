import React, { useEffect, useState } from 'react'

const ToastContainer = ({ message, type, showMessage, setShowMessage }) => {
    const [bgColor, setBgColor] = useState(null)
    const [icon, setIcon] = useState(null)



    useEffect(() => {
        switch (type) {
            case "success":
                setBgColor("#A8F1C6")
                setIcon("../../img/Success.svg")
                break;
            case "error":
                setBgColor("#F6A7A3")
                setIcon("../../img/Error.svg")
                break;
            case "warning":
                setBgColor("#FFD38A")
                setIcon("../../img/Warning.svg")
                break;
            case "info":
                setBgColor("#5CD3E9")
                setIcon("../../img/Info.svg")
            default:
                setBgColor(null)
                setIcon(null)
        }
    }, [type])

    return (
        <div className={`z-[999] fixed mx-auto w-full flex justify-center transition-all duration-300 ease-in-out ${showMessage ? "top-12" : "-top-20 fade-out "}`}>
            {showMessage && (
                <div className={`${showMessage ? "visible z-50" : "hidden"}`}>
                    <div className={`w-[300px] sm:w-[350px] md:w-[400px] flex justify-between rounded-lg px-6 py-6 gap-[16px]`} role='alert'
                        style={{ backgroundColor: bgColor }}
                    >
                        <div className='flex flex-row gap-5'>
                            <div>
                                <img src={icon}
                                    loading='lazy'
                                    onError={(event) => event.target.src = "../../img/Success.svg"}
                                    alt="toastifyIcon" />
                            </div>
                            <div>
                                <p className='text-[14px] text-[#0A1811] font-normal'>{message}</p>
                            </div>
                        </div>
                        <div onClick={() => setShowMessage(false)}>
                            <img className='cursor-pointer'
                                loading='lazy'
                                onError={(event) => event.target.src = "../../img/Cancel.svg"}
                                src="../../img/Cancel.svg"
                                alt="cancelButton" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ToastContainer