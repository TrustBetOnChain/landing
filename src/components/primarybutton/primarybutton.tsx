import { ReactNode } from "react";
import classNames from "classnames";

import s from "./primarybutton.module.scss";

type Props = {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

export const PrimaryButton = ({ className, children, onClick }: Props) => {
  return (
    <button
      className={classNames(className, s.primaryButton)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
