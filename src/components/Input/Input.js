import { useState, forwardRef } from "react";
import {
  DescriptionStyle,
  InputStyle,
  LabelStyle,
  WrapperStyle,
} from "./style";

const Input = forwardRef(
  (
    {
      type,
      label,
      placeholder,
      description,
      isError,
      onChangeHandler,
      onFocusHandler,
      value,
      onKeyPress,
      ...props
    },
    ref = null
  ) => {
    if (!type) type = "text";
    if (!label) label = "";
    if (!onFocusHandler) onFocusHandler = () => {};
    const [isFocused, setIsFocused] = useState(false);

    return (
      <WrapperStyle isFocused={isFocused} isError={isError}>
        <LabelStyle isFocused={isFocused || value} isError={isError}>
          {label}
        </LabelStyle>
        <InputStyle
          type={type}
          value={value}
          placeholder={isFocused ? placeholder : ""}
          isError={isError}
          onChange={onChangeHandler}
          onKeyPress={onKeyPress}
          onFocus={() => {
            setIsFocused(true);
            onFocusHandler();
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          ref={ref}
          {...props}
        />
        {description && (
          <DescriptionStyle isError={isError}>{description}</DescriptionStyle>
        )}
      </WrapperStyle>
    );
  }
);

// const Input = ({
//   type,
//   label,
//   placeholder,
//   description,
//   isError,
//   onChangeHandler,
//   onFocusHandler,
//   value,
//   onKeyPress,
//   ...props
// }) => {
//   if (!type) type = "text";
//   if (!label) label = "";
//   if (!onFocusHandler) onFocusHandler = () => {};
//   const [isFocused, setIsFocused] = useState(false);

//   return (
//     <WrapperStyle isFocused={isFocused} isError={isError}>
//       <LabelStyle isFocused={isFocused || value} isError={isError}>
//         {label}
//       </LabelStyle>
//       <InputStyle
//         type={type}
//         value={value}
//         placeholder={isFocused ? placeholder : ""}
//         isError={isError}
//         onChange={onChangeHandler}
//         onKeyPress={onKeyPress}
//         onFocus={() => {
//           setIsFocused(true);
//           onFocusHandler();
//         }}
//         onBlur={() => {
//           setIsFocused(false);
//         }}
//         {...props}
//       />
//       {description && (
//         <DescriptionStyle isError={isError}>{description}</DescriptionStyle>
//       )}
//     </WrapperStyle>
//   );
// };

export default Input;
