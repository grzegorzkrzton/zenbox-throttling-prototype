import { useEffect, useState } from 'react';
import { Field, Label, Input, Hint, Message } from '@zendeskgarden/react-forms';
import { validateTimeout } from './workload-pacing';

export default function RampUpTimeoutField({
  value,
  onChange,
  onValidityChange,
  showValidationErrors = false,
}) {
  const [touched, setTouched] = useState(false);
  const error = validateTimeout(String(value));
  const displayValue = value === '' ? '' : String(value);
  const showError = (touched || showValidationErrors) && error;

  useEffect(() => {
    onValidityChange?.(error === null);
  }, [error, onValidityChange]);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="workload-ramp-up__timeout">
      <Field>
        <Label>Ramp-up timeout (minutes)</Label>
        <Hint>How long an agent must be away before ramp-up restarts.</Hint>
        <Input
          value={displayValue}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          type="number"
          min={30}
          max={720}
          step={1}
          validation={showError ? 'error' : undefined}
        />
        {showError && <Message validation="error">{error}</Message>}
      </Field>
    </div>
  );
}
