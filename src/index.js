const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const http = require('http');
const config = require('./config');

const port = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  const path = (req.url || '/').split('?')[0];
  if (req.method === 'GET' && (path === '/' || path === '/health')) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('ok');
    return;
  }
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('not found');
});

server.listen(port, () => {
  console.log(`Health check listening on port ${port}`);
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.guild) return;
  if (message.channel.id !== config.trapChannelId) return;

  if (message.author.id === message.guild.ownerId) {
    console.log(`Skipped guild owner ${message.author.id}`);
    return;
  }

  if (message.member?.permissions?.has(PermissionsBitField.Flags.Administrator)) {
    console.log(`Skipped administrator ${message.author.id}`);
    return;
  }

  const me = message.guild.members.me;
  if (me && !me.permissions.has(PermissionsBitField.Flags.BanMembers)) {
    console.error('Bot is missing the Ban Members permission');
    return;
  }

  console.log(`Trap triggered by user ${message.author.id} in channel ${message.channel.id}`);

  try {
    await message.guild.members.ban(message.author.id, {
      reason: '在誘餌頻道發訊息，疑似詐騙帳號',
    });
  } catch (err) {
    console.error(`Ban failed for user ${message.author.id}: ${err.message}`);
    return;
  }

  await message.delete().catch((err) => {
    console.error(`Failed to delete trap message ${message.id}: ${err.message}`);
  });

  if (!config.adminLogChannelId) return;

  const logChannel = await message.guild.channels
    .fetch(config.adminLogChannelId)
    .catch(() => null);
  if (!logChannel || !logChannel.isTextBased()) {
    console.error('Admin log channel is missing or not a text channel');
    return;
  }

  await logChannel
    .send(`已封鎖 ${message.author.tag}（${message.author.id}），原因：在誘餌頻道發言。`)
    .catch((err) => {
      console.error(`Admin log failed: ${err.message}`);
    });
});

client.on('error', (err) => {
  console.error(`Discord client error: ${err.message}`);
});

function shutdown() {
  server.close();
  client.destroy();
  process.exit(0);
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);

client.login(config.token).catch((err) => {
  console.error(`Login failed: ${err.message}`);
  process.exit(1);
});
