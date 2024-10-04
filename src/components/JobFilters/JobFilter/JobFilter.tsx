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
  set: Set<string>;
  disabled: boolean;
  placeholder: string;
};

export default function JobFilter({
  set,
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
      <Option className={styles.selectOption} key="Hello" value="Hello">
        Hello
      </Option>
      <Option className={styles.selectOption} key="Bye" value="Bye">
        Bye
      </Option>
      <Option className={styles.selectOption} key="Mönchengladbach" value="Mönchengladbach">
        Mönchengladbach
      </Option>
    </Select>
  )
}