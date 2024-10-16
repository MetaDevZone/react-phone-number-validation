import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-validation";

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (value, country) => {
    console.log("Phone Number:", value);
    console.log("Selected Country:", country);
    setPhoneNumber(value);
  };

  useEffect(() => {
    setPhoneNumber("+1 432 423 4234");
  }, []);

  return (
    <PhoneInput
      country="gb"
      autoSelectCountry={true}
      value={phoneNumber}
      setValue={setPhoneNumber}
      onChange={handleChange}
    />
  );
};

export default App;
