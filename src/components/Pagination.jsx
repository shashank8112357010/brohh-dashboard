import React, { useEffect } from 'react'
import { Button, IconButton } from '@material-tailwind/react'
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

const Pagination = ({ freelancerData, page, setPage, limit, setLimit }) => {
  return (
    <div className="flex flex-col  items-center gap-4">
      <span className="text-[12px]  text-gray-700 dark:text-gray-400">
        Showing {page * limit - limit + 1} to{' '}
        {page * limit < total ? page * limit : total} of {total} entries
      </span>
      <div className="flex  items-center gap-4 ">
        <Button
          variant="text"
          className="flex text-[10px] sm:text-[12px] items-center gap-2 rounded-full"
          onClick={() => setPage(page > 1 ? page - 1 : page)}
          disabled={page === 1}
        >
          Prev
        </Button>
        <div className="flex items-center gap-2">
          {[...Array(freelancerData?.totalPages)].map((_, index) => (
            <IconButton
              key={index + 1}
              onClick={() => setPage(index + 1)}
              disabled={page === index + 1}
              className={`${
                page === index + 1
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
              } p-2 rounded-full`}
            >
              {index + 1}
            </IconButton>
          ))}
        </div>
        <Button
          variant="text"
          className="flex text-[10px] sm:text-[12px] items-center gap-2 rounded-full"
          onClick={() => setPage(page + 1)}
          disabled={page >= freelancerData?.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Pagination

// const Pagination = ({ freelancerData, page, setPage, limit, setLimit }) => {

//     const total = freelancerData?.total;

//     const { refetch } = useGetFreelancerQuery({ page, limit });

//     const handleLimitChange = (e) => {
//         const newLimit = parseInt(e.target.value, 10);
//         setLimit(newLimit);
//         setPage(1);
//     };

//     useEffect(() => {
//         refetch();
//     }, [page, limit]);

//     //For buttons
//     const renderPaginationButtons = () => {
//         const buttons = [];
//         const totalPages = freelancerData?.totalPages;
//         const maxButtons = 3; // Number of buttons to display at a time
//         let start = Math.max(1, page - Math.floor(maxButtons / 2));
//         let end = Math.min(start + maxButtons - 1, totalPages);

//         if (end - start + 1 < maxButtons) {
//             start = Math.max(1, end - maxButtons + 1);
//         }

//         for (let i = start; i <= end; i++) {
//             buttons.push(
//                 <button
//                     className={`${i === page ? "bg-gray-600" : "bg-gray-300"} flex items-center justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100  hover:text-gray-700 `}
//                     key={i}
//                     disabled={i === page}
//                     onClick={() => setPage(i)}
//                 >
//                     {i}
//                 </button>
//             );
//         }

//         return buttons;
//     };

//     return (
//         <>
//             <div className="flex flex-col">
//                 <span className="text-[12px] text-gray-700 dark:text-gray-400">
//                     Showing {page * limit - limit + 1} to {(page * limit) < total ? (page * limit) : total} of {total} entries
//                 </span>
//                 <div className='flex flex-row gap-4 items-center'>
//                     <div className="inline-flex mt-2 xs:mt-0">
//                         <button className="align-middle select-none font-sans font-bold text-center text-[10px] transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  py-1 rounded-l-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
//                             onClick={() => setPage(page > 1 ? page - 1 : page)}
//                             disabled={page === 1}
//                         >
//                             Prev
//                         </button>
//                         <div className='border flex flex-row border-black px-3 py-0.25'>{renderPaginationButtons()}</div>
//                         <button className="align-middle select-none font-sans font-bold text-center text-[10px] transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  py-1 rounded-r-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
//                             onClick={() => setPage(page + 1)}
//                             disabled={page >= freelancerData?.totalPages}
//                         >
//                             Next
//                         </button>
//                     </div>

//                     {/* For limit */}
//                     <div className="mt-2">
//                         <select
//                             id="limit"
//                             name="limit"
//                             value={limit}
//                             onChange={handleLimitChange}
//                             className="align-middle py-[9px] cursor-pointer select-none font-sans font-bold text-center text-[12px] transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] w-full border-none flex items-center gap-4 px-4 capitalize"
//                         >
//                             <option className='cursor-pointer bg-gray-900 h-4 text-white'
//                                 value={3}>
//                                 3
//                             </option>
//                             <option className='cursor-pointer bg-gray-900 h-4 text-white'
//                                 value={5}>5</option>
//                             <option className='cursor-pointer bg-gray-900 h-4 text-white'
//                                 value={7}>7</option>
//                         </select>
//                     </div>

//                 </div>
//             </div>

//         </>
//     );
// };
