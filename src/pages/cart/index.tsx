import { $, component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import c from "clsx";
import styles from "./styles.module.css";
import Table from "./table";
import Submit from "./submit";
import { data, type t } from "~/routes";

type props = {
  class?: string;
};

type product = t & {
  count: number;
};

type state = {
  products: Array<product>;
  sum: number;
};

const initialState = {
  products: [] as Array<product>,
  sum: 0,
};

export default component$<props>((props) => {
  const state = useStore<state>(initialState);

  const removeFromCart = $((id: t["id"]) => {
    const maybeProductIndex = state.products.findIndex((e) => e.id === id);

    if (~maybeProductIndex) {
      state.products.splice(maybeProductIndex, 1);

      globalThis.localStorage.setItem(
        "cart",
        JSON.stringify(
          state.products.map((e) => ({ id: e.id, count: e.count }))
        )
      );

      state.sum = state.products.reduce((p, c) => p + c.count * c.price, 0);
    }
  });

  const change = $((id: t["id"], value: string) => {
    const maybeNumber = Number(value);

    if (Number.isInteger(maybeNumber)) {
      const maybeProductIndex = state.products.findIndex((e) => e.id === id);

      if (~maybeProductIndex) {
        if (maybeNumber === 0) {
          state.products.splice(maybeProductIndex, 1);
        } else {
          state.products[maybeProductIndex].count = maybeNumber;
        }
        globalThis.localStorage.setItem(
          "cart",
          JSON.stringify(
            state.products.map((e) => ({ id: e.id, count: e.count }))
          )
        );

        state.sum = state.products.reduce((p, c) => p + c.count * c.price, 0);
      }
    }
  });

  const reset = $(() => {
    state.products = initialState.products;
    state.sum = initialState.sum;
    globalThis.localStorage.removeItem("cart");
  });

  useVisibleTask$(() => {
    const prev = globalThis.localStorage.getItem("cart");

    try {
      if (typeof prev === "string") {
        const maybeCart = JSON.parse(prev);

        if (Array.isArray(maybeCart)) {
          const products = [];

          for (const p of maybeCart) {
            const maybeProduct = data.find((el) => el.id === p.id);

            if (maybeProduct) {
              products.push({
                ...maybeProduct,
                count: p.count,
              });
            }
          }

          state.products = products;
          state.sum = products.reduce((p, c) => p + c.count * c.price, 0);
        }
      }
    } catch (e) {
      console.error("can not restore state from localstorage");
    }
  });

  return (
    <div class={c(props.class, styles.rootX)}>
      <form>
        <h1>Корзина</h1>

        {state.sum === 0 ? (
          <div>Корзина пуста</div>
        ) : (
          <Table
            class={styles.tableX}
            data={state.products}
            removeFromCart={removeFromCart}
            change={change}
            reset={reset}
          />
        )}

        <Submit class={styles.submitX} total={state.sum} />
      </form>
    </div>
  );
});
