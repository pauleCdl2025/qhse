/**
 * Générateur et validateur de code linge
 * Format: XX-XX-XX-YYYYMMDD-NNN-CC
 * Exemple: CD-BL-DR-20251024-001-42
 */

export function checksum2digits(s: string): string {
  // Calcule somme ASCII % 97 et renvoie sous forme de 2 chiffres
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s.charAt(i);
    if (ch.match(/[A-Za-z0-9]/)) {
      total += ch.charCodeAt(0);
    }
  }
  return String(total % 97).padStart(2, '0');
}

export function generateLingeCode(
  center: string = 'CD',
  service: string = 'BL',
  item: string = 'DR',
  date: Date = new Date(),
  seq: number = 1
): string {
  const datestr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const seqstr = String(seq).padStart(3, '0');
  const main = `${center}-${service}-${item}-${datestr}-${seqstr}`;
  const cc = checksum2digits(main);
  return `${main}-${cc}`;
}

export function validateLingeCode(code: string): boolean {
  // Format attendu: XX-XX-XX-YYYYMMDD-NNN-CC
  const parts = code.split('-');
  if (parts.length !== 6) {
    return false;
  }
  const main = parts.slice(0, -1).join('-');
  const expectedCC = checksum2digits(main);
  return parts[parts.length - 1] === expectedCC;
}

