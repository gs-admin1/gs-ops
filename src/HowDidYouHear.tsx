import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Option {
  value: string;
}

const HowDidYouHear: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [otherInput, setOtherInput] = useState<string>("");
  const navigate = useNavigate();

  const options: Option[] = [
    { value: "Social Media" },
    { value: "Friend or Family" },
    { value: "Online Ad" },
    { value: "Search Engine" },
    { value: "Other" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      option: selectedOption,
      details: selectedOption === "Other" ? otherInput : "",
    };

    console.log("Form submitted:", formData);

    // Redirect to the support page
    navigate("/support");
  };

  const handleSkip = () => {
    // Redirect to the support page without submitting
    navigate("/support");
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white flex items-center justify-center font-poppins">
      <div className="bg-gray-900 p-4 sm:p-6 w-full max-w-lg rounded-2xl shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 tracking-wide">
          How Did You Hear About Us?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => setSelectedOption(option.value)}
              className={`flex items-center p-3 sm:p-4 rounded-lg cursor-pointer border transition-all duration-300 ${
                selectedOption === option.value
                  ? "border-blue-600 scale-105 shadow-lg"
                  : "border-gray-500 hover:border-blue-500"
              }`}
            >
              <input
                type="radio"
                id={option.value}
                value={option.value}
                checked={selectedOption === option.value}
                onChange={() => setSelectedOption(option.value)}
                className="hidden"
              />
              <label htmlFor={option.value} className="text-base sm:text-lg w-full cursor-pointer">
                {option.value}
              </label>
            </div>
          ))}
          {selectedOption === "Other" && (
            <div className="mt-4">
              <label htmlFor="otherInput" className="text-base sm:text-lg block mb-2">
                Please specify:
              </label>
              <input
                id="otherInput"
                type="text"
                value={otherInput}
                onChange={(e) => setOtherInput(e.target.value)}
                className="w-full p-2 sm:p-3 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-shadow duration-300"
                placeholder="Enter details..."
              />
            </div>
          )}
          <div style = {{ marginTop: '60px'}}className="text-center space-y-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleSkip}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
            >
              Skip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HowDidYouHear;
