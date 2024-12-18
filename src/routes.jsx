import {
  HomeIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  ClipboardDocumentListIcon,
  QuestionMarkCircleIcon,
  PaintBrushIcon,
  UserGroupIcon,
  PuzzlePieceIcon,
  StarIcon,
  CogIcon
} from "@heroicons/react/24/solid";
import {
  Home,
  Charges,
  Order,
  Settings,
  Testimonial,
  Products,
  Blogs,
  Help,
  Influencer,
  Style,
  Combination,
  Review
} from "@/pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};
// shashank
export const routes = [
  {
    layout: "dashboard",
    pages: [
      { icon: <HomeIcon {...icon} />, name: "home", path: "/home", element: <Home /> },
      { icon: <ShoppingCartIcon {...icon} />, name: "Products", path: "/products", element: <Products /> },
      { icon: <DocumentTextIcon {...icon} />, name: "Blogs", path: "/blog", element: <Blogs /> },
      { icon: <ChatBubbleBottomCenterTextIcon {...icon} />, name: "Testimonial", path: "/testimonial", element: <Testimonial /> },
      { icon: <ClipboardDocumentListIcon {...icon} />, name: "Order", path: "/order", element: <Order /> },
      { icon: <QuestionMarkCircleIcon {...icon} />, name: "Help", path: "/help", element: <Help /> },
      { icon: <PaintBrushIcon {...icon} />, name: "Style", path: "/style", element: <Style /> },
      { icon: <UserGroupIcon {...icon} />, name: "Influencers", path: "/influencer", element: <Influencer /> },
      { icon: <PuzzlePieceIcon {...icon} />, name: "Combination", path: "/combination", element: <Combination /> },
      { icon: <StarIcon {...icon} />, name: "Review", path: "/review", element: <Review /> },
    ],
  },
];

export default routes;
