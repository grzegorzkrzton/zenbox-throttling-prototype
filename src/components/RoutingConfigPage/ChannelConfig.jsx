import { useState } from 'react';
import { Field, Label, Input, Message } from '@zendeskgarden/react-forms';
import { validateCapacity, validateDuration } from './workload-pacing';

export default function ChannelConfig({ config, onChange, onValidityChange }) {
  const [capacityValue, setCapacityValue] = useState(String(config.initialCapacity));
  const [durationValue, setDurationValue] = useState(String(config.rampUpDuration));
  const [capacityError, setCapacityError] = useState(null);
  const [durationError, setDurationError] = useState(null);

  const reportValidity = (capacityErr, durationErr) => {
    onValidityChange?.(!capacityErr && !durationErr);
  };

  const handleCapacityChange = (e) => {
    const val = e.target.value;
    setCapacityValue(val);
    const error = validateCapacity(val);
    setCapacityError(error);
    reportValidity(error, durationError);
    if (!error) {
      onChange({ ...config, initialCapacity: parseInt(val, 10) });
    }
  };

  const handleDurationChange = (e) => {
    const val = e.target.value;
    setDurationValue(val);
    const error = validateDuration(val);
    setDurationError(error);
    reportValidity(capacityError, error);
    if (!error) {
      onChange({ ...config, rampUpDuration: parseInt(val, 10) });
    }
  };

  return (
    <div className="routing-config-page__channel-fields">
      <Field>
        <Label>Initial capacity limit (%)</Label>
        <Input
          value={capacityValue}
          onChange={handleCapacityChange}
          type="number"
          min={1}
          max={99}
        />
        {capacityError && <Message validation="error">{capacityError}</Message>}
      </Field>
      <Field>
        <Label>Ramp-up duration (minutes)</Label>
        <Input
          value={durationValue}
          onChange={handleDurationChange}
          type="number"
          min={5}
          max={180}
        />
        {durationError && <Message validation="error">{durationError}</Message>}
      </Field>
    </div>
  );
}
