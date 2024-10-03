import styles from "./Pagination.module.css"
import usePagination, { UsePaginationItem } from "@mui/material/usePagination";

interface IconButtonProps {
  item: UsePaginationItem;
}

const IconButton: React.FC<IconButtonProps> = ({item}) => {
  const { type, ...rest } = item;
  let iconName;
  
  switch (item.type) {
    case "first":
      iconName = "keyboard_double_arrow_left"; break;
    case "last":
      iconName = "keyboard_double_arrow_right"; break;
    case "previous":
      iconName = "arrow_back"; break;
    case "next":
      iconName = "arrow_forward"; break;
    default:
      iconName = "";
  }

  return (
    <button
      className={`${styles.paginationItem} material-symbols-outlined`}
      {...rest}
    >
      {iconName}
    </button>
  );
};

interface PaginationProps {
  count: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
};

export default function Pagination({ count, page, onPageChange }: PaginationProps) {
  const { items } = usePagination({
    count, // Total number of pages
    page, // Current active page
    onChange: onPageChange, // Handle page changes
    siblingCount: 0,
    boundaryCount: 1
  });
  
  return (
    <nav className={styles.pagination}>
    {items.filter(item => item.type === "first" || item.type === "previous")
    .map((item, index) => (
      <IconButton key={index} item={item} />
    ))}
      <ul className={styles.innerPagination}>
      {items.filter(item => (
        item.type === "page" ||
        item.type === "start-ellipsis" ||
        item.type === "end-ellipsis"
      )).map(({page, type, selected, ...item}, index) => {
        if (type === "page") {
          return (
            <li
              key={index}
              className={`${styles.paginationItem} ${styles.centerItem}`}
            >
              <button
                className={`${selected ? styles.selected : ''}`}
                {...item}
                disabled={selected ? true : false}
              >
                {page}
              </button>
            </li>
          )
        } else {
          return (
            <li
              key={index}
              className={`${styles.paginationItem} ${styles.centerItem}`}
            >
              <span>...</span>
            </li>
          )
        }
      })}
      </ul>
    {items.filter(item => item.type === "next" || item.type === "last")
    .map((item, index) => (
      <IconButton key={index} item={item} />
    ))}
    </nav>
  )
}