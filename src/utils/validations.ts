export function validateCheckDigitis(cpf: string): boolean {
  const digits = cpf.split('').slice(0, 9).map(digit => Number(digit));
  const checkDigits = cpf.split('').slice(9).map(digit => Number(digit));
  const firstDigitCheck = calculateCheckDigits(digits);
  const secondDigitCheck = calculateCheckDigits([...digits, firstDigitCheck]);
  if (firstDigitCheck !== checkDigits[0]) {
      return false;
  }
  if (secondDigitCheck !== checkDigits[1]) {
      return false;
  }
  return true;
}

function calculateCheckDigits(digits: Array<number>): number {
  const sum = digits.reduce((acc, digit, index) => acc + (digit * ((digits.length + 1) - index)), 0);
  const remainder = sum * 10 % 11;
  return remainder < 10 ? remainder : 0;
}