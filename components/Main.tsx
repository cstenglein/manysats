import { ChangeEvent, useEffect, useState } from 'react';

const Main = () => {
  const [fiatAmount, setFiatAmount] = useState<string>('');
  const [satAmount, setSatAmount] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [formattedPrice, setFormattedPrice] = useState<string>('');

  const onChangeFiatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.target.value.replace(/[^0-9.]/g, '');
    const formattedInput = input.endsWith('.') ? input : new Intl.NumberFormat('en-US').format(+input);
    setFiatAmount(formattedInput);
    console.log('CHANGE FIAT', formattedInput);
    // format output
    const converted = ((+input / price!) * 100_000_000).toFixed(0);
    const formatted = new Intl.NumberFormat('en-US').format(+converted);
    setSatAmount(formatted);
  };

  const onChangeSatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.target.value.replace(/[^0-9.]/g, '');
    const formattedInput = input.endsWith('.') ? input : new Intl.NumberFormat('en-US').format(+input);
    setSatAmount(formattedInput);
    console.log('CHANGE SAT', formattedInput);
    // format output
    const converted = ((+input * price!) / 100_000_000).toFixed(2);
    const formatted = new Intl.NumberFormat('en-US').format(+converted);
    setFiatAmount(formatted);
  };

  useEffect(() => {
    fetch('/api/price')
      .then((res) => res.json())
      .then((data: number) => {
        setPrice(data);
        setFormattedPrice(
          new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            currency: 'EUR'
          }).format(data)
        );
      });
  }, []);

  return (
    <main className='h-screen flex flex-col items-center bg-gray-200'>
      <h1 className='text-4xl p-8 mb-8'>ManySats</h1>
      <section className='w-11/12 md:w-auto flex items-center flex-col text-white'>
        <article className='w-full mx-5 flex justify-start px-2'>
          <p className='bg-blue-500 p-2 -my-5 rounded-full text-white text-sm z-10'>{formattedPrice} € / BTC</p>
        </article>
        <article className='flex p-20 bg-blue-600 w-full shadow-xl rounded-t-xl justify-center'>
          <input
            className='border-b border-white outline-none focus:border-indigo-800 p-2 bg-blue-700'
            type='text'
            inputMode='decimal'
            value={fiatAmount}
            onChange={onChangeFiatHandler}
          ></input>
          <label className='p-2'>€</label>
        </article>
        <article className='flex p-20 bg-blue-700 w-full rounded-b-xl justify-center'>
          <input
            className='border-b border-white outline-none focus:border-indigo-200 p-2 bg-indigo-600'
            type='text'
            inputMode='decimal'
            value={satAmount}
            onChange={onChangeSatHandler}
          ></input>
          <label className='p-2'>SATS</label>
        </article>
      </section>
    </main>
  );
};

export default Main;
