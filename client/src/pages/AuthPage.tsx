import React, { useState } from 'react';
import Enter from '../components/Entering/Enter';
import Registration from '../components/Entering/Registration';

type mode = 'enter' | 'registration';
export default function AuthPage() {
  const [mode, setMode] = useState<mode>('enter');

  return (
    <div className="auth-page">
      <div className="buttons">
        <button
          className={mode == 'enter' ? 'active' : ''}
          onClick={() => setMode('enter')}
        >
          Вход
        </button>
        <button
          className={mode == 'registration' ? 'active' : ''}
          onClick={() => setMode('registration')}
        >
          Регистрация
        </button>
      </div>
      {mode == 'enter' ? (
        <Enter />
      ) : (
        <Registration setEnter={() => setMode('enter')} />
      )}
    </div>
  );
}
