import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

config();

const commands = [];
const commandsPath = path.join(process.cwd(), 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = await import(`../commands/${file}`);
  if (command.data) {
    commands.push(command.data.toJSON());
  } else {
    console.warn(`⚠️ Lewati file ${file} karena tidak valid`);
  }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

try {
  console.log('🔁 Registering slash commands...');
  await rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: commands },
  );
  console.log('✅ Selesai daftar command!');
} catch (error) {
  console.error('❌ Error waktu register command:', error);
}
