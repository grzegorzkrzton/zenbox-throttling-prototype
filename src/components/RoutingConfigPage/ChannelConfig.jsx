import { useEffect, useState } from 'react';
import { Field, Label, Input, Message } from '@zendeskgarden/react-forms';
import { validateCapacity, validateDuration } from './workload-pacing';

export default function ChannelConfig({
  config,
  onChange,
  onValidityChange,
  showValidationErrors = false,
}) {
  const [touched, setTouched] = useState({ capacity: false, duration: false });
  const capacityValue = config.initialCapacity === '' ? '' : String(config.initialCapacity);
  const durationValue = config.rampUpDuration === '' ? '' : String(config.rampUpDuration);
  const capacityError = validateCapacity(capacityValue);
  const durationError = validateDuration(durationValue);
  const showCapacityError = (touched.capacity || showValidationErrors) && capacityError;
  const showDurationError = (touched.duration || showValidationErrors) && durationError;

  useEffect(() => {
    onValidityChange?.(capacityError === null && durationError === null);
  }, [capacityError, durationError, onValidityChange]);

  const handleCapacityChange = (e) => {
    onChange({ ...config, initialCapacity: e.target.value });
  };

  const handleDurationChange = (e) => {
    onChange({ ...config, rampUpDuration: e.target.value });
  };

  return (
    <div className="workload-ramp-up__channel-fields">
      <Field className="workload-ramp-up__channel-field">
        <Label>Initial capacity limit (%)</Label>
        <Input
          value={capacityValue}
          onChange={handleCapacityChange}
          onBlur={() => setTouched((prev) => ({ ...prev, capacity: true }))}
          type="number"
          min={1}
          max={99}
          validation={showCapacityError ? 'error' : undefined}
        />
        {showCapacityError && (
          <Message validation="error">{capacityError}</Message>
        )}
      </Field>
      <Field className="workload-ramp-up__channel-field">
        <Label>Ramp-up duration (minutes)</Label>
        <Input
          value={durationValue}
          onChange={handleDurationChange}
          onBlur={() => setTouched((prev) => ({ ...prev, duration: true }))}
          type="number"
          min={5}
          max={180}
          validation={showDurationError ? 'error' : undefined}
        />
        {showDurationError && (
          <Message validation="error">{durationError}</Message>
        )}
      </Field>
    </div>
  );
}
