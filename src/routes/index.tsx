import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Page from "~/pages/home";
import image1 from "./1.png";
import image2 from "./2.png";
import image3 from "./3.png";
import image4 from "./4.png";
import image5 from "./5.png";
import image6 from "./6.png";

export type t = {
  id: number;
  uid: string;
  name: string;
  description: string;
  price: number;
  cover: string;
};

export const data: Array<t> = [
  {
    id: 1,
    uid: "tatran",
    name: "Кровать TATRAN",
    description:
      "Основание из полированной нержавеющей стали, придает оригинальный парящий эффект.",
    price: 120_000,
    cover: image1,
  },
  {
    id: 2,
    uid: "vilora",
    name: "Кресло VILORA",
    description:
      "Мягкое и уютное, аккуратное и стильное. Упругие подушки сиденья и приятная на ощупь ткань. ",
    price: 21_000,
    cover: image2,
  },
  {
    id: 3,
    uid: "menu",
    name: "Стол MENU",
    description:
      "Европейский дуб - отличается особой прочностью и стабильностью.",
    price: 34_000,
    cover: image3,
  },
  {
    id: 4,
    uid: "askesta",
    name: "Диван ASKESTA",
    description:
      "Благодаря защелкивающемуся механизму диван легко раскладывается в комфортную кровать",
    price: 68_000,
    cover: image4,
  },
  {
    id: 5,
    uid: "lunar",
    name: "Кресло LUNAR",
    description:
      "Прекрасно переносит солнечные лучи, перепады влажности и любые осадки",
    price: 40_000,
    cover: image5,
  },
  {
    id: 6,
    uid: "nastan",
    name: "Шкаф Nastan",
    description:
      "Мебель может быть оснащена разнообразными системами подсветки.",
    price: 80_000,
    cover: image6,
  },
];

export default component$(() => {
  return <Page />;
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
