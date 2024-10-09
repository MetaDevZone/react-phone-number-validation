# React Phone Number Validation

`React Phone Number Validation` is a React component library that provides a customizable phone input field with a dropdown menu for selecting countries. This component simplifies the process of collecting phone numbers from users while allowing them to easily choose their country code.

## Live Demo

To test React Phone Number Validation on CodeSandbox, click [here](https://codesandbox.io/p/devbox/react-phone-number-validation-cg23yz).

## Installation

You can install `react-phone-number-validation` via npm or yarn:

```bash
npm install react-phone-number-validation
# or
yarn add react-phone-number-validation
```

## Usage

Once installed, you can use the `PhoneInput` component in your React application:

```jsx
import React, { useState } from "react";
import PhoneInput from "react-phone-number-validation";

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

| Prop                  | Type       | Description                                            | Default                                           |
| --------------------- | ---------- | ------------------------------------------------------ | ------------------------------------------------- |
| `country`             | `String`   | Set default country (e.g., 'gb' for United Kingdom).   | `'af'`                                            |
| `inputClass`          | `String`   | Custom class for the input element (optional).         |                                                   |
| `dropdownClass`       | `String`   | Custom class for the dropdown element (optional).      |                                                   |
| `autoSelectCountry`   | `Boolean`  | Auto-select country based on user location (optional). | `false`                                           |
| `enableSearch`        | `Boolean`  | Enable country search (optional).                      | `false`                                           |
| `disableDropdown`     | `Boolean`  | Disable dropdown (optional).                           | `false`                                           |
| `countryCodeEditable` | `Boolean`  | Allow user to edit country code (optional).            | `true`                                            |
| `hideAsterisk`        | `Boolean`  | Hide asterisk for required fields (optional).          | `false`                                           |
| `value`               | `String`   | Input value (required).                                |                                                   |
| `setValue`            | `Function` | Callback function to update input value (required).    |                                                   |
| `onChange`            | `Function` | Callback function to handle input change (required).   |                                                   |
| `dropdownStyle`       | `Object`   | Custom style for dropdown (optional).                  |                                                   |
| `searchPlaceholder`   | `String`   | Search placeholder (optional).                         | `'Search'`                                        |
| `name`                | `String`   | Input name (optional).                                 | `''`                                              |
| `required`            | `Boolean`  | Required field (optional).                             | `false`                                           |
| `searchNotFound`      | `String`   | Search not found message (optional).                   | `'No Country Found'`                              |
| `isValidMessage`      | `String`   | Validation message (optional).                         | `'Invalid Phone Number'`                          |
| `onRender`            | `Function` | Callback function to handle render (optional).         | `(value, country) => console.log(value, country)` |

Meta Dev Zone – [@meta-dev-zone](https://www.npmjs.com/~meta-dev-zone)
