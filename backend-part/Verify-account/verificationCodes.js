const CODE_TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 3;
const verificationCodes = new Map();

export function saveVerificationCode(email, code) {
  verificationCodes.set(email.trim().toLowerCase(), {
    code,
    expiresAt: Date.now() + CODE_TTL_MS,
    attempts: 0,
  });
}
export function verifyCode(email, submittedCode) {
  const key = email.trim().toLowerCase();
  const savedCode = verificationCodes.get(key);

  if (!savedCode || Date.now() >= savedCode.expiresAt) {
    verificationCodes.delete(key);
    return false;
  }

  if (savedCode.code !== submittedCode) {
    savedCode.attempts += 1;
    if (savedCode.attempts >= MAX_ATTEMPTS) {
      verificationCodes.delete(key);
    }
    return false;
  }

  verificationCodes.delete(key);
  return true;
}
