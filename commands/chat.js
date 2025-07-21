// commands/chat.js
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('chat')
  .setDescription('Ngobrol bareng bot!')
  .addStringOption(option =>
    option.setName('pesan')
      .setDescription('Apa yang kamu mau bilang ke bot?')
      .setRequired(true)
  );

export async function execute(interaction) {
  const input = interaction.options.getString('pesan');

  // Simulasi balasan ala Palu
  let reply = '';
  if (input.toLowerCase().includes('halo')) {
    reply = 'Halo juga, apa kabar mo?';
  } else if (input.toLowerCase().includes('cuaca')) {
    reply = 'Iya e, cuaca panas skali ini hari e.';
  } else {
    reply = `Ko bilang: "${input}", mantap juga itu.`;
  }

  await interaction.reply(reply);
}
