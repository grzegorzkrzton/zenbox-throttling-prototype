import { useState } from 'react';
import { Button } from '@zendeskgarden/react-buttons';
import { Field, Input, Label, Message } from '@zendeskgarden/react-forms';
import { LG, MD } from '@zendeskgarden/react-typography';
import './PasswordGate.css';

const STORAGE_KEY = 'tt_unlocked';
const PASSWORD = 'Throttling!23';

function isUnlocked() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(isUnlocked);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === PASSWORD) {
      try {
        localStorage.setItem(STORAGE_KEY, '1');
      } catch {
        // Continue even if storage is unavailable.
      }
      setError(false);
      setUnlocked(true);
      return;
    }

    setError(true);
  };

  if (unlocked) {
    return children;
  }

  return (
    <div className="password-gate">
      <div className="password-gate__card">
        <LG tag="h1" className="password-gate__title">
          Workload ramp-up prototype
        </LG>
        <MD className="password-gate__description">
          Enter the password to view this prototype.
        </MD>
        <form className="password-gate__form" onSubmit={handleSubmit}>
          <Field>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (error) setError(false);
              }}
              autoComplete="current-password"
            />
            {error && (
              <Message validation="error">That password is incorrect.</Message>
            )}
          </Field>
          <Button type="submit" isPrimary className="password-gate__submit">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
