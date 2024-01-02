const Output = () => {
   return (
      <div className="mt-6 h-full">
         <h2 className="text-2xl font-bold pb-2">Output</h2>
         <div className="bg-gray-800 text-[#07bc0c] w-full h-48 p-4">
            <span>Hello world</span>
         </div>
         <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 mt-4 dark:focus:ring-gray-700 dark:border-gray-700">
            Run
         </button>
      </div>
   );
};

export default Output;
