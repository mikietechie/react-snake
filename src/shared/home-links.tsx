import React from "react";
import { SnakeGamePage } from "../pages/snake";

type HomeLink = {
  title: string;
  path: string;
  element: React.JSX.Element;
  description: string;
  image: string;
};

export const HOME_LINKS: HomeLink[] = [
  {
    title: "Snake Game",
    element: <SnakeGamePage />,
    path: "/snake-game",
    description: "",
    image: "",
  },
];
