import Head from 'next/head';
import { FormEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ submitError, setSubmitError ] = useState(false);

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    const res = await response.json();
    console.log(res);
  };

  const handleChange = (event: any) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <article className={styles.article}>
        <h1>Create New Account</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Username
            <input type='text' name='username' value={username} onChange={handleChange}></input>
          </label>
          <label>
            Password
            <input type='password' name='password' value={password} onChange={handleChange}></input>
          </label>
          <button>Create Account</button>
        </form>
      </article>
    </>
  );
}
