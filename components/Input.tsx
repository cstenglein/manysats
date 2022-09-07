import { FC } from 'react';

const Input: FC = () => {
  const onChangeHandler = () => {};

  return (
    <div className='w-full flex my-8'>
      <input
        className='text-right bg-gray-800 border-b border-white outline-none focus:border-blue-400'
        type='text'
        inputMode='decimal'
      ></input>
      <label>€</label>
    </div>
  );
};

export default Input;
