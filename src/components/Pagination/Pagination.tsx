"use client";

import styles from "./Pagination.module.css";
import useWindowWidth from "@/lib/useWindowWidth";
import usePagination, { UsePaginationItem } from "@mui/material/usePagination";

interface IconButtonProps {
  item: UsePaginationItem;
  windowWidth: number;
}

const IconButton: React.FC<IconButtonProps> = ({item, windowWidth}) => {
  const { type, ...rest } = item;
  let iconName = "";
  let previousText = "";
  let nextText = "";
  
  switch (item.type) {
    case "first":
      iconName = "keyboard_double_arrow_left";
      break;
    case "last":
      iconName = "keyboard_double_arrow_right";
      break;
    case "previous":
      iconName = "arrow_back";
      if (windowWidth >= 700)
        previousText = "Vorherige";
      break;
    case "next":
      iconName = "arrow_forward";
      if (windowWidth >= 700)
        nextText = "Nächste";
      break;
  }

  return (
    <button
      className={styles.paginationItem}
      {...rest}
    >
      {nextText}
      <span className="material-symbols-outlined">
        {iconName}
      </span>
      {previousText}
    </button>
  );
};

interface PaginationProps {
  count: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
};

export default function Pagination({ count, page, onPageChange }: PaginationProps) {
  const windowWidth = useWindowWidth();

  const { items } = usePagination({
    count,
    page,
    onChange: onPageChange,
    siblingCount: 0,
    boundaryCount: windowWidth >= 700 ? 2 : 1
  });
  
  return (
    <nav className={styles.pagination}>
    {items.filter(item => item.type === "first" || item.type === "previous")
    .map((item, index) => (
      <IconButton
        key={index}
        item={item}
        windowWidth={windowWidth}
      />
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
      <IconButton
        key={index}
        item={item}
        windowWidth={windowWidth}
      />
    ))}
    </nav>
  )
}