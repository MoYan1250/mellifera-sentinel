require('dotenv').config();

function required(name) {
  const value = process.env[name];
  if (typeof value !== 'string' || value.trim() === '') {
    console.error(`Missing required environment variable: ${name}`);
    process.exit(1);
  }
  return value.trim();
}

function optional(name) {
  const value = process.env[name];
  if (typeof value !== 'string') return '';
  return value.trim();
}

module.exports = {
  token: required('DISCORD_TOKEN'),
  trapChannelId: required('TRAP_CHANNEL_ID'),
  adminLogChannelId: optional('ADMIN_LOG_CHANNEL_ID'),
};
