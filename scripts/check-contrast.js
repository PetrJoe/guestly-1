/**
 * Contrast Ratio Checker for Dark Mode Typography
 * Calculates WCAG contrast ratios between background and foreground colors
 */

// Convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Calculate relative luminance
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio
function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

// WCAG AA Requirements
const WCAG_AA_NORMAL = 4.5;  // Normal text (< 18pt or < 14pt bold)
const WCAG_AA_LARGE = 3.0;   // Large text (≥ 18pt or ≥ 14pt bold)
const WCAG_AAA_NORMAL = 7.0; // AAA for normal text
const WCAG_AAA_LARGE = 4.5;  // AAA for large text

// Dark mode colors
const colors = {
  background: '#0D1821',
  foreground: '#e8edf5',
  foregroundMuted: '#94a3b8',
  foregroundSubtle: '#64748b',
  primary500: '#5ea1f5',
  success500: '#30a63b',
  danger500: '#e64450',
  warning500: '#fbbf24',
};

console.log('='.repeat(70));
console.log('DARK MODE TYPOGRAPHY CONTRAST ANALYSIS');
console.log('='.repeat(70));
console.log('\nWCAG AA Requirements:');
console.log('  • Normal text (< 18pt): 4.5:1 minimum');
console.log('  • Large text (≥ 18pt or ≥ 14pt bold): 3:1 minimum');
console.log('\nWCAG AAA Requirements:');
console.log('  • Normal text: 7:1 minimum');
console.log('  • Large text: 4.5:1 minimum');
console.log('\n' + '='.repeat(70));

// Test each color combination
const tests = [
  { name: 'Primary Text (Foreground)', fg: colors.foreground, bg: colors.background, usage: 'Headings, body text, primary content' },
  { name: 'Secondary Text (Muted)', fg: colors.foregroundMuted, bg: colors.background, usage: 'Helper text, metadata, timestamps' },
  { name: 'Tertiary Text (Subtle)', fg: colors.foregroundSubtle, bg: colors.background, usage: 'Decorative, optional content' },
  { name: 'Primary Links/Buttons', fg: colors.primary500, bg: colors.background, usage: 'Interactive elements, links' },
  { name: 'Success Text', fg: colors.success500, bg: colors.background, usage: 'Success messages, positive indicators' },
  { name: 'Danger Text', fg: colors.danger500, bg: colors.background, usage: 'Error messages, warnings' },
  { name: 'Warning Text', fg: colors.warning500, bg: colors.background, usage: 'Warning messages, cautions' },
];

let allPass = true;

tests.forEach(test => {
  const ratio = getContrastRatio(test.fg, test.bg);
  const passAA_Normal = ratio >= WCAG_AA_NORMAL;
  const passAA_Large = ratio >= WCAG_AA_LARGE;
  const passAAA_Normal = ratio >= WCAG_AAA_NORMAL;
  const passAAA_Large = ratio >= WCAG_AAA_LARGE;
  
  console.log(`\n${test.name}`);
  console.log(`  Color: ${test.fg} on ${test.bg}`);
  console.log(`  Usage: ${test.usage}`);
  console.log(`  Contrast Ratio: ${ratio.toFixed(2)}:1`);
  console.log(`  WCAG AA Normal Text: ${passAA_Normal ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`  WCAG AA Large Text:  ${passAA_Large ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`  WCAG AAA Normal Text: ${passAAA_Normal ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`  WCAG AAA Large Text:  ${passAAA_Large ? '✓ PASS' : '✗ FAIL'}`);
  
  if (!passAA_Normal) {
    allPass = false;
    console.log(`  ⚠️  WARNING: Does not meet WCAG AA for normal text!`);
  }
});

console.log('\n' + '='.repeat(70));
console.log('SUMMARY');
console.log('='.repeat(70));

if (allPass) {
  console.log('✓ All text colors meet WCAG AA standards for normal text (4.5:1)');
  console.log('✓ Dark mode typography is properly configured');
} else {
  console.log('✗ Some text colors do not meet WCAG AA standards');
  console.log('  Action required: Adjust colors to meet minimum contrast ratios');
}

console.log('\n' + '='.repeat(70));
