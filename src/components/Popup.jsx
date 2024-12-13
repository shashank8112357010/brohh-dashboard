import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToastContainer from './ToastContainer';
import { clearPopup } from '@/store/slice/dashboardSlice';

function Popup() {
    const [showMessage, setShowMessage] = useState(false)
    const dispatch = useDispatch();
    const { id, message, type } = useSelector(state => state.dashboard.popup);

    useEffect(() => {
        if (message && type) {
            setShowMessage(true);
            const timeout = setTimeout(() => {
                dispatch(clearPopup());
                setShowMessage(false);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [dispatch, message, type]);

    return (
        <ToastContainer message={message} type={type} showMessage={showMessage} setShowMessage={setShowMessage} />
    )
}

export default Popup;
