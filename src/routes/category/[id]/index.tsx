import { type Signal, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import Page from "~/pages/category-[id]";
import { data, type t } from "~/routes";

export const useData = routeLoader$(async (requestEvent) => {
  const maybeData = data.find((e) => e.uid === requestEvent.params.id);

  if (maybeData) {
    return maybeData;
  }

  return {
    errorMessage: "404",
  };
});

export default component$(() => {
  const signal = useData();

  if ("errorMessage" in signal.value) {
    return <>{signal.value.errorMessage}</>;
  }

  return <Page data={signal as Signal<t>} />;
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
