import { component$ } from "@builder.io/qwik";
import c from "clsx";
import styles from "./styles.module.css";

type props = {
  class?: string;
  total: number;
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
    <footer class={c(props.class, styles.rootX)}>
      <fieldset>
        <legend>Оформление заказа</legend>

        <label>
          <span>Имя</span>
          <input
            name="name"
            type="text"
            inputMode="text"
            placeholder="Иванов Иван"
            required
            autoComplete="name"
          />
        </label>

        <label>
          <span>Номер телефона</span>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            required
            placeholder="+79999999999"
            minLength={10}
            autoComplete="tel"
          />
        </label>

        <label>
          <span>Адрес</span>
          {/* In the design the `address` is one line field, which means that it should be an input, however, considering how long addresses could be, I will use textarea  */}
          <textarea
            id="address"
            name="address"
            minLength={10}
            autoComplete="shipping street-address"
            required
            placeholder="Москва, проспект мира, 42"
          />
        </label>
      </fieldset>

      <div>
        {"Итого: "}
        <strong>{currency.format(props.total)}</strong>
      </div>
      <button>Оформить заказ</button>
    </footer>
  );
});
