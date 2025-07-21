// commands/cekjodoh.js
import { SlashCommandBuilder } from 'discord.js';

function getRandomMatch() {
  return Math.floor(Math.random() * 101); // 0 - 100%
}

function getKomentar(percent) {
  if (percent > 90) return '🔥 Jodoh dari surga! Pi kawin jo!';
  if (percent > 75) return 'Wah cocok ka ini! Tinggal pi lamaran jo!';
  if (percent > 50) return 'Lumayan cocok, tapi perlu usaha sedikit e.';
  if (percent > 30) return 'Hmm... kayaknya butuh waktu & pengertian.';
  if (percent > 10) return 'Kayaknya cuma cocok jadi teman nongkrong ka.';
  return '❌ Jan dipaksakan... te cocok sama skali 😭';
}

export const data = new SlashCommandBuilder()
  .setName('cekjodoh')
  .setDescription('Lihat kecocokan dua nama secara ilmiah (tapi ngarang) 🤪')
  .addStringOption(option =>
    option.setName('nama1')
      .setDescription('Nama pertama')
      .setRequired(true)
  )
  .addStringOption(option =>
    option.setName('nama2')
      .setDescription('Nama kedua')
      .setRequired(true)
  );

export async function execute(interaction) {
  const nama1 = interaction.options.getString('nama1');
  const nama2 = interaction.options.getString('nama2');
  const percent = getRandomMatch();
  const komentar = getKomentar(percent);

  await interaction.reply(
    `💘 **Cek Jodoh antara ${nama1} ❤️ ${nama2}** 💘\n\n` +
    `🔥 Kecocokan: ${percent}%\n` +
    `Komentar: ${komentar}`
  );
}
