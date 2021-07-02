import Head from 'next/head';
import { FormEvent, useState } from 'react';
import ExposedBypass from 'src/components/ExposedBypass';
import ToolTip from 'src/components/ToolTip';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ hasProccessingError, setHasProcessingError ] = useState(false);
  const [ hasUsernameError, setHasUsernameError ] = useState(false);
  const [ hasPasswordError, setHasPasswordError ] = useState(false);
  const [ showUsernameToolTip, setShowUsernameToolTip ] = useState(false);
  const [ showPasswordToolTip, setShowPasswordToolTip ] = useState(false);
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
        setExposedWarning(false);
        const rawResponseCreate = await fetch('/api/create_new_account', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        });
        const res = await rawResponseCreate.json();
        console.log('account creation', res);
        if (res.result) {
          console.log('account created!');
        } else {
          if (res.errors.isUsernameValid) setHasUsernameError(true);
          if (res.errors.isPasswordValid) setHasPasswordError(true);
        }
      }
    } catch (e) {
      setHasProcessingError(true);
    }
  };

  const handleChange = (event: any) => {
    if (exposed) setExposed(false);
    if (bypassWarning) setBypassWarning(false);
    if (event.target.name === 'username') {
      if (hasUsernameError) {
        setHasUsernameError(false);
      };
      setUsername(event.target.value);
    }
    if (event.target.name === 'password') {
      if (hasPasswordError) {
        setHasPasswordError(false);
      };
      setPassword(event.target.value);
    }
  };

  const usernameError = hasUsernameError
    ? <span style={{color: '#a20000'}}>
        * {
            showUsernameToolTip
            ? <ToolTip minChar={10} maxChar={50} leftPos={'75px'}/>
            : null
          }
      </span>
    : null;

  const passwordError = hasPasswordError
    ? <span style={{color: '#a20000'}}>
        * {
            showPasswordToolTip
            ? <ToolTip minChar={20} maxChar={50} leftPos={'70px'}/>
            : null
          }
      </span>
    : null;

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <article className={styles.article}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <img src="/logo.png" />
          {/* <Image src={logo} alt='wealthfront logo' /> */}
          <h1>Create New Account</h1>
          {hasProccessingError ? <p>Error processing request. Please try again.</p> : null}
          {exposedWarning ? <p>Warning! Our records show that your password may be been exposed. We recommend that you choose a different password.</p> : null}
          <label style={{position: 'relative'}}>
            Username {usernameError}
            <input
              type='text'
              name='username'
              value={username}
              onChange={handleChange}
              onFocus={() => setShowUsernameToolTip(true)}
              onBlur={() => setShowUsernameToolTip(false)}
              onKeyPress={(e) => {if (e.key === 'Enter') e.currentTarget.blur()}} ></input>
          </label>
          <label style={{position: 'relative'}}>
            Password {passwordError}
            <input
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              onFocus={() => setShowPasswordToolTip(true)}
              onBlur={() => setShowPasswordToolTip(false)}
              onKeyPress={(e) => {if (e.key === 'Enter') e.currentTarget.blur()}} ></input>
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
