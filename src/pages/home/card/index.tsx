/* eslint-disable qwik/jsx-img */
import { component$, type QRL } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import c from "clsx";
import { type t } from "~/routes";
import styles from "./styles.module.css";

type props = {
  class?: string;
  cart: Array<{
    id: t["id"];
    count: number;
  }>;
  data: t;
  addToCart: QRL<(id: t["id"]) => void>;
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

/*
  I disagree with requrement to render `add to cart` button conditionally - it renders on hover.
  Also there is no product page
  Very questionable UX
*/

export default component$<props>((props) => {
  return (
    <article class={c(props.class, styles.rootX)}>
      <img src={props.data.cover} alt={props.data.name} />
      <h3>
        <Link href={`/category/${props.data.uid}`}>{props.data.name}</Link>
      </h3>

      <p>{props.data.description}</p>

      <strong>{currency.format(props.data.price)}</strong>

      <menu role="toolbar">
        <li>
          <button
            aria-label="добавить в корзину"
            onClick$={() => props.addToCart(props.data.id)}
            disabled={Boolean(
              ~props.cart.findIndex((e) => e.id === props.data.id)
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="currentColor"
                d="M4.00436 6.41662L0.761719 3.17398L2.17593 1.75977L5.41857 5.00241H20.6603C21.2126 5.00241 21.6603 5.45012 21.6603 6.00241C21.6603 6.09973 21.6461 6.19653 21.6182 6.28975L19.2182 14.2898C19.0913 14.7127 18.7019 15.0024 18.2603 15.0024H6.00436V17.0024H17.0044V19.0024H5.00436C4.45207 19.0024 4.00436 18.5547 4.00436 18.0024V6.41662ZM6.00436 7.00241V13.0024H17.5163L19.3163 7.00241H6.00436ZM5.50436 23.0024C4.67593 23.0024 4.00436 22.3308 4.00436 21.5024C4.00436 20.674 4.67593 20.0024 5.50436 20.0024C6.33279 20.0024 7.00436 20.674 7.00436 21.5024C7.00436 22.3308 6.33279 23.0024 5.50436 23.0024ZM17.5044 23.0024C16.6759 23.0024 16.0044 22.3308 16.0044 21.5024C16.0044 20.674 16.6759 20.0024 17.5044 20.0024C18.3328 20.0024 19.0044 20.674 19.0044 21.5024C19.0044 22.3308 18.3328 23.0024 17.5044 23.0024Z"
              ></path>
            </svg>
          </button>
        </li>

        <li>
          <button
            aria-label="добавить в избранное"
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
      </menu>
    </article>
  );
});
