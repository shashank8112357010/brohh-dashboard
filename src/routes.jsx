import {
  HomeIcon,
  Squares2X2Icon,
  RectangleStackIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  UserGroupIcon,
  PuzzlePieceIcon,
  StarIcon,
} from '@heroicons/react/24/solid';
import {
  Home,
  Charges,
  Order,
  Settings,
  Testimonial,
  Blogs,
  Help,
  Influencer,
  Style,
  Combination,
  Review,
  Category,
  SubCategory,
} from '@/pages/dashboard';
import Products from './pages/dashboard/products';

const icon = {
  className: 'w-5 h-5 text-inherit',
};

// Updated icons for routes
export const routes = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: 'Home',
        path: '/home',
        element: <Home />,
      },
      {
        icon: <Squares2X2Icon {...icon} />,
        name: 'Category',
        path: '/category',
        element: <Category />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: 'Subcategory',
        path: '/subcategory',
        element: <SubCategory />,
      },
      {
        icon: <ShoppingCartIcon {...icon} />,
        name: 'Products',
        path: '/products',
        element: <Products />,
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: 'Blogs',
        path: '/blog',
        element: <Blogs />,
      },
      {
        icon: <ChatBubbleLeftRightIcon {...icon} />,
        name: 'Testimonial',
        path: '/testimonial',
        element: <Testimonial />,
      },
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: 'Order',
        path: '/order',
        element: <Order />,
      },
      {
        icon: <QuestionMarkCircleIcon {...icon} />,
        name: 'Help',
        path: '/help',
        element: <Help />,
      },
      {
        icon: <SparklesIcon {...icon} />,
        name: 'Style',
        path: '/style',
        element: <Style />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: 'Influencers',
        path: '/influencer',
        element: <Influencer />,
      },
      {
        icon: <StarIcon {...icon} />,
        name: 'Review',
        path: '/review',
        element: <Review />,
      },
    ],
  },
];

export default routes;
