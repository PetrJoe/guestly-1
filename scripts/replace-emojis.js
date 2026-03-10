#!/usr/bin/env node

/**
 * Script to replace all emojis with Icon component usage
 * Run with: node scripts/replace-emojis.js
 */

const fs = require('fs');
const path = require('path');

// Emoji to icon name mapping
const emojiMap = {
  '🎟️': 'ticket',
  '💰': 'money',
  '📅': 'calendar',
  '🚀': 'rocket',
  '📊': 'chart',
  '📈': 'trending-up',
  '🎯': 'target',
  '✨': 'sparkles',
  '💡': 'lightbulb',
  '🔔': 'bell',
  '⏰': 'clock',
  '📢': 'megaphone',
  '🛡️': 'shield',
  '⚙️': 'settings',
  '📝': 'document',
  '📄': 'document',
  '📋': 'clipboard',
  '👥': 'users',
  '👤': 'user',
  '🏆': 'trophy',
  '🎨': 'palette',
  '🎵': 'music',
  '📸': 'camera',
  '🏠': 'home',
  '📦': 'package',
  '✍️': 'edit',
  '🌟': 'star',
  '⭐': 'star',
  '🔥': 'fire',
  '❤️': 'heart',
  '👍': 'thumbs-up',
  '👏': 'clap',
  '🎉': 'party',
  '✅': 'check',
  '🎭': 'palette',
  '🎪': 'palette',
  '🎬': 'camera',
  '🎤': 'music',
  '🎸': 'music',
  '🎹': 'music',
  '🎺': 'music',
  '🍽️': 'package',
  '🖼️': 'palette',
  '🧥': 'package',
  '📌': 'target',
  '📖': 'document',
  '🧑‍🍳': 'user',
};

console.log('Emoji replacement script');
console.log('========================\n');
console.log('This script will replace emojis with Icon component usage.');
console.log('Emoji to Icon mapping:', emojiMap);
console.log('\nNote: This is a dry-run. Actual replacements need to be done manually.');
console.log('Use the Icon component: <Icon name="icon-name" size={20} />\n');
