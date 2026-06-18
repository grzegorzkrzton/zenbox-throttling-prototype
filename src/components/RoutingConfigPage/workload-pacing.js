/**
 * @typedef {Object} ChannelConfig
 * @property {boolean} enabled
 * @property {number} initialCapacity
 * @property {number} rampUpDuration
 */

/**
 * @typedef {Object} WorkloadPacingState
 * @property {boolean} featureEnabled
 * @property {ChannelConfig} email
 * @property {ChannelConfig} messaging
 */

/** @type {WorkloadPacingState} */
export const DEFAULT_WORKLOAD_PACING_STATE = {
  featureEnabled: false,
  email: { enabled: false, initialCapacity: 50, rampUpDuration: 30 },
  messaging: { enabled: false, initialCapacity: 50, rampUpDuration: 30 },
};

export const validateCapacity = (val) => {
  if (val === '') return 'Required';
  const num = parseInt(val, 10);
  if (Number.isNaN(num)) return 'Must be a number';
  if (num < 0 || num > 100) return 'Must be between 0 and 100';
  return null;
};

export const validateDuration = (val) => {
  if (val === '') return 'Required';
  const num = parseInt(val, 10);
  if (Number.isNaN(num)) return 'Must be a number';
  if (num < 5 || num > 180) return 'Must be between 5 and 180 minutes';
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
  return isChannelConfigValid(state.email) && isChannelConfigValid(state.messaging);
};

/**
 * @param {ChannelConfig} email
 * @param {ChannelConfig} messaging
 * @param {number} emailCapacity
 * @param {number} messagingCapacity
 */
export const generateGraphData = (email, messaging, emailCapacity, messagingCapacity) => {
  const maxDuration = Math.max(
    email.enabled ? email.rampUpDuration : 0,
    messaging.enabled ? messaging.rampUpDuration : 0
  );

  const data = [];
  for (let t = 0; t <= maxDuration; t++) {
    const point = { time: t };

    if (email.enabled) {
      const progress = Math.min(t / email.rampUpDuration, 1);
      const percentage = email.initialCapacity + (100 - email.initialCapacity) * progress;
      point.emailCapacity = Math.round(percentage);
      point.emailTickets = Math.round((percentage / 100) * emailCapacity);
    }

    if (messaging.enabled) {
      const progress = Math.min(t / messaging.rampUpDuration, 1);
      const percentage = messaging.initialCapacity + (100 - messaging.initialCapacity) * progress;
      point.messagingCapacity = Math.round(percentage);
      point.messagingTickets = Math.round((percentage / 100) * messagingCapacity);
    }

    data.push(point);
  }
  return data;
};
