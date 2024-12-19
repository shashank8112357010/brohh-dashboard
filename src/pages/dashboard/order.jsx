import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import {
  GetOrdersService,
  MarkStatusDoneOrdersService
} from '@/services/api.service'
import { SyncLoader } from 'react-spinners'
import NoData from '@/components/NoData'
import { setPopup } from '@/store/slice/dashboardSlice'
import { useDispatch } from 'react-redux'

export function Order() {
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const getOrderData = () => {
    GetOrdersService()
      .then((res) => {
        setLoading(false)
        setOrderData(res?.data?.data || [])
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  useEffect(() => {
    getOrderData()
  }, [])

  const handleMarkDelivered = async (orderId) => {
    await MarkStatusDoneOrdersService(orderId)
      .then(() => {
        getOrderData()
        dispatch(setPopup({ message: 'Marked Dilivered ', type: 'success' }))
      })
      .catch((err) => {
        console.log(err)
        dispatch(
          setPopup({
            message: 'Failed to mark order, Please try again ',
            type: 'error'
          })
        )
      })
  }

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12 min-h-screen">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Orders
            </Typography>
          </CardHeader>

          <CardBody className="px-0 pt-0 pb-2">
            {loading ? (
              <div className="flex items-center justify-center h-52 p-3">
                <SyncLoader color="#000" size={15} />
              </div>
            ) : orderData.length === 0 ? (
              <NoData />
            ) : (
              <div className="overflow-x-auto min-h-[65vh]">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-[11px]">
                      {[
                        'Order Id',
                        'Name',
                        'Quantity',
                        'Size',
                        'Color',
                        'Currency',
                        'Payment',
                        'Status',
                        'Actions'
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
                    {orderData.map((order, key) => (
                      <tr
                        key={order.orderId}
                        className="hover:bg-gray-50 text-xs border-b border-blue-gray-50 font-medium"
                      >
                        <td className="py-3 px-5 text-xs font-bold text-black ">
                          {order.orderId}
                        </td>
                        <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">
                          {'N/A'}
                        </td>
                        <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">
                          {'N/A'}
                        </td>
                        <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">
                          {'N/A'}
                        </td>
                        <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">
                          {'N/A'}
                        </td>
                        <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">
                          {order.currency}
                        </td>
                        <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">
                          {order.paymentMethod}
                        </td>
                        <td>
                          <Chip
                            variant="gradient"
                            color={
                              order.status === 'delivered'
                                ? 'green'
                                : 'blue-gray'
                            }
                            value={order.status}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        </td>
                        <td className="py-3 px-5">
                          <button
                            className={`text-[12px] py-1 px-1 text-white rounded ${
                              order.status === 'pending'
                                ? 'bg-green-800 hover:bg-green-700'
                                : 'bg-gray-500 cursor-not-allowed'
                            }`}
                            disabled={order.status !== 'pending'}
                            onClick={() => handleMarkDelivered(order.orderId)}
                          >
                            Mark Delivered
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
  )
}

export default Order
