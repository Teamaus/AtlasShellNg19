export function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')   // החלף + ב־-
    .replace(/\//g, '_')   // החלף / ב־_
    .replace(/=+$/, '');   // הסר = בסוף
}

export function base64UrlDecode(str: string): string {
  // החזר את התווים ל-Base64 רגיל
  let base64 = str
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  // הוסף חזרה את ה־= שחסרים
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  return atob(base64);
}
