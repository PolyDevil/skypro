import {
  $,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import c from "clsx";
import { type t, data as initialData } from "~/routes";
import styles from "./styles.module.css";
import Card from "./card";
import Search from "./search";

type props = {
  class?: string;
};

type product = {
  id: t["id"];
  count: number;
};

type state = {
  products: Array<product>;
};

export default component$<props>((props) => {
  const data = useSignal(initialData);
  const cart = useStore<state>({ products: [] });
  const sorting = useSignal("newest");

  const changeSorting = $((v: string) => {
    sorting.value = v;

    switch (v) {
      case "new": {
        data.value = initialData;
        break;
      }
      case "cheap": {
        // @ts-expect-error wait till ts will support the new api
        data.value = data.value.toSorted((x, y) => x.price - y.price);
        break;
      }
      case "expensive": {
        // @ts-expect-error wait till ts will support the new api
        data.value = data.value.toSorted((x, y) => y.price - x.price);
        break;
      }
      default: {
        // do nothing
      }
    }
  });

  const addToCart = $((id: t["id"]) => {
    const maybeProductIndex = cart.products.findIndex((e) => e.id === id);

    if (!~maybeProductIndex) {
      cart.products.push({
        id,
        count: 1,
      });
    }

    globalThis.localStorage.setItem("cart", JSON.stringify(cart.products));
  });

  /* cart should be fetched from the server, since we dont have one, I have decided to use localstorage */
  useVisibleTask$(() => {
    const prev = globalThis.localStorage.getItem("cart");

    try {
      if (typeof prev === "string") {
        const maybeCart = JSON.parse(prev);

        if (Array.isArray(maybeCart)) {
          const products = [];

          for (const p of maybeCart) {
            const maybeProduct = initialData.find((el) => el.id === p.id);

            if (maybeProduct) {
              products.push({
                id: maybeProduct.id,
                count: p.count,
              });
            }
          }

          cart.products = products;
        }
      }
    } catch (e) {
      console.error("can not restore state from localstorage");
    }
  });

  return (
    <div class={c(props.class, styles.rootX)}>
      <section>
        <h2>Список товаров</h2>

        <Search
          class={styles.searchX}
          sorting={sorting}
          changeSorting={changeSorting}
        />

        <ol role=/* https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html */ "list">
          {data.value.map((e) => (
            <li key={e.id}>
              <Card cart={cart.products} data={e} addToCart={addToCart} />
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
});
