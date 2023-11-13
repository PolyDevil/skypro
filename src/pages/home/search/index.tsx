import { component$, type Signal, type QRL } from "@builder.io/qwik";
import c from "clsx";
import styles from "./styles.module.css";

type props = {
  class?: string;
  sorting: Signal<string>;
  changeSorting: QRL<(v: string) => void>;
};

export default component$<props>((props) => {
  return (
    <search class={c(props.class, styles.rootX)}>
      <form>
        <label>
          <span>Сортировка</span>

          <select
            name="sorting"
            onChange$={(e) => props.changeSorting(e.target.value)}
          >
            <option value="new" selected={props.sorting.value === "new"}>
              Порядок: сперва новые
            </option>
            <option value="cheap" selected={props.sorting.value === "cheap"}>
              Порядок: сперва дешевле
            </option>
            <option
              value="expensive"
              selected={props.sorting.value === "expensive"}
            >
              Порядок: сперва дороже
            </option>
          </select>

          <svg
            /* this is custom icon */
            role="presentation"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="currentColor" d="M12 8L18 14H6L12 8Z"></path>
          </svg>
        </label>
      </form>
    </search>
  );
});
