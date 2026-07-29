import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  const classes = ["mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12"];

  if (className) {
    classes.push(className);
  }

  return <div className={classes.join(" ")}>{children}</div>;
}
