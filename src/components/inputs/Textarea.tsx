import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

type Props = {
  label: string;
  className?: string;
  hint: string;
  error?: FieldError;
} & InputHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ label, hint, className, error, ...props }: Props, ref) => {
    return (
      <div className={classNames(className)}>
        <label
          htmlFor={label}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="mt-2">
          <textarea
            {...props}
            ref={ref}
            id={label}
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-600">{hint}</p>
        {error && <p className="text-xs text-red-600">{error.message}</p>}
      </div>
    );
  },
);
