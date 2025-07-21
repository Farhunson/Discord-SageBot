// commands/namalist.js
import { SlashCommandBuilder } from 'discord.js';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data', 'usernames.json');

export const data = new SlashCommandBuilder()
  .setName('namalist')
  .setDescription('Lihat semua nama asli yang sudah disimpan');

export async function execute(interaction) {
  try {
    const raw = fs.readFileSync(filePath);
    const data = JSON.parse(raw);

    const entries = Object.entries(data);

    if (entries.length === 0) {
      return interaction.reply('📭 Belum ada nama yang disimpan.');
    }

    const list = entries
      .map(([id, name], i) => `${i + 1}. <@${id}> → **${name}**`)
      .join('\n');

    await interaction.reply({
      content: `📋 **Daftar Nama Asli**\n${list}`,
      allowedMentions: { users: [] }, // cegah ping spam
    });
  } catch (err) {
    console.error('Gagal baca file usernames:', err);
    await interaction.reply('❌ Bot gagal ambil data nama. Coba lagi nanti.');
  }
}
