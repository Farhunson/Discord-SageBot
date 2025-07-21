// commands/setnama.js
import { SlashCommandBuilder } from 'discord.js';
import { setRealName } from '../utils/userNames.js';

export const data = new SlashCommandBuilder()
  .setName('setnama')
  .setDescription('Set nama asli user')
  .addUserOption(option =>
    option.setName('user')
      .setDescription('Pilih user')
      .setRequired(true)
  )
  .addStringOption(option =>
    option.setName('nama')
      .setDescription('Nama asli user')
      .setRequired(true)
  );

export async function execute(interaction) {
  const targetUser = interaction.options.getUser('user');
  const nama = interaction.options.getString('nama');

  try {
    await setRealName(targetUser.id, nama);
    await interaction.reply(`✅ Nama untuk ${targetUser.username} disetel jadi **${nama}**.`);
  } catch (err) {
    console.error('Gagal set nama:', err);
    await interaction.reply('❌ Gagal menyimpan nama. Coba ulang jo.');
  }
}
