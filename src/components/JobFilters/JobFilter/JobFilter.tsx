import styles from "./JobFilter.module.css";
import { forwardRef } from "react";
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

interface JobFilterProps {
  options: string[];
  disabled: boolean;
  placeholder: string;
};

export default function JobFilter({
  options,
  disabled,
  placeholder
}: JobFilterProps) {
  return (
    <Select
      // defaultListboxOpen={index === 2 ? true : false}
      className={styles.select}
      disabled={disabled}
      slots={{
        root: Button
      }}
      slotProps={{
        popup: {
          className: styles.selectPopup,
          disablePortal: true
        },
        listbox: { className: styles.selectListbox },
      }}
      placeholder={placeholder}
      // onChange={(event, newValue) => {}}
    >
    {options.map((option) => (
      <Option
        className={styles.selectOption}
        key={option}
        value={option}
      >
        {option}
      </Option>
    ))}
    </Select>
  )
}