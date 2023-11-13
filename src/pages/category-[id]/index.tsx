import { component$, type Signal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import c from "clsx";
import styles from "./styles.module.css";
import { type t } from "~/routes";

type props = {
  class?: string;
  data: Signal<t>;
};

export default component$<props>((props) => {
  return (
    <div class={c(props.class, styles.rootX)}>
      <h1>{props.data.value.name}</h1>
      <div>Находится в разработке...</div>
      <Link href="/">Вернуться на главную</Link>
    </div>
  );
});
