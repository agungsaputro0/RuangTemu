import { FC, LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  forwhat: string;
  labelMessage: string;
}

const Label: FC<LabelProps> = ({ forwhat, labelMessage, ...rest }) => {
  return (
    <label
      htmlFor={forwhat}
      className="block text-white text-slate-700 text-sm font-bold mb-1"
      {...rest}
    >
      {labelMessage}
    </label>
  );
};

export default Label;