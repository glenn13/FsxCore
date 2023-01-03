import React from 'react';
import clx from 'classnames';
import styled from 'styled-components';

const TextAreaStyled = styled.textarea`
  border: 1px solid rgba(0, 0, 0, 0.08);
  outline: none;
  padding: 12px 16px 7px 16px !important;
  line-height: 1.5;
  font-size: 10pt;
  width: 100%;
  font-weight: 300;

  &:focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: 0 10px 17px -14px #999ea08a !important;
  }
`;

export interface FsxTextareaProps extends React.HtmlHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  label?: string;
  rounded?: boolean;
  disabled?: boolean;
}

const FsxTextarea: React.FC<FsxTextareaProps> = ({
  value,
  label,
  rounded = true,
  disabled,
  className,
  ...rest
}) => {
  return (
    <div className="flex relative mt-4">
      {label && <span className="input__label">{label}</span>}
      <TextAreaStyled
        {...rest}
        style={{resize: 'none', outlineColor: '#D9D9D9', outlineWidth: '1px'}}
        className={`w-full text-xl p-4 input__field input__shadow mb-3 ${clx(className, {
          'btn-rounded': rounded,
        })}`}
        name="remarks"
        value={value}
        rows={8}
        disabled={disabled}
      />
    </div>
  );
};

export default FsxTextarea;
