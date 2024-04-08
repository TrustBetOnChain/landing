import { ReactNode } from "react";
import classNames from "classnames";

import s from "./primarybutton.module.scss";

export const PrimaryButton = ({
  className,
  onClick,
  label,
  icon,
}: {
  className?: string;
  onClick?: () => void;
  label: string;
  icon: ReactNode;
}) => {
  return (
    <button
      className={classNames(className, s.primaryButton)}
      onClick={onClick}
    >
      {label}
      {icon}
    </button>
  );
};
