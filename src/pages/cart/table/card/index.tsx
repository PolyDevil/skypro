/* eslint-disable qwik/jsx-img */
import { component$, type QRL } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import c from "clsx";
import { type t } from "~/routes";
import styles from "./styles.module.css";

type props = {
  class?: string;
  data: t;
  removeFromCart: QRL<(id: t["id"]) => void>;
};

/*
 To format price with currency;
 It replaces spaces with non-breakable spaces, also known as `u00a0` unicode symbol`
*/
const currency = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0 /* to get an integer */,
  minimumFractionDigits: 0 /* not a float */,
});

export default component$<props>((props) => {
  return (
    <article class={c(props.class, styles.rootX)}>
      <input type="hidden" name={String(props.data.id)} />
      <img src={props.data.cover} alt={props.data.name} />

      <h2>
        {props.data.name}

        {/* we add link to a product, but we reduce the clickable area and also make it so the link will open in new tab */}
        <Link
          href={`/category/${props.data.uid}`}
          aria-label={props.data.name}
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="currentColor"
              d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V12L17.206 8.207L11.2071 14.2071L9.79289 12.7929L15.792 6.793L12 3H21Z"
            ></path>
          </svg>
        </Link>
      </h2>

      <p>{props.data.description}</p>

      <strong>{currency.format(props.data.price)}</strong>

      <menu role="toolbar">
        <li>
          <button
            type="button"
            aria-label="В избранном"
            title="not implemented"
            disabled={/*not implemented*/ true}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="currentColor"
                d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"
              ></path>
            </svg>
          </button>
        </li>

        <li>
          <button
            type="button"
            aria-label="Удалить"
            onClick$={() => props.removeFromCart(props.data.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="currentColor"
                d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"
              ></path>
            </svg>
          </button>
        </li>
      </menu>
    </article>
  );
});
