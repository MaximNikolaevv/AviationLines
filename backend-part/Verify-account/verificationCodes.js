const CODE_TTL_MS = 10 * 60 * 1000; // Кодът е валиден десет минути.
const MAX_ATTEMPTS = 5; // Ограничаваме опитите за въвеждане на код.
const verificationCodes = new Map(); // Съхраняваме кодовете само в backend-а.

export function saveVerificationCode(email, code) { // Запазва код за потвърждение към имейл адрес.
  verificationCodes.set(email.trim().toLowerCase(), { // Нормализира имейла за последователно търсене.
    code, // Не изпращаме генерирания код към браузъра.
    expiresAt: Date.now() + CODE_TTL_MS, // Записва момента на изтичане на кода.
    attempts: 0, // Започва брояча на неуспешните опити от нула.
  }); 
} 
export function verifyCode(email, submittedCode) { 
  const key = email.trim().toLowerCase(); 
  const savedCode = verificationCodes.get(key); // Намира чакащия код за потвърждение.

  if (!savedCode || Date.now() >= savedCode.expiresAt) { // Отхвърля липсващ или изтекъл код.
    verificationCodes.delete(key); // Премахва невалидния код от паметта.
    return false;
  } 

  if (savedCode.code !== submittedCode) { // Отхвърля код, който не съвпада.
    savedCode.attempts += 1; // Брои неуспешния опит.
    if (savedCode.attempts >= MAX_ATTEMPTS) { // Спира неограничените опити за отгатване.
      verificationCodes.delete(key); // Обезсилва кода след твърде много грешни опити.
    } 
    return false; // Показва, че проверката е неуспешна.
  } // Край на проверката за несъвпадащ код.

  verificationCodes.delete(key); // Позволява кодът да бъде използван само веднъж.
  return true; // Показва, че кодът е потвърден успешно.
} // Край на помощната функция за проверка.
