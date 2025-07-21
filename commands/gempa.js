import { SlashCommandBuilder } from 'discord.js';
import https from 'https';

export const data = new SlashCommandBuilder()
  .setName('gempa')
  .setDescription('🔍 Menampilkan info gempa terbaru dari BMKG');

export async function execute(interaction) {
  await interaction.deferReply();

  const url = 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json';

  https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', async () => {
      try {
        const json = JSON.parse(data);
        const gempa = json.Infogempa.gempa;

        const waktu = gempa.Jam;
        const tanggal = gempa.Tanggal;
        const magnitudo = gempa.Magnitude;
        const kedalaman = gempa.Kedalaman;
        const wilayah = gempa.Wilayah;
        const potensi = gempa.Potensi;
        const lokasi = gempa.Lintang + ', ' + gempa.Bujur;
        const dirasakan = gempa.Dirasakan || 'Tidak ada informasi dirasakan';
        const shakemap = `https://data.bmkg.go.id/DataMKG/TEWS/${gempa.Shakemap}`;

        await interaction.editReply({
          embeds: [
            {
              color: 0xff9900,
              title: '📡 Info Gempa Terkini BMKG',
              description: `**Tanggal:** ${tanggal}\n**Waktu:** ${waktu}\n**Magnitudo:** ${magnitudo}\n**Kedalaman:** ${kedalaman}\n**Wilayah:** ${wilayah}\n**Potensi:** ${potensi}\n**Lokasi:** ${lokasi}\n**Dirasakan:** ${dirasakan}`,
              image: { url: shakemap },
              footer: { text: 'Sumber: BMKG (data.bmkg.go.id)' }
            }
          ]
        });
      } catch (err) {
        console.error(err);
        await interaction.editReply('❌ Gagal mengambil data gempa dari BMKG.');
      }
    });
  }).on('error', async (err) => {
    console.error(err);
    await interaction.editReply('❌ Terjadi kesalahan saat menghubungi BMKG.');
  });
}
