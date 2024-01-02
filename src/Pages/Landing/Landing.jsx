import Select from "react-select";
import EditorWindow from "../../Components/EditorWindow/EditorWindow";
import Output from "../../Components/Output/Output";

const options = [
   { value: "chocolate", label: "Chocolate" },
   { value: "strawberry", label: "Strawberry" },
   { value: "vanilla", label: "Vanilla" },
];
const Landing = () => {
   return (
      <section className=" p-10">
         <div className="flex items-center gap-4">
            <div className="w-3/12">
               <Select placeholder="Select Language" options={options} />
            </div>
            <div className="w-3/12">
               <Select options={options} />
            </div>
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
