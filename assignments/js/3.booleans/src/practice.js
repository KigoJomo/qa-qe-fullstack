import bcrypt from 'bcrypt';

function verifyPassword(inputPassword, storedHashedPassword) {
  if (bcrypt.compareSync(inputPassword, storedHashedPassword)) {
    return true;
  } else {
    return false;
  }
}

function verifyMFA(inputMFACode, storedMFACode) {
  if (inputMFACode === storedMFACode) {
    return true;
  } else {
    return false;
  }
}

function checkBalance(balance, withdrawalAmount) {
  if (balance >= withdrawalAmount) {
    return true;
  } else {
    return false;
  }
}

function checkDailyLimit(withdrawalAmount, dailyLimit) {
  if (withdrawalAmount <= dailyLimit) {
    return true;
  } else {
    return false;
  }
}

function processWithdrawal(
  user,
  inputPassword,
  inputMfaCode,
  withdrawalAmount
) {
  if (verifyPassword(inputPassword, user.hashedPassword) === false) {
    return 'Transaction Failed: Incorrect Password.';
  }

  if (verifyMFA(inputMfaCode, user.correctMfaCode) === false) {
    return 'Transaction Failed: Incorrect MFA Code.';
  }

  if (checkBalance(user.balance, withdrawalAmount) === false) {
    return 'Transaction Failed: Insufficient Balance.';
  }

  if (checkDailyLimit(withdrawalAmount, user.dailyLimit) === false) {
    return 'Transaction Failed: Amount exceeds Daily Limit.';
  }

  user.balance -= withdrawalAmount;
  return 'Transaction Successful! New Balance: ' + user.balance;
}

/**
 * Challenge Questions:
 *
 * 1. Password Authentication:
 *    - It is important to store passwords in a hashed format because hashing converts plain text passwords into a secure, non-reversible string.
 *      This prevents attackers from easily obtaining the original password even if they gain unauthorized access to the stored data.
 *
 * 2. Multi-Factor Authentication (MFA):
 *    - Implementing MFA enhances security by requiring an additional form of verification besides the password.
 *      This extra layer helps prevent unauthorized access due to phishing, brute force, or social engineering attacks.
 *
 * 3. Balance Verification:
 *    - Checking the account balance before processing a withdrawal ensures that the user has sufficient funds.
 *      Skipping this step could lead to overdrafts, financial discrepancies, and unauthorized fund usage.
 *
 * 4. Daily Transaction Limit:
 *    - The daily transaction limit acts as a safeguard by restricting the amount that can be withdrawn in a day.
 *      This measure helps in preventing fraudulent or excessive withdrawals and mitigates potential losses in the event of account compromise.
 *
 * 5. Improvement:
 *    - To enhance security further, such as adding fraud detection, you could implement monitoring of user transactions to detect abnormal withdrawal patterns.
 *      Techniques might include rule-based systems or machine learning algorithms to flag and review unusual activity, thereby providing an additional layer of protection.
 */