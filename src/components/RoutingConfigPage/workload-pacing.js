/**
 * @typedef {Object} ChannelConfig
 * @property {boolean} enabled
 * @property {string | number} initialCapacity
 * @property {string | number} rampUpDuration
 */

/**
 * @typedef {Object} WorkloadPacingState
 * @property {boolean} featureEnabled
 * @property {string | number} rampUpTimeout
 * @property {ChannelConfig} email
 * @property {ChannelConfig} messaging
 */

/** @type {WorkloadPacingState} */
export const DEFAULT_WORKLOAD_PACING_STATE = {
  featureEnabled: false,
  rampUpTimeout: '',
  email: { enabled: false, initialCapacity: '', rampUpDuration: '' },
  messaging: { enabled: false, initialCapacity: '', rampUpDuration: '' },
};

export const validateCapacity = (val) => {
  if (val === '') return 'Enter a value between 1 and 99%.';
  const num = parseInt(val, 10);
  if (Number.isNaN(num)) return 'Enter a value between 1 and 99%.';
  if (num < 1 || num > 99) return 'Enter a value between 1 and 99%.';
  return null;
};

export const validateDuration = (val) => {
  if (val === '') return 'Enter a duration between 5 and 180 minutes.';
  const num = parseInt(val, 10);
  if (Number.isNaN(num)) return 'Enter a duration between 5 and 180 minutes.';
  if (num < 5 || num > 180) return 'Enter a duration between 5 and 180 minutes.';
  return null;
};

export const validateTimeout = (val) => {
  if (val === '') return 'Enter a timeout between 30 and 720 minutes.';
  if (!/^\d+$/.test(String(val).trim())) return 'Enter a timeout between 30 and 720 minutes.';
  const num = parseInt(val, 10);
  if (num < 30 || num > 720) return 'Enter a timeout between 30 and 720 minutes.';
  return null;
};

export const isChannelConfigValid = (config) => {
  if (!config.enabled) return true;
  return (
    validateCapacity(String(config.initialCapacity)) === null &&
    validateDuration(String(config.rampUpDuration)) === null
  );
};

export const isWorkloadPacingValid = (state) => {
  if (!state.featureEnabled) return false;
  const hasEnabledChannel = state.email.enabled || state.messaging.enabled;
  if (!hasEnabledChannel) return false;
  if (validateTimeout(String(state.rampUpTimeout)) !== null) return false;
  return isChannelConfigValid(state.email) && isChannelConfigValid(state.messaging);
};

const toNumber = (val) => parseInt(String(val), 10);

/**
 * @param {ChannelConfig} email
 * @param {ChannelConfig} messaging
 * @param {number} emailCapacity
 * @param {number} messagingCapacity
 */
export const generateGraphData = (email, messaging, emailCapacity, messagingCapacity) => {
  const emailDuration = email.enabled ? toNumber(email.rampUpDuration) : 0;
  const messagingDuration = messaging.enabled ? toNumber(messaging.rampUpDuration) : 0;
  const maxDuration = Math.max(emailDuration, messagingDuration);

  const data = [];
  for (let t = 0; t <= maxDuration; t++) {
    const point = { time: t };

    if (email.enabled) {
      const initialCapacity = toNumber(email.initialCapacity);
      const rampUpDuration = emailDuration;
      const progress = Math.min(t / rampUpDuration, 1);
      const percentage = initialCapacity + (100 - initialCapacity) * progress;
      point.emailCapacity = Math.round(percentage);
      point.emailTickets = Math.round((percentage / 100) * emailCapacity);
    }

    if (messaging.enabled) {
      const initialCapacity = toNumber(messaging.initialCapacity);
      const rampUpDuration = messagingDuration;
      const progress = Math.min(t / rampUpDuration, 1);
      const percentage = initialCapacity + (100 - initialCapacity) * progress;
      point.messagingCapacity = Math.round(percentage);
      point.messagingTickets = Math.round((percentage / 100) * messagingCapacity);
    }

    data.push(point);
  }
  return data;
};
