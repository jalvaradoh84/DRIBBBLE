import React, { ChangeEventHandler } from "react";

type Props = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
};

const FormField: React.FC<Props> = ({
  type = "text",
  title,
  state,
  placeholder,
  isTextArea = false,
  setState,
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setState(e.target.value);
  };

  return (
    <div className="flexStart flex-col w-full gap-4">
      <label className="w-full text-gray-100">{title}</label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          className="form_field-input"
          onChange={handleChange}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          required
          value={state}
          className="form_field-input"
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default FormField;
