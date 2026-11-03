import { type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, className = '', id, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink-600 dark:text-ink-300">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 px-4 py-2.5 text-ink-900 dark:text-ink-50 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${className}`}
        {...rest}
      />
    </div>
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function Textarea({ label, className = '', id, ...rest }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink-600 dark:text-ink-300">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 px-4 py-2.5 text-ink-900 dark:text-ink-50 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-y min-h-[100px] ${className}`}
        {...rest}
      />
    </div>
  );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export function Select({ label, className = '', id, children, ...rest }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink-600 dark:text-ink-300">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 px-4 py-2.5 text-ink-900 dark:text-ink-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${className}`}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
}
