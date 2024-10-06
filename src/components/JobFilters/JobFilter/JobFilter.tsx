import styles from "./JobFilter.module.css";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Select } from "@mui/base/Select";
import { Option } from "@mui/base/Option";
import { CheckIcon } from "@/icons/icons";

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
  const [popupOpen, setPopupOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const setPopupWidth = () => {
    if (buttonRef.current && popupRef.current) {
        const buttonWidth = buttonRef.current.offsetWidth;
        popupRef.current.style.width = `${buttonWidth}px`;
    }
  };

  useEffect(() => {
    if (popupOpen) {
      setPopupWidth();
    }
    window.addEventListener('resize', setPopupWidth);

    return () => {
      window.removeEventListener('resize', setPopupWidth);
    };
  }, [popupOpen]);

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
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onListboxOpenChange={(open) => setPopupOpen(open)}
      slots={{
        root: Button
      }}
      slotProps={{
        root: { ref: buttonRef },
        popup: {
          ref: popupRef,
          className: styles.selectPopup,
          disablePortal: true
        },
        listbox: { className: styles.selectListbox },
      }}
    >
    {options.map((option) => (
      <Option
        className={styles.selectOption}
        key={option}
        value={option}
        onClick={handleOptionClick(option)}
      >
        {option}
        {
          option === value ?
          <CheckIcon /> : ""
        }
      </Option>
    ))}
    </Select>
  )
}