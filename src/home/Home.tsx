import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Home.module.css';
import { useState } from 'react';

interface IFormState {
  name: string;
  email: string;
}

function Home() {
  const { register, handleSubmit, reset } = useForm<IFormState>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit: SubmitHandler<IFormState> = (data:IFormState) => {
    setIsLoading(true);
    fetch('http://localhost:5000/api', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) return;
        setIsSuccess(true);
        reset();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSuccess ? (
          <div className={styles.success}>Order completed</div>
        ) : (
          <>
            <h1>GTA 6 - Make an order</h1>
            <input type="email" placeholder="Type your Email:" {...register('email')} />
            <input type="text" placeholder="Type your name:" {...register('name')} />
            <button disabled={isLoading}>{isLoading ? 'Loading...' : 'I WANT TO ORDER'}</button>
          </>
        )}
      </form>
    </div>
  );
}

export default Home;
