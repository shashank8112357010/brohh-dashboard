import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
} from "@material-tailwind/react";
import { SyncLoader } from "react-spinners";
import { TestimonialFormModal } from "./TestimonialFormModal";
import { GetTestimonialService } from "@/services/api.service";

export function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTestimonial = async () => {
    setIsLoading(true);
    await GetTestimonialService()
      .then((res) => {
        setTestimonials(res.data.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch testimonials:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getTestimonial();
  }, []);

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Testimonials
            </Typography>
          </CardHeader>

          <div className="px-4 my-5 flex justify-end">
            <TestimonialFormModal getTestimonial={getTestimonial}/>
          </div>

          <CardBody className="px-4 pt-0 pb-2">
            {isLoading ? (
              <div className="flex justify-center items-center h-52">
                <SyncLoader color="#000" size={15} />
              </div>
            ) : testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial._id}
                    className="border border-gray-200 rounded-lg p-4 shadow-md"
                  >
                    <div className="flex items-center gap-4 mb-3">
                     
                      <Typography variant="h6" className="capitalize">
                        {testimonial.name}
                      </Typography>
                    </div>
                    <Typography
                      variant="body2"
                      className="text-gray-600 text-sm"
                    >
                      {testimonial.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      className=" mt-2 text-sm text-black"
                    >
                      {new Date(testimonial.createdAt).toLocaleDateString()}
                    </Typography>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-52">
                <p>No testimonials found. Add one using the form above!</p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Testimonial;
