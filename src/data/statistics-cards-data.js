import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
  DocumentTextIcon, // For Blogs
  HandThumbUpIcon, // For Help Requests
  DocumentMagnifyingGlassIcon, // For Testimonials
  ShieldCheckIcon, // For Style
  ShoppingCartIcon,
  BookOpenIcon,
  ChatBubbleLeftEllipsisIcon,
  UserGroupIcon, // For Orders
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: ShoppingCartIcon,  // You can change the icon for products if needed
    title: "Products",
    value: "6",  // This will be dynamically updated
    footer: {
      color: "text-green-500",
      value: "",
      label: "last updated ...",
    },
  },
  {
    color: "gray",
    icon: ShoppingCartIcon,  // Icon for Orders
    title: "Orders",
    value: "0",  // This will be dynamically updated
    footer: {
      color: "text-green-500",
      value: "",
      label: "last updated ...",
    },
  },
  {
    color: "gray",
    icon: UserGroupIcon,  // Icon for Influencers
    title: "Influencers",
    value: "0",  // This will be dynamically updated
    footer: {
      color: "text-red-500",
      value: "",
      label: "last updated ...",
    },
  },
  {
    color: "gray",
    icon: ChatBubbleLeftEllipsisIcon,  // Icon for Testimonial
    title: "Testimonial",
    value: "0",  // This will be dynamically updated
    footer: {
      color: "text-green-500",
      value: "",
      label: "last updated ...",
    },
  },
  {
    color: "gray",
    icon: HandThumbUpIcon,  // Icon for Help Requests
    title: "Help",
    value: "0",  // This will be dynamically updated
    footer: {
      color: "text-green-500",
      value: "",
      label: "last updated ...",
    },
  },
  {
    color: "gray",
    icon: ShieldCheckIcon,  // Icon for Style
    title: "Style",
    value: "0",  // This will be dynamically updated
    footer: {
      color: "text-green-500",
      value: "",
      label: "last updated ...",
    },
  },
  {
    color: "gray",
    icon: BookOpenIcon,  // Icon for Blogs
    title: "Blogs",
    value: "0",  // This will be dynamically updated
    footer: {
      color: "text-green-500",
      value: "",
      label: "last updated ...",
    },
  },
];

export default statisticsCardsData;
