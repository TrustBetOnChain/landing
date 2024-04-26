import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";
// import { RadioOption } from "../testprices/testprices";

type Props = {
  legend: string;
  description: string;
  className?: string;
  options: any[];
} & InputHTMLAttributes<HTMLInputElement>;

export const RadioButton = React.forwardRef<HTMLInputElement, Props>(
  ({ className, legend, description, options, ...props }: Props, ref) => {
    return (
      <div className={classNames(className)}>
        <legend className="mt-5 text-sm font-semibold leading-6 text-white">
          {legend}
        </legend>
        <p className="mt-1 text-sm leading-6 text-white">{description}</p>
        <div className="mt-6 flex items-center gap-8 flex-wrap">
          {options.map(({ name, id }) => (
            <div key={id} className="flex flex-1 items-center gap-x-3">
              <input
                ref={ref}
                {...props}
                id={id}
                type="radio"
                value={id}
                className="h-4 w-4 border-gray-300"
              />
              <label
                htmlFor={id}
                className="block text-sm font-medium leading-6 white"
              >
                {name}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
