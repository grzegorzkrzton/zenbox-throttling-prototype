/**
 * @typedef {Object} ChannelConfig
 * @property {boolean} enabled
 * @property {number} initialCapacity
 * @property {number} rampUpDuration
 */

/**
 * @typedef {Object} WorkloadPacingState
 * @property {boolean} featureEnabled
 * @property {number} rampUpTimeout
 * @property {ChannelConfig} email
 * @property {ChannelConfig} messaging
 */

/** @type {WorkloadPacingState} */
export const DEFAULT_WORKLOAD_PACING_STATE = {
  featureEnabled: false,
  rampUpTimeout: 60,
  email: { enabled: false, initialCapacity: 50, rampUpDuration: 30 },
  messaging: { enabled: false, initialCapacity: 50, rampUpDuration: 30 },
};

export const TIMEOUT_UNITS = {
  MINUTES: 'minutes',
  HOURS: 'hours',
};

export const validateCapacity = (val) => {
  if (val === '') return 'Required';
  const num = parseInt(val, 10);
  if (Number.isNaN(num)) return 'Must be a number';
  if (num < 1 || num > 99) return 'Must be between 1 and 99';
  return null;
};

export const validateDuration = (val) => {
  if (val === '') return 'Required';
  const num = parseInt(val, 10);
  if (Number.isNaN(num)) return 'Must be a number';
  if (num < 5 || num > 180) return 'Must be between 5 and 180 minutes';
  return null;
};

export const validateRampUpTimeoutInput = (val, unit) => {
  if (val === '') return 'Required';

  if (unit === TIMEOUT_UNITS.MINUTES) {
    if (!/^\d+$/.test(String(val).trim())) return 'Must be a whole number';
    const num = parseInt(val, 10);
    if (num < 30 || num > 720) return 'Must be between 30 and 720 minutes';
    return null;
  }

  const num = parseFloat(val);
  if (Number.isNaN(num)) return 'Must be a number';
  if (num < 0.5 || num > 12) return 'Must be between 0.5 and 12 hours';
  return null;
};

/**
 * @param {number} minutes
 * @param {'minutes' | 'hours'} unit
 */
export const toTimeoutDisplayValue = (minutes, unit) => {
  if (unit === TIMEOUT_UNITS.HOURS) {
    const hours = minutes / 60;
    return Number.isInteger(hours) ? String(hours) : String(hours);
  }
  return String(minutes);
};

/**
 * @param {string} val
 * @param {'minutes' | 'hours'} unit
 */
export const fromTimeoutDisplayValue = (val, unit) => {
  const num = unit === TIMEOUT_UNITS.HOURS ? parseFloat(val) : parseInt(val, 10);
  return unit === TIMEOUT_UNITS.HOURS ? Math.round(num * 60) : num;
};

export const validateRampUpTimeoutMinutes = (minutes) => {
  if (!Number.isInteger(minutes) || minutes < 30 || minutes > 720) {
    return 'Must be between 30 and 720 minutes';
  }
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
  if (validateRampUpTimeoutMinutes(state.rampUpTimeout) !== null) return false;
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
