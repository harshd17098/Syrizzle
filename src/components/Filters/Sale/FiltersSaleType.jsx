import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FiltersSaleAndCompletion = () => {
    const [saleTypeOpen, setSaleTypeOpen] = useState(false);
    const [saleTypeSelected, setSaleTypeSelected] = useState("Select");
    const saleTypeOptions = ["All", "Initial Sale", "Resale", "Direct from Developer"];

    const [completionOpen, setCompletionOpen] = useState(false);
    const [completionSelected, setCompletionSelected] = useState("Select");
    const completionOptions = ["Under 25%", "25 to 50%", "51 to 75%", "Above 75%"];

    const [paymentOpen, setPaymentOpen] = useState(false);
    const [selectedPaymentRange, setSelectedPaymentRange] = useState("Select");
    const paymentOptions = ["Under 25%", "25 to 50%", "51 to 75%", "Above 75%"];

    const [handoverOpen, setHandoverOpen] = useState(false);
    const [handoverSelected, setHandoverSelected] = useState("Select");
    const handoverOptions = ["2025", "2026", "2027", "2028", "2029", "2030 and above"];

    const [filterOpen, setFilterOpen] = useState(false);
    const [projectStatus, setProjectStatus] = useState([]);
    const [developer, setDeveloper] = useState("");
    const statusOptions = ["Under Construction", "Completed"];

    const toggleDropdown = (type) => {
        switch (type) {
            case "sale":
                setSaleTypeOpen(!saleTypeOpen);
                break;
            case "completion":
                setCompletionOpen(!completionOpen);
                break;
            case "payment":
                setPaymentOpen(!paymentOpen);
                break;
            case "handover":
                setHandoverOpen(!handoverOpen);
                break;
            case "filter":
                setFilterOpen(!filterOpen);
                break;
        }
    };

    const selectOption = (type, option) => {
        switch (type) {
            case "sale":
                setSaleTypeSelected(option);
                setSaleTypeOpen(false);
                break;
            case "completion":
                setCompletionSelected(option);
                setCompletionOpen(false);
                break;
            case "payment":
                setSelectedPaymentRange(option);
                setPaymentOpen(false);
                break;
            case "handover":
                setHandoverSelected(option);
                setHandoverOpen(false);
                break;
        }
    };

    const toggleStatus = (status) => {
        setProjectStatus((prev) =>
            prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
        );
    };

    const applyFilter = (type) => {
        switch (type) {
            case "sale":
                console.log("Sale Type:", saleTypeSelected);
                break;
            case "completion":
                console.log("Completion:", completionSelected);
                break;
            case "payment":
                console.log("Payment:", selectedPaymentRange);
                break;
            case "handover":
                console.log("Handover:", handoverSelected);
                break;
            case "filter":
                console.log("Project Status:", projectStatus);
                console.log("Developer:", developer);
                break;
        }
    };

    const clearSelection = (type) => {
        switch (type) {
            case "sale":
                setSaleTypeSelected("Select");
                break;
            case "completion":
                setCompletionSelected("Select");
                break;
            case "payment":
                setSelectedPaymentRange("Select");
                break;
            case "handover":
                setHandoverSelected("Select");
                break;
            case "filter":
                setProjectStatus([]);
                setDeveloper("");
                break;
        }
    };

    const renderDropdown = (label, selected, open, toggleFn, options, type) => (
        <div className="relative w-[150px] text-sm">
            <label className="block text-xs text-gray-600 mb-1">{label}</label>
            <button
                onClick={toggleFn}
                className="flex justify-between items-center w-[150px] px-3 py-2 bg-white border rounded shadow-sm"
            >
                <span className="truncate">{selected}</span>
                {open ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {open && (
                <div className="absolute z-20 bg-white border mt-2 rounded-lg shadow-md w-[300px] p-4">
                    <h4 className="font-semibold mb-3">{label}</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => selectOption(type, opt)}
                                className={`px-3 py-1 rounded-full border transition ${selected === opt
                                    ? "bg-blue-100 text-blue-600 border-blue-500"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-between border-t pt-3">
                        <button
                            onClick={() => clearSelection(type)}
                            className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            Clear
                        </button>
                        <button
                            onClick={() => applyFilter(type)}
                            className="px-3 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-900"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    const renderProjectFilter = () => (
        <div className="relative w-[150px] text-sm">
            <label className="block text-xs text-gray-600 mb-1">Filters</label>
            <button
                onClick={() => toggleDropdown("filter")}
                className="flex justify-between items-center w-[150px] px-3 py-2 bg-white border rounded shadow-sm"
            >
                <span className="truncate">Project Status, Developer</span>
                {filterOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {filterOpen && (
                <div className="absolute z-30 bg-white border mt-2 rounded-lg shadow-md w-[300px] p-4 max-h-72 overflow-y-auto">
                    <div className="mb-4">
                        <h4 className="font-semibold text-sm mb-2">Project Status</h4>
                        <div className="flex gap-2 flex-wrap">
                            {statusOptions.map((status) => (
                                <button
                                    key={status}
                                    onClick={() => toggleStatus(status)}
                                    className={`px-3 py-1 rounded-full border text-sm ${projectStatus.includes(status)
                                        ? "bg-blue-100 text-blue-600 border-blue-500"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Developer</label>
                        <input
                            type="text"
                            value={developer}
                            onChange={(e) => setDeveloper(e.target.value)}
                            placeholder="E.g. Emaar Properties PJSC"
                            className="w-full px-3 py-2 border rounded-md text-sm"
                        />
                    </div>
                    <div className="flex justify-between border-t pt-3">
                        <button
                            onClick={() => clearSelection("filter")}
                            className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            Clear
                        </button>
                        <button
                            onClick={() => applyFilter("filter")}
                            className="px-5 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-900"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="flex flex-wrap gap-4 p-4 rounded-lg bg-[#3a88ef14]" style={{width:"900px",marginBottom:"50px"}}>
            {renderDropdown("Sale Type", saleTypeSelected, saleTypeOpen, () => toggleDropdown("sale"), saleTypeOptions, "sale")}
            {renderDropdown("Project Completion", completionSelected, completionOpen, () => toggleDropdown("completion"), completionOptions, "completion")}
            {renderDropdown("Pre-Handover Payment", selectedPaymentRange, paymentOpen, () => toggleDropdown("payment"), paymentOptions, "payment")}
            {renderDropdown("Handover", handoverSelected, handoverOpen, () => toggleDropdown("handover"), handoverOptions, "handover")}
            {renderProjectFilter()}
        </div>
    );
};

export default FiltersSaleAndCompletion;
