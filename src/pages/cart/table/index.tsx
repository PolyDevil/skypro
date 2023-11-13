import { component$, type QRL } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import c from "clsx";
import { type t } from "~/routes";
import styles from "./styles.module.css";
import Card from "./card";

type props = {
  class?: string;
  data: Array<t & { count: number }>;
  removeFromCart: QRL<(id: t["id"]) => void>;
  change: QRL<(id: t["id"], value: string) => void>;
  reset: QRL<() => void>;
};

export default component$<props>((props) => {
  return (
    <table class={c(props.class, styles.rootX)}>
      <caption>Список товаров</caption>

      <thead>
        <tr>
          <th>Товар</th>

          <th>
            {/* It is possible to restyle it, but lets keep it this way for now */}
            <abbr title="количество">К-во</abbr>
          </th>
        </tr>
      </thead>

      <tbody>
        {props.data.map((e) => (
          <tr key={e.id}>
            <td>
              <Card data={e} removeFromCart={props.removeFromCart} />
            </td>

            <td>
              <label>
                <span>Кол-во</span>
                {/* there is no reason to create a half-baked custom componentm, so we use native one */}
                <input
                  value={e.count}
                  size={2}
                  type="number"
                  min="1"
                  max="99"
                  id={`${e.uid}_count`}
                  name={`${e.uid}_count`}
                  inputMode="numeric"
                  onChange$={(ev) => props.change(e.id, ev.target.value)}
                />
              </label>
            </td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan={2}>
            <menu role="toolbar">
              <li>
                <button type="reset" onClick$={props.reset}>
                  Очистить корзину
                </button>
              </li>
              <li>
                <Link href="/">Продолжить покупки</Link>
              </li>
            </menu>
          </td>
        </tr>
      </tfoot>
    </table>
  );
});
