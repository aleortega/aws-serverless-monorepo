import logger from 'pino';

const getFrom = (callerModule, enableLogging = true) => {
  return logger({
    name: callerModule,
    base: null,
    enable: enableLogging
  });
};

export default { getFrom };