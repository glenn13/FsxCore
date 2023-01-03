import React, {useState} from 'react';
import {FsxInput} from '@app/components/common';
import {RadioButton} from '@progress/kendo-react-inputs';
const generatePassword = require('password-generator');

interface IUserPasswordGeneratorProps {
  setPassword: any;
}

const UserPasswordGenerator: React.FC<IUserPasswordGeneratorProps> = ({setPassword, ...props}) => {
  const [selectedValue, setSelectedValue] = React.useState(3);
  const [passwordLen, setPasswordLen] = useState(20);

  const randomizeCharCase = React.useCallback((text: string) => {
    const _arr = text.split('');
    let _str = '';
    for (var i = 0, len = _arr.length; i < len; i++) {
      if (Math.floor(Math.random() * 2) + 1 === 1) _str += _arr[i].toUpperCase();
      else _str += _arr[i].toLowerCase();
    }

    return _str;
  }, []);

  React.useEffect(() => {
    let generatedPass = '';

    if (selectedValue === 0) generatedPass = randomizeCharCase(generatePassword(passwordLen));
    else if (selectedValue === 1) generatedPass = generatePassword(passwordLen, false, /[A-Za-z]/);
    else if (selectedValue === 2) generatedPass = generatePassword(passwordLen, false, /[0-9]/);
    else generatedPass = generatePassword(passwordLen, false, /[\w\d?-@#!]/);

    setPassword(generatedPass);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordLen, selectedValue]);

  const handleChange = React.useCallback(e => setSelectedValue(e.value), [setSelectedValue]);
  const handleInput = React.useCallback((event: any) => setPasswordLen(event.target.value), [
    setPasswordLen,
  ]);

  return (
    <div className="flex">
      <div className="w-col w-full">
        <FsxInput
          label="Password Length"
          name="passwordLenght"
          type="text"
          value={passwordLen}
          onInput={handleInput}
        />

        <div className="mt-5">
          <span className="pr-4">
            <RadioButton
              name="rbpassgen"
              value={0}
              checked={selectedValue === 0}
              onChange={handleChange}
            />
          </span>
          <label>Easy to say</label>
        </div>

        <div className="mt-5">
          <span className="pr-4">
            <RadioButton
              name="rbpassgen"
              value={1}
              checked={selectedValue === 1}
              onChange={handleChange}
            />
          </span>
          <label>Alpha Character</label>
        </div>

        <div className="mt-5">
          <span className="pr-4">
            <RadioButton
              name="rbpassgen"
              value={2}
              checked={selectedValue === 2}
              onChange={handleChange}
            />
          </span>
          <label>Numeric</label>
        </div>

        <div className="mt-5">
          <span className="pr-4">
            <RadioButton
              name="rbpassgen"
              value={3}
              checked={selectedValue === 3}
              onChange={handleChange}
            />
          </span>
          <label>All Characters</label>
        </div>
      </div>
      <div className="w-col w-full"></div>
    </div>
  );
};

export default React.memo(UserPasswordGenerator);
