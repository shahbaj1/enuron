import { FC } from "react";

interface ComboboxProps {
  options: {
    label: string;
    value: string;
  }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selected: string
}

export const Combobox: FC<ComboboxProps> = ({ options, onChange, selected }) => {
  return (
    <form className="max-w-sm mx-auto">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={onChange}
        value={selected}
      >
        {selected === "" && (<option selected>Select an option...</option>)} 
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  );
};
