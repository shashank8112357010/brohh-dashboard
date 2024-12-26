import { useEffect, useState } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Tooltip,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from '@material-tailwind/react';
import SyncLoader from 'react-spinners/SyncLoader';
import { GetReviewService, PublishReviewService } from '@/services/api.service';

export function Review() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // Fetch reviews
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await GetReviewService();
      console.log(response);
      setReviews(response.data.data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  // Publish a review
  const handlePublish = async (reviewId) => {
    setPublishing(true);
    try {
      await PublishReviewService(reviewId);
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId ? { ...review, isPublished: true } : review
        )
      );
    } catch (error) {
      console.error('Failed to publish review:', error);
    } finally {
      setPublishing(false);
    }
  };

  // Open modal with selected image
  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Reviews
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <SyncLoader color="black" size={15} />
              </div>
            ) : (
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {['Product', 'Rating', 'Message', 'Image', 'Actions'].map(
                      (header) => (
                        <th
                          key={header}
                          className="border-b border-blue-gray-50 py-3 px-5 text-left"
                        >
                          <Typography
                            variant="small"
                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                          >
                            {header}
                          </Typography>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {reviews?.map(
                    ({ _id, product, rating, message, image, isPublished }) => (
                      <tr key={_id}>
                        <td className="border-b border-blue-gray-50 py-3 px-5">
                          <Typography
                            variant="small"
                            className="font-medium text-blue-gray-600"
                          >
                            {product}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-5">
                          <Typography
                            variant="small"
                            className="font-medium text-blue-gray-600"
                          >
                            {rating}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-5">
                          <Typography
                            variant="small"
                            className="font-medium text-blue-gray-600"
                          >
                            {message}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-5">
                          {image !== 'false' ? (
                            <Avatar
                              src={image}
                              alt="Review Image"
                              size="sm"
                              className="cursor-pointer"
                              onClick={() => openModal(image)}
                            />
                          ) : (
                            <Typography
                              variant="small"
                              className="text-blue-gray-400"
                            >
                              No Image
                            </Typography>
                          )}
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-5">
                          <Button
                            size="sm"
                            color="green"
                            disabled={isPublished || publishing}
                            onClick={() => handlePublish(_id)}
                          >
                            {isPublished ? 'Published' : 'Publish'}
                          </Button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Material Tailwind Modal */}
      <Dialog open={modalOpen} handler={closeModal}>
        <DialogHeader>Image Preview</DialogHeader>
        <DialogBody className="flex justify-center items-center">
          <img
            src={selectedImage}
            alt="Selected Review"
            className="max-w-full max-h-[80vh]"
          />
        </DialogBody>
      </Dialog>
    </>
  );
}

export default Review;
