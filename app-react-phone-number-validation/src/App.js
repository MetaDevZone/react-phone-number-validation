import { useState } from "react";
import PhoneInput from "react-phone-number-validation";
import "./App.css";

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (value, country) => {
    console.log("Phone Number:", value);
    console.log("Selected Country:", country);
    setPhoneNumber(value);
  };

  return (
    <PhoneInput
      value={phoneNumber}
      setValue={setPhoneNumber}
      onChange={handleChange}
    />
  );
};

export default App;
