import EditorWindow from "../../Components/EditorWindow/EditorWindow";
import Output from "../../Components/Output/Output";

const Landing = () => {
   return (
      <section className=" p-10">
         <div className="flex items-center gap-4">
            <select
               id="countries"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
               <option selected>Choose a country</option>
               <option value="US">United States</option>
               <option value="CA">Canada</option>
               <option value="FR">France</option>
               <option value="DE">Germany</option>
            </select>
            <select
               id="countries"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
               <option selected>Choose a country</option>
               <option value="US">United States</option>
               <option value="CA">Canada</option>
               <option value="FR">France</option>
               <option value="DE">Germany</option>
            </select>
         </div>
         <div className="flex gap-3">
            <div className="w-3/4">
               <EditorWindow />
            </div>
            <div className="w-[25%] h-48">
               <Output />
            </div>
         </div>
      </section>
   );
};

export default Landing;
