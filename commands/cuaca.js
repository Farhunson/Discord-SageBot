// commands/cuaca.js
import { SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const lokasiMap = {
  palu: { name: 'Palu', latitude: -0.8917, longitude: 119.8707 },
  luwuk: { name: 'Luwuk', latitude: -0.9515, longitude: 122.7875 },
  makassar: { name: 'Makassar', latitude: -5.1477, longitude: 119.4327 },
  jakarta: { name: 'Jakarta', latitude: -6.2088, longitude: 106.8456 },
  bandung: { name: 'Bandung', latitude: -6.9149, longitude: 107.6098 },
};

const kodeToDeskripsi = {
  0: 'Matahari so panas, jan main bola jam 12 siang eh!',
  1: 'Sedikit baawan, tapi panas tetap ada sadiki ee.',
  2: 'Mendung-mendung sayang, pas mood pi nongki di tuai.',
  3: 'Awan gelap, mo hujan leh ini.',
  45: 'Kabut tipis, hati-hati kalau mo bawa motor.',
  48: 'Kabut tebal, te jelas depan-depan.',
  51: 'Gerimis kecil, bawa jaket jo.',
  53: 'Hujan sedang, siap payung.',
  55: 'Hujan deras, jangan lupa bawa jas hujan ka.',
  61: 'Hujan ringan, langit mo bacurhat sadiki.',
  63: 'Hujan sedang-sedang saja.',
  65: 'Ujan lebat skali, jan keluar klo te penting.',
  71: 'Salju tipis? Eh te mungkin di sini ini! 🤔',
  95: 'Guntur ka itu... siap-siap den petir!',
};

const filePath = path.resolve('data', 'usernames.json');

export const data = new SlashCommandBuilder()
  .setName('cuaca')
  .setDescription('Cek cuaca di beberapa kota Indonesia')
  .addStringOption(option =>
    option
      .setName('kota')
      .setDescription('Pilih kota yang ingin dicek')
      .setRequired(true)
      .addChoices(
        { name: 'Palu', value: 'palu' },
        { name: 'Luwuk', value: 'luwuk' },
        { name: 'Makassar', value: 'makassar' },
        { name: 'Jakarta', value: 'jakarta' },
        { name: 'Bandung', value: 'bandung' }
      )
  );

export async function execute(interaction) {
  const kota = interaction.options.getString('kota');
  const lokasi = lokasiMap[kota];
  const userId = interaction.user.id;

  if (!lokasi) {
    return interaction.reply({
      content: '❌ Kota te dikenal, coba ulang jo.',
      ephemeral: true,
    });
  }

  let sapaan = '';
  try {
    const raw = fs.readFileSync(filePath);
    const nameData = JSON.parse(raw);
    if (nameData[userId]) {
      sapaan = `Halo, **${nameData[userId]}**! 👋`;
    } else {
      sapaan = `Halo, <@${userId}>! 👋`;
    }
  } catch (err) {
    console.warn('Gagal baca usernames.json:', err);
    sapaan = `Halo, <@${userId}>! 👋`;
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lokasi.latitude}&longitude=${lokasi.longitude}&current_weather=true&temperature_unit=celsius&windspeed_unit=kmh`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.current_weather) throw new Error('Data cuaca kosong.');

    const { temperature: suhu, windspeed: angin, weathercode: kodeCuaca } = data.current_weather;
    const kondisiText = kodeToDeskripsi[kodeCuaca] || 'Cuaca te jelas, tapi torang tetap semangat jo!';

    await interaction.reply({
      embeds: [
        {
          color: 0x00BFFF,
          title: `⛅ Cuaca di ${lokasi.name}`,
          description: sapaan,
          fields: [
            { name: '🌡️ Suhu', value: `\`${suhu}°C\``, inline: false },
            { name: '💨 Kecepatan Angin', value: `\`${angin} km/jam\``, inline: false },
            { name: '🌤️ Kondisi', value: kondisiText, inline: false },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: 'Sumber data: Open-Meteo',
          }
        }
      ]
    });
  } catch (err) {
    console.error('Cuaca error:', err);
    const errorMsg = '⚠️ Bot te bisa ambil data cuaca sekarang. Coba ulang ulang jo nanti.';
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMsg);
    } else {
      await interaction.reply(errorMsg);
    }
  }
}
