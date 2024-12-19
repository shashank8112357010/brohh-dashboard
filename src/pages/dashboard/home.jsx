import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { GetDashboardCountService } from "@/services/api.service";
import { useDispatch } from "react-redux";
import { setSearch } from "@/store/slice/headerSlice";
import {
  ShoppingCartIcon,
  UsersIcon,
  UserGroupIcon,
  ChatBubbleLeftEllipsisIcon,
  SparklesIcon,
  BookOpenIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  HandThumbUpIcon
} from "@heroicons/react/24/solid"; // Import the necessary icons
import SyncLoader from "react-spinners/SyncLoader"; // Import SyncLoader from react-spinners
import { statisticsCardsData } from "@/data";

// Helper function to format timestamp
const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(date).toLocaleString('en-US', options); // You can modify the locale and options as needed
};

export function Home() {
  const dispatch = useDispatch();

  // State for the statistics data
  const [updatedStatistics, setUpdatedStatistics] = useState(statisticsCardsData);
  // State to track loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 

    // Fetch dashboard count data from the API
    GetDashboardCountService()
      .then((response) => {
        console.log(response);
        const {
          blog,
          help,
          influencer,
          order,
          product,
          style,
          testimonial,
          user,
        } = response.data?.data;

        // Update the statistics data based on API response
        const updatedCards = [
          {
            title: "Products",
            value: product.count,
            lastUpdated: formatDate(product.lastUpdated || "N/A"),
            footer: { label: "last updated", value: product.lastUpdated || "N/A" },
            icon: ShoppingCartIcon,
          },
          {
            title: "Orders",
            value: order.count,
            lastUpdated: formatDate(order.lastUpdated || "N/A"),
            footer: { label: "last updated", value: order.lastUpdated || "N/A" },
            icon: ShoppingCartIcon,
          },
          {
            title: "Influencers",
            value: influencer.count,
            lastUpdated: formatDate(influencer.lastUpdated || "N/A"),
            footer: { label: "last updated", value: influencer.lastUpdated || "N/A" },
            icon: UserGroupIcon,
          },
          {
            title: "Testimonial",
            value: testimonial.count,
            lastUpdated: formatDate(testimonial.lastUpdated || "N/A"),
            footer: { label: "last updated", value: testimonial.lastUpdated || "N/A" },
            icon: ChatBubbleLeftEllipsisIcon,
          },
          {
            title: "Help",
            value: help.count,
            lastUpdated: formatDate(help.lastUpdated || "N/A"),
            footer: { label: "last updated", value: help.lastUpdated || "N/A" },
            icon: HandThumbUpIcon,
          },
          {
            title: "Style",
            value: style.count,
            lastUpdated: formatDate(style.lastUpdated || "N/A"),
            footer: { label: "last updated", value: style.lastUpdated || "N/A" },
            icon: ShieldCheckIcon,
          },
          {
            title: "Blogs",
            value: blog.count,
            lastUpdated: formatDate(blog.lastUpdated || "N/A"),
            footer: { label: "last updated", value: blog.lastUpdated || "N/A" },
            icon: BookOpenIcon,
          }
        ];

        // Set the updated statistics to state
        setUpdatedStatistics(updatedCards);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {updatedStatistics.map(({ title, value, lastUpdated, footer, icon: Icon }) => (
          <StatisticsCard
            key={title}
            title={title}
            value={loading ? (
              <SyncLoader color={"#ffffff"} size={8} /> // Loader for value while loading
            ) : (
              value
            )}
            icon={<Icon className="w-6 h-6 text-white" />} // Render the icon dynamically
            footer={
              <Typography className="font-normal text-blue-gray-600">
                &nbsp;{footer.label}: {loading ? <SyncLoader color={"#ffffff"} size={6} /> : lastUpdated}
              </Typography>
            }
            loading={loading} // Set loading state for the card
            className="bg-black h-40" // Set a fixed height to prevent shrinking
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
