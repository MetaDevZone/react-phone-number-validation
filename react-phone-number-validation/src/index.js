import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { countryList } from "./components/CountryListData";
import { isValidNumber } from "libphonenumber-js";
import "./index.css";

const PhoneInput = ({
  onChange,
  value,
  country = "af",
  enableSearch = false,
  countryCodeEditable = true,
  setValue,
  searchNotFound,
  inputClass,
  dropdownClass,
  hideAsterisk = false,
  autoSelectCountry = false,
  disableDropdown = false,
  searchPlaceholder,
  dropdownStyle,
  isValidMessage,
  onRender,
  ...other_value
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const [isNotChange, setIsNotChange] = useState(null);
  const [isValid, setIsValid] = useState("");
  const [firstRender, setFirstRender] = useState(true);

  const detectCountryByDialCode = (formattedValue) => {
    return countryList.find((country) =>
      formattedValue.startsWith(country.dialCode)
    );
  };

  const handleFindCountry = (formattedValue) => {
    const country_find = countryList.find(
      (country) =>
        formattedValue.length === country.format.length &&
        formattedValue.startsWith(country.dialCode)
    );
    return country_find;
  };

  const formatInputValue = (value) => {
    value = value.startsWith("0") ? value.slice(1) : value;
    value = value.replace(/\D/g, "");

    const format = selectedCountry.format;
    let formattedValue = "";
    let formatIndex = 0;

    for (let i = 0; i < format.length && formatIndex < value.length; i++) {
      if (/\d/.test(format[i])) {
        formattedValue += value[formatIndex];
        formatIndex++;
      } else {
        formattedValue += format[i];
      }
    }

    if (formatIndex >= format.replace(/\D/g, "").length) {
      value = formattedValue;
    }

    return formattedValue;
  };

  const handleInputChange = (e) => {
    let inputValue = formatInputValue(e.target.value);
    const detectedCountry = detectCountryByDialCode(inputValue);

    if (!isNotChange && countryCodeEditable) {
      setSelectedCountry(detectedCountry || countryList[0]);
      setInputPlaceholder(detectedCountry?.format || countryList[0]?.format);
    }

    if (!countryCodeEditable) {
      inputValue =
        selectedCountry.dialCode +
        inputValue.slice(selectedCountry.dialCode.length);
    }

    setIsValid("");
    onChange(inputValue, {
      ...selectedCountry,
      required: other_value?.required ? other_value?.required : false,
      is_not_valid: isValid,
    });
  };

  const handleToggleDropdown = () => {
    if (!other_value?.disabled && !disableDropdown) {
      setIsOpen(!isOpen);
    }
  };

  const handleCountrySelection = (country) => {
    setIsOpen(false);
    setSelectedCountry(country);
    setInputPlaceholder(other_value?.placeholder || country.format);
    setSearchTerm("");
    setIsNotChange(country.format);
    onChange(country.dialCode, {
      ...selectedCountry,
      required: other_value?.required ? other_value?.required : false,
      is_not_valid: isValid,
    });
  };

  const filteredCountries = countryList.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFoucs = () => {
    document.getElementById("myInput").focus();
  };

  let placeholder_value = inputPlaceholder.slice(value.length);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const countryTimeZone = countryList.find(
    (value) => value.timeZones.indexOf(userTimeZone) !== -1
  );

  const handleCheckValidation = (value) => {
    const isValidNumberCheck = isValidNumber(value);
    let message = "";
    if (other_value?.required) {
      if (!isValidNumberCheck) {
        message = isValidMessage || "Please enter a valid phone number";
        setIsValid(message);
      } else {
        setIsValid("");
      }
    } else {
      if (value && value !== selectedCountry.dialCode) {
        if (!isValidNumberCheck) {
          message = isValidMessage || "Please enter a valid phone number";
          setIsValid(message);
        } else {
          setIsValid("");
        }
      }
    }
    onChange(value, {
      ...selectedCountry,
      required: other_value?.required ? other_value?.required : false,
      is_not_valid: message,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && filteredCountries.length > 0) {
      handleCountrySelection(filteredCountries[0]);
    }
  };

  const initializeCountry = () => {
    const selectedCountry = autoSelectCountry
      ? countryTimeZone
      : countryList.find(
          (value) => value.iso2.toLowerCase() === country.toLowerCase()
        );

    setSelectedCountry(selectedCountry);
    setInputPlaceholder(other_value?.placeholder || selectedCountry.format);
    setValue(selectedCountry.dialCode);
  };

  useEffect(() => {
    initializeCountry();
  }, [country, autoSelectCountry]);

  useEffect(() => {
    if (value.length === 0) {
      setIsNotChange(null);
    }
    if (value && firstRender) {
      const detectedCountry = handleFindCountry(value);

      if (detectedCountry) {
        setSelectedCountry(detectedCountry);
        setInputPlaceholder(other_value?.placeholder || detectedCountry.format);
      }
      if (onRender) {
        onRender(value, {
          ...(detectedCountry || selectedCountry),
          required: other_value?.required ? other_value?.required : false,
          is_not_valid: isValid,
        });
      }
      setFirstRender(false);
    }
  }, [value, firstRender]);

  return (
    <div className="phone-input-container">
      <div className="phone-input-image" onClick={handleToggleDropdown}>
        <img
          src={`https://flagpedia.net/data/flags/mini/${selectedCountry.iso2}.png`}
          alt={selectedCountry.name}
        />
        {isOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
      </div>
      <div
        className="placeholder-text"
        style={{
          left: value.length * 9 + 50,
        }}
        onClick={handleFoucs}
      >
        {placeholder_value}{" "}
        {!hideAsterisk && placeholder_value.length !== 0 && (
          <span style={{ color: "red" }}>
            {other_value?.required === true ? "*" : ""}
          </span>
        )}
      </div>
      <input
        {...other_value}
        id="myInput"
        className={`custom_phone_input ${inputClass}`}
        value={value}
        onChange={handleInputChange}
        onBlur={
          other_value?.onBlur
            ? other_value?.onBlur
            : () => handleCheckValidation(value)
        }
      />
      {isOpen && (
        <div className={`select-div ${dropdownClass ? dropdownClass : ""}`}>
          {enableSearch !== false && (
            <input
              type="text"
              className="search-input"
              placeholder={searchPlaceholder || "Search Country"}
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          )}
          <div
            className={`${enableSearch !== false ? "country-div-open" : ""}`}
          >
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <div
                  key={index}
                  className="country-div"
                  onClick={() => {
                    handleCountrySelection(country);
                  }}
                  style={dropdownStyle}
                >
                  <img
                    src={`https://flagpedia.net/data/flags/mini/${country.iso2}.png`}
                    alt={country.name}
                  />
                  {country.name}
                  <span style={{ color: "gray" }}>
                    &nbsp;{country.dialCode}
                  </span>
                </div>
              ))
            ) : (
              <div className="country-div">
                {searchNotFound || "No Country Found"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

PhoneInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  nmae: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  country: PropTypes.string,
  enableSearch: PropTypes.bool,
  countryCodeEditable: PropTypes.bool,
  searchNotFound: PropTypes.string,
  inputClass: PropTypes.string,
  dropdownClass: PropTypes.string,
  hideAsterisk: PropTypes.bool,
  autoSelectCountry: PropTypes.bool,
  disableDropdown: PropTypes.bool,
  dropdownStyle: PropTypes.object,
  isValidMessage: PropTypes.string,
  onRender: PropTypes.func,
};

export default PhoneInput;
