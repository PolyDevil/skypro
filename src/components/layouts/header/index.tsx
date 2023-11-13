import { component$ } from "@builder.io/qwik";
import c from "clsx";

import styles from "./styles.module.css";

type props = {
  class?: string;
};

export default component$<props>((props) => {
  return (
    <header class={c(props.class, styles.rootX)}>
      <nav>
        <ul role=/* https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html */ "list">
          <li>
            <a href="/">Интерьер.</a>
          </li>

          <li>
            <a href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                role="presentation"
              >
                <path
                  fill="currentColor"
                  d="M3 3H11V11H3V3ZM3 13H11V21H3V13ZM13 3H21V11H13V3ZM13 13H21V21H13V13ZM15 5V9H19V5H15ZM15 15V19H19V15H15ZM5 5V9H9V5H5ZM5 15V19H9V15H5Z"
                ></path>
              </svg>
              <span>Каталог</span>
            </a>
          </li>

          <li>
            <a href="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                role="presentation"
              >
                <path
                  fill="currentColor"
                  d="M4.00436 6.41662L0.761719 3.17398L2.17593 1.75977L5.41857 5.00241H20.6603C21.2126 5.00241 21.6603 5.45012 21.6603 6.00241C21.6603 6.09973 21.6461 6.19653 21.6182 6.28975L19.2182 14.2898C19.0913 14.7127 18.7019 15.0024 18.2603 15.0024H6.00436V17.0024H17.0044V19.0024H5.00436C4.45207 19.0024 4.00436 18.5547 4.00436 18.0024V6.41662ZM6.00436 7.00241V13.0024H17.5163L19.3163 7.00241H6.00436ZM5.50436 23.0024C4.67593 23.0024 4.00436 22.3308 4.00436 21.5024C4.00436 20.674 4.67593 20.0024 5.50436 20.0024C6.33279 20.0024 7.00436 20.674 7.00436 21.5024C7.00436 22.3308 6.33279 23.0024 5.50436 23.0024ZM17.5044 23.0024C16.6759 23.0024 16.0044 22.3308 16.0044 21.5024C16.0044 20.674 16.6759 20.0024 17.5044 20.0024C18.3328 20.0024 19.0044 20.674 19.0044 21.5024C19.0044 22.3308 18.3328 23.0024 17.5044 23.0024Z"
                ></path>
              </svg>
              <span>Корзина</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
});
