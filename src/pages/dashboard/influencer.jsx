import InfluencerModal from '@/components/InfluencerModal'
import { GetInfluencerService, DeleteInfluencerService, FetchProductIdsService } from '@/services/api.service'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Button
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'

export function Influencer() {
  const [influencers, setInfluencers] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch influencers data on component mount
  const fetchAllInfluencers = async () => {
    await GetInfluencerService()
      .then((res) => {
        setInfluencers(res.data.data)
      })
      .catch((error) => {
        // Handle error here
        console.log(error)
      })
      .finally(() => {
        setLoading(false) // Stop loading spinner
      })
  }

  // Function to delete influencer
  const deleteInfluencer = async (id) => {
    try {
      await DeleteInfluencerService(id)
      // After successful deletion, filter out the deleted influencer from the state
      setInfluencers(influencers.filter(influencer => influencer._id !== id))
    } catch (error) {
      // Handle error here
      console.log("Error deleting influencer:", error)
    }
  }

  useEffect(() => {
    fetchAllInfluencers()
  }, [])



  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Influencer
            </Typography>
          </CardHeader>
          <div className="px-4 flex justify-end">
            <InfluencerModal fetchAllInfluencers={fetchAllInfluencers} />
            {/* Pass the function to Modal */}
          </div>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {loading ? (
              <div className="flex justify-center py-4">Loading...</div> // Show loading state
            ) : (
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {['name', 'instagramHandle', 'productIds', 'image', 'actions'].map(
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
                  {influencers.map(
                    (
                      { _id, name, instagramHandle, image, productIds },
                      key
                    ) => {
                      const className = `py-3 px-5 ${key === influencers.length - 1
                          ? ''
                          : 'border-b border-blue-gray-50'
                        }`

                      return (
                        <tr key={_id}>
                          <td className={className}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {instagramHandle}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {productIds.join(', ')}{' '}
                              {/* Displaying product IDs */}
                            </Typography>
                          </td>
                          <td className={className}>
                            <img
                              src={image}
                              alt={name}
                              className="h-16 w-16 rounded-full object-cover"
                            />
                          </td>
                          <td className={className}>
                            {/* Delete Button */}
                            <Button
                              color="red"
                              onClick={() => deleteInfluencer(_id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      )
                    }
                  )}
                </tbody>
              </table>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default Influencer
