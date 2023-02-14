export const throwErrorIsInstanceOf = <T extends new (...args: unknown[]) => unknown>(
  error: unknown,
  ...exceptions: T[]
) => {
  if (exceptions.some((exception) => error instanceof exception)) {
    throw error;
  }
};
