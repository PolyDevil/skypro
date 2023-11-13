import { component$, Slot } from "@builder.io/qwik";

import Header from "~/components/layouts/header";

import styles from "./styles.module.css";

export default component$(() => {
  return (
    <div class={styles.rootX}>
      <Header />

      <main>
        <Slot />
      </main>
    </div>
  );
});
