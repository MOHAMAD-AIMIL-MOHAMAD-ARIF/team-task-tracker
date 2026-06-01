import type { PropsWithChildren } from "react";
import "./Card.css";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

function Card({ children, className = "" }: CardProps) {
  const classes = ["ui-card", className].filter(Boolean).join(" ");
  return <section className={classes}>{children}</section>;
}

export default Card;