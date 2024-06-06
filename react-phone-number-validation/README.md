# react-country-phone-input

`react-country-phone-input` is a React component library that provides a customizable phone input field with a dropdown menu for selecting countries. This component simplifies the process of collecting phone numbers from users while allowing them to easily choose their country code.

## Installation

You can install `react-country-phone-input` via npm or yarn:

```bash
npm install react-country-phone-input
# or
yarn add react-country-phone-input
```

## Usage

Once installed, you can use the `PhoneInput` component in your React application:

```jsx
import React, { useState } from "react";
import PhoneInput from "react-country-phone-input";

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (value, country) => {
    // Handle phone number change
    console.log("Phone Number:", value);
    console.log("Selected Country:", country);
    setPhoneNumber(value);
  };

  return (
    <PhoneInput
      value={phoneNumber} // Current value of the phone number input (required)
      setValue={setPhoneNumber} // Function to set the value of the phone number input (required)
      onChange={handleChange} // Function called when the phone number changes (required)
    />
  );
};

export default App;
```

## Props

- **country:** set default country like 'gb' for United Kingdom. default: 'af.
- **inputClass:** custom class for input element (optional) default: 'phone-input-input'.
- **dropdownClass:** custom class for dropdown element (optional) default: 'phone-input-dropdown'.
- **autoSelectCountry:** auto select country based on user location (optional) default: false.
- **enableSearch:** enable country search (optional) default: false.
- **disableDropdown:** disable dropdown (optional) default: false
- **countryCodeEditable:** allow user to edit country code (optional) default: true
- **hideAsterisk:** hide asterisk for required fields (optional) default: false
- **value:** input value (required)
- **setValue:** callback function to update input value (required)
- **onChange:** callback function to handle input change (required)
- **dropdownStyle:** custom style for dropdown (optional)
- **searchPlaceholder:** search placeholder (optional) default: 'Search'
- **name:** input name (optional) default: ''
- **required:** required field (optional) default: false
- **searchNotFound:** search not found message (optional) default: 'No Country Found'
- **isValidMessage:** validation message (optional) default: 'Invalid Phone Number'
- **onRender={(value, country) => console.log(value, country)}:** callback function to handle render (optional)
