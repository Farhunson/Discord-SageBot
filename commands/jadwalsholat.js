// commands/jadwalsholat.js
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export const data = new SlashCommandBuilder()
  .setName('jadwalsholat')
  .setDescription('Lihat jadwal sholat hari ini untuk kota tertentu')
  .addStringOption(option =>
    option.setName('kota')
      .setDescription('Masukkan nama kota (misalnya: Palu, Jakarta)')
      .setRequired(true)
  );

export async function execute(interaction) {
  const kota = interaction.options.getString('kota');
  const encodedCity = encodeURIComponent(kota);
  const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodedCity}&country=Indonesia&method=11`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (json.code !== 200) {
      throw new Error(json.status || 'Gagal ambil data');
    }

    const data = json.data;
    const waktu = data.timings;
    const tanggal = data.date.readable;

    const embed = new EmbedBuilder()
      .setTitle(`🕌 Jadwal Sholat - ${kota}`)
      .setDescription(`Tanggal: **${tanggal}**`)
      .setColor(0x2ecc71)
      .addFields(
        { name: 'Subuh', value: waktu.Fajr, inline: true },
        { name: 'Dzuhur', value: waktu.Dhuhr, inline: true },
        { name: 'Ashar', value: waktu.Asr, inline: true },
        { name: 'Maghrib', value: waktu.Maghrib, inline: true },
        { name: 'Isya', value: waktu.Isha, inline: true },
        { name: 'Imsak', value: waktu.Imsak, inline: true },
      )
      .setFooter({ text: 'Sumber: Aladhan.com' });

    await interaction.reply({ embeds: [embed] });
  } catch (err) {
    console.error('Jadwal Sholat Error:', err);
    await interaction.reply('⚠️ Bot tidak bisa ambil jadwal sholat sekarang. Coba lagi nanti.');
  }
}
