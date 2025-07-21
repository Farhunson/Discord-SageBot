// commands/serverinfo.js
import { SlashCommandBuilder } from 'discord.js';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/usernames.json');

export const data = new SlashCommandBuilder()
  .setName('serverinfo')
  .setDescription('Lihat info server ini');

export async function execute(interaction) {
  const guild = interaction.guild;
  const owner = await guild.fetchOwner();

  const createdAtFormatted = new Date(guild.createdTimestamp).toLocaleString('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Baca nama asli user kalau ada
  let nameList = {};
  try {
    const raw = await readFile(filePath, 'utf8');
    nameList = JSON.parse(raw);
  } catch (err) {
    console.warn('⚠️ Gagal membaca usernames.json:', err);
  }

  let pemilikName = owner.user.tag;
  const realName = nameList[owner.user.id];
  if (realName) {
    pemilikName = `${realName} (#${owner.user.tag})`;
  }

  await interaction.reply({
    embeds: [
      {
        color: 0x5865F2,
        title: 'ℹ️ Informasi Server',
        thumbnail: {
          url: guild.iconURL({ dynamic: true }),
        },
        fields: [
          { name: '🏷️ Nama Server', value: guild.name, inline: false },
          { name: '👑 Pemilik', value: pemilikName, inline: false },
          { name: '📅 Dibuat Sejak', value: createdAtFormatted, inline: false },
          { name: '👥 Jumlah Anggota', value: `${guild.memberCount}`, inline: false },
          { name: '💬 Jumlah Channel', value: `${guild.channels.cache.size}`, inline: false },
          { name: '🌐 Wilayah Lokal', value: guild.preferredLocale, inline: false },
          {
            name: '📝 Catatan',
            value: `Ini server kayaknya te rame skali, dari ${guild.memberCount} orang total.\nPaling yang maso cuma 2-5 orang 😆`,
            inline: false
          }
        ],
        footer: {
          text: `Server ID: ${guild.id}`,
        },
        timestamp: new Date().toISOString(),
      }
    ]
  });
}
