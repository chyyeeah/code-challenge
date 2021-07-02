import Head from 'next/head';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import ExposedBypass from '../components/ExposedBypass';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ hasFormError, setHasFormError ] = useState(false);
  const [ formError, setFormError ] = useState('');
  const [ exposed, setExposed ] = useState(false);
  const [ exposedWarning, setExposedWarning] = useState(false);
  const [ bypassWarning, setBypassWarning ] = useState(false);

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    setExposedWarning(false);
    try {
      const rawResponseExposed = await fetch('/api/password_exposed', {
        method: 'POST',
        body: JSON.stringify({ password })
      });

      const resExposed = await rawResponseExposed.json();
      console.log('exposed', resExposed);
      if (resExposed.result) {
        setExposed(true);
        setExposedWarning(true);
      }

      if (!resExposed.result || (exposed && bypassWarning)) {
        const rawResponseCreate = await fetch('/api/create_new_account', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        });
        const res = await rawResponseCreate.json();
        console.log('account creation', res);
        if (res.result) {
          console.log('account created!');
        } else {
          setHasFormError(true);
          setFormError('Error creating account. Please try again.');
        }
      }
    } catch (e) {
      setHasFormError(true);
      setFormError('Error processing request. Please try again.')
    }
  };

  const handleChange = (event: any) => {
    if (exposed) setExposed(false);
    if (bypassWarning) setBypassWarning(false);
    if (hasFormError) {
      setHasFormError(false);
      setFormError('');
    };
    if (event.target.name === 'username') setUsername(event.target.value);
    if (event.target.name === 'password') setPassword(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <article className={styles.article}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <img src="/logo.png" />
          <h1>Create New Account</h1>
          {hasFormError ? <p>{formError}</p> : null}
          {exposedWarning ? <p>Warning! Our records show that your password may be been exposed. We recommend that you choose a different password.</p> : null}
          <label>
            Username
            <input type='text' name='username' value={username} onChange={handleChange}></input>
          </label>
          <label>
            Password
            <input type='password' name='password' value={password} onChange={handleChange}></input>
          </label>
          {
            exposed
            ? <ExposedBypass
                bypassWarning={bypassWarning}
                setBypassWarning={setBypassWarning} /> : null}
          <button name="create-account">Create Account</button>
        </form>
      </article>
    </>
  );
}
