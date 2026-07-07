import { useState } from 'react';
import { Field, Label, Input, Select, Hint, Message, InputGroup } from '@zendeskgarden/react-forms';
import {
  TIMEOUT_UNITS,
  fromTimeoutDisplayValue,
  toTimeoutDisplayValue,
  validateRampUpTimeoutInput,
} from './workload-pacing';

export default function RampUpTimeoutField({ minutes, onChange, onValidityChange }) {
  const [unit, setUnit] = useState(TIMEOUT_UNITS.MINUTES);
  const [displayValue, setDisplayValue] = useState(
    toTimeoutDisplayValue(minutes, TIMEOUT_UNITS.MINUTES)
  );
  const [error, setError] = useState(null);

  const reportValidity = (nextError) => {
    setError(nextError);
    onValidityChange?.(nextError === null);
  };

  const commitValue = (val, currentUnit) => {
    const nextError = validateRampUpTimeoutInput(val, currentUnit);
    reportValidity(nextError);
    if (!nextError) {
      onChange(fromTimeoutDisplayValue(val, currentUnit));
    }
  };

  const handleValueChange = (e) => {
    const val = e.target.value;
    setDisplayValue(val);
    commitValue(val, unit);
  };

  const handleUnitChange = (e) => {
    const nextUnit = e.target.value;
    const currentMinutes = error === null ? fromTimeoutDisplayValue(displayValue, unit) : minutes;
    const nextDisplay = toTimeoutDisplayValue(currentMinutes, nextUnit);

    setUnit(nextUnit);
    setDisplayValue(nextDisplay);
    commitValue(nextDisplay, nextUnit);
  };

  const inputProps =
    unit === TIMEOUT_UNITS.HOURS
      ? { type: 'number', min: 0.5, max: 12, step: 0.5 }
      : { type: 'number', min: 30, max: 720, step: 1 };

  return (
    <div className="routing-config-page__timeout-field">
      <Field>
        <Label>Ramp-up timeout</Label>
        <Hint className="routing-config-page__timeout-hint">
          Absence before ramp-up can re-trigger. Match shift length or set above short breaks.
        </Hint>
        <InputGroup className="routing-config-page__timeout-input-group">
          <Input
            className="routing-config-page__timeout-value-input"
            value={displayValue}
            onChange={handleValueChange}
            {...inputProps}
          />
          <Select
            className="routing-config-page__timeout-unit-select"
            value={unit}
            onChange={handleUnitChange}
            aria-label="Ramp-up timeout unit"
          >
            <option value={TIMEOUT_UNITS.MINUTES}>Minutes</option>
            <option value={TIMEOUT_UNITS.HOURS}>Hours</option>
          </Select>
        </InputGroup>
        {error && <Message validation="error">{error}</Message>}
      </Field>
    </div>
  );
}
