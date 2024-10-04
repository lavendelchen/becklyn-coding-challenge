import styles from "./JobFilter.module.css";
import { forwardRef, useRef } from "react";
import { Select } from "@mui/base/Select";
import { Option } from "@mui/base/Option";

type SelectRootSlotProps<TValue, Multiple> = {
  ownerState: any;
  children?: React.ReactNode;
};

const Button = forwardRef<HTMLButtonElement, SelectRootSlotProps<any, any>>(
  function Button(props, ref) {
    const { ownerState, ...other } = props;
    return (
      <button type="button" {...other} ref={ref}>
        {other.children}
        <span className="material-symbols-outlined"> 
          keyboard_arrow_down
        </span>
      </button>
    );
  }
);

export type OnFilterChange = (
  event: React.MouseEvent<Element> | React.KeyboardEvent<Element> | React.FocusEvent<Element> | null, 
  value: string | null
) => void;

interface JobFilterProps {
  value: string | null;
  onChange: OnFilterChange;
  options: string[];
  disabled: boolean;
  placeholder: string;
};

export default function JobFilter({
  value,
  onChange,
  options,
  disabled,
  placeholder
}: JobFilterProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOptionClick = (option: string) => {
    return (event: React.MouseEvent<HTMLLIElement>) => {
      setTimeout(() => {
        buttonRef.current?.blur();
      }, 0);
      
      if (option === value)
        onChange(null, null);
      else
        onChange(null, option);
    };
  }

  return (
    <Select
      className={`${styles.select} ${!value ? styles.placeholder : ''}`}
      disabled={disabled}
      slots={{
        root: Button
      }}
      slotProps={{
        root: { ref: buttonRef },
        popup: {
          className: styles.selectPopup,
          disablePortal: true
        },
        listbox: { className: styles.selectListbox },
      }}
      placeholder={placeholder}
      value={value}
    >
    {options.map((option) => (
      <Option
        className={styles.selectOption}
        key={option}
        value={option}
        onClick={handleOptionClick(option)}
      >
        {option}
      </Option>
    ))}
    </Select>
  )
}