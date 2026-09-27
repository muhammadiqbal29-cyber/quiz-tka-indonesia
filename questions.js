// Reading passages used by groups of questions
const PASSAGE = {
  hutanHujan: `<div class="passage"><strong>Bacalah teks berikut!</strong><br/>Hutan hujan tropis memiliki peran yang sangat penting bagi kehidupan di bumi. Hutan ini sering disebut sebagai paru-paru dunia karena menghasilkan sebagian besar oksigen yang kita hirup. Selain itu, hutan hujan tropis juga menjadi habitat bagi ribuan jenis hewan dan tumbuhan. Oleh karena itu, kelestarian hutan hujan tropis harus terus dijaga.</div>`,

  dito: `<div class="passage"><strong>Bacalah cerita berikut!</strong><br/>Dito dan teman-temannya sedang bermain bola di lapangan. Tiba-tiba, bola yang ditendang Dito mengenai pot bunga kesayangan Bu RT hingga pecah. Teman-teman Dito menyuruhnya lari bersembunyi. Namun, Dito memilih mendatangi rumah Bu RT untuk meminta maaf dan berjanji akan mengganti pot tersebut dengan uang tabungannya.</div>`,

  pencernaan: `<div class="passage"><strong>Bacalah teks berikut!</strong><br/>Pencernaan makanan pada manusia dimulai dari mulut. Di dalam mulut, makanan dikunyah oleh gigi agar menjadi lebih halus. Selain itu, air liur juga membantu melembutkan makanan sehingga mudah ditelan. Setelah dari mulut, makanan akan masuk ke kerongkongan sebelum akhirnya menuju lambung untuk dicerna lebih lanjut.</div>`,

  puisiPetani: `<div class="passage poem"><strong>Bacalah puisi berikut!</strong><br/><em>Hamparan sawah menghijau luas,<br/>Petani bekerja tanpa malas,<br/>Peluh menetes tiada berbekas,<br/>Demi panen padi yang bernas.</em></div>`,

  olahraga: `<div class="passage"><strong>Bacalah teks berikut!</strong><br/>Rutin berolahraga memberikan banyak manfaat bagi tubuh. Olahraga dapat memperkuat otot dan tulang sehingga kita tidak mudah cedera. Selain itu, berolahraga juga membantu menjaga berat badan ideal dan mencegah berbagai penyakit kronis. Dengan demikian, tubuh akan selalu terasa bugar dan bersemangat setiap hari.</div>`,

  bawangPutih: `<div class="passage"><strong>Bacalah cerita berikut!</strong><br/>Bawang Putih selalu disuruh mengerjakan seluruh pekerjaan rumah oleh ibu tirinya. Suatu hari, kain kesayangan ibu tirinya hanyut di sungai saat Bawang Putih sedang mencuci. Bawang Putih sangat ketakutan karena tahu ia akan dimarahi habis-habisan jika pulang tanpa membawa kain tersebut.</div>`,

  tariSaman: `<div class="passage"><strong>Bacalah teks berikut!</strong><br/>Tari Saman adalah salah satu tarian tradisional yang berasal dari Aceh. Tarian ini sangat unik karena tidak menggunakan alat musik, melainkan menggunakan suara tepukan tangan, tepukan dada, dan nyanyian dari para penarinya. Tari Saman biasanya ditampilkan dalam posisi duduk berjajar dan mengutamakan kekompakan gerakan.</div>`,

  budi: `<div class="passage"><strong>Bacalah cerita pendek berikut!</strong><br/>Budi menemukan seekor anak kucing yang kehujanan di depan rumahnya. Kucing itu tampak kedinginan dan kelaparan. Meskipun ibunya kurang menyukai hewan peliharaan, Budi memberanikan diri meminta izin untuk merawat kucing tersebut di garasi. Akhirnya, sang ibu luluh melihat kebaikan hati Budi.</div>`
};

const quizData = [
  {
    "question": PASSAGE.hutanHujan + "Ide pokok paragraf tersebut adalah...",
    "options": [
      "A. Hutan hujan tropis menghasilkan oksigen.",
      "B. Hutan hujan tropis adalah paru-paru dunia.",
      "C. Pentingnya peran hutan hujan tropis bagi kehidupan.",
      "D. Hutan hujan tropis sebagai habitat hewan dan tumbuhan."
    ],
    "answer": "C",
    "category": "Ide Pokok"
  },
  {
    "question": PASSAGE.hutanHujan + "Mengapa hutan hujan tropis disebut sebagai paru-paru dunia?",
    "options": [
      "A. Karena merupakan tempat tinggal ribuan hewan.",
      "B. Karena menghasilkan sebagian besar oksigen.",
      "C. Karena memiliki pepohonan yang sangat rindang.",
      "D. Karena harus terus dijaga kelestariannya."
    ],
    "answer": "B",
    "category": "Pemahaman Teks Informasi"
  },
  {
    "question": PASSAGE.hutanHujan + "Kata \"habitat\" pada teks tersebut memiliki makna...",
    "options": [
      "A. Tempat bersembunyi",
      "B. Tempat berkembang biak",
      "C. Tempat tinggal alami",
      "D. Tempat berlindung dari pemangsa"
    ],
    "answer": "C",
    "category": "Kosakata & Makna Kata"
  },
  {
    "question": PASSAGE.dito + "Sifat tokoh Dito dalam cerita tersebut adalah...",
    "options": [
      "A. Penakut",
      "B. Pemberani dan bertanggung jawab",
      "C. Pemarah dan egois",
      "D. Sombong dan keras kepala"
    ],
    "answer": "B",
    "category": "Karakter Tokoh"
  },
  {
    "question": PASSAGE.dito + "Amanat yang dapat diambil dari cerita Dito adalah...",
    "options": [
      "A. Jangan bermain bola di dekat rumah warga.",
      "B. Larilah saat melakukan kesalahan agar tidak dimarahi.",
      "C. Jangan membeli pot bunga yang mudah pecah.",
      "D. Berani mengakui kesalahan dan bertanggung jawab."
    ],
    "answer": "D",
    "category": "Amanat/Pesan Cerita"
  },
  {
    "question": PASSAGE.dito + "Latar tempat pada cerita Dito di atas adalah...",
    "options": [
      "A. Di dalam rumah Bu RT",
      "B. Di jalan raya",
      "C. Di lapangan",
      "D. Di sekolah"
    ],
    "answer": "C",
    "category": "Unsur Intrinsik (Latar)"
  },
  {
    "question": PASSAGE.pencernaan + "Informasi tersurat yang terdapat dalam teks tersebut adalah...",
    "options": [
      "A. Pencernaan makanan paling lama terjadi di lambung.",
      "B. Gigi berfungsi untuk melembutkan makanan.",
      "C. Air liur membantu melembutkan makanan agar mudah ditelan.",
      "D. Makanan langsung masuk ke lambung setelah dari mulut."
    ],
    "answer": "C",
    "category": "Informasi Tersurat"
  },
  {
    "question": PASSAGE.pencernaan + "Simpulan dari teks tentang pencernaan di atas adalah...",
    "options": [
      "A. Proses awal pencernaan makanan manusia terjadi di dalam mulut dengan bantuan gigi dan air liur.",
      "B. Kerongkongan adalah saluran terpenting dalam pencernaan manusia.",
      "C. Manusia membutuhkan makanan yang halus agar lambung tidak bekerja keras.",
      "D. Pencernaan manusia adalah proses yang sangat rumit dan panjang."
    ],
    "answer": "A",
    "category": "Menyimpulkan"
  },
  {
    "question": PASSAGE.puisiPetani + "Tema puisi di atas adalah...",
    "options": [
      "A. Kesedihan seorang petani",
      "B. Keindahan alam pedesaan",
      "C. Kerja keras petani di sawah",
      "D. Panen padi yang melimpah"
    ],
    "answer": "C",
    "category": "Tema Puisi"
  },
  {
    "question": PASSAGE.puisiPetani + "Makna kata \"bernas\" pada puisi tersebut adalah...",
    "options": [
      "A. Berwarna kuning",
      "B. Berisi penuh dan berkualitas",
      "C. Kering kerontang",
      "D. Layu dan mati"
    ],
    "answer": "B",
    "category": "Kosakata & Makna Kata"
  },
  {
    "question": PASSAGE.puisiPetani + "Perasaan yang tergambar dari sosok petani dalam puisi tersebut adalah...",
    "options": [
      "A. Kecewa dan marah",
      "B. Lelah dan putus asa",
      "C. Semangat dan pantang menyerah",
      "D. Sedih dan gelisah"
    ],
    "answer": "C",
    "category": "Apresiasi Puisi"
  },
  {
    "question": PASSAGE.olahraga + "Gagasan pendukung pada paragraf di atas adalah...",
    "options": [
      "A. Rutin berolahraga memberikan banyak manfaat bagi tubuh.",
      "B. Olahraga dapat memperkuat otot dan tulang.",
      "C. Tubuh selalu terasa bugar setiap hari.",
      "D. Olahraga adalah kegiatan yang melelahkan."
    ],
    "answer": "B",
    "category": "Gagasan Pendukung"
  },
  {
    "question": PASSAGE.olahraga + "Kalimat utama pada teks tentang olahraga tersebut berada di bagian...",
    "options": [
      "A. Awal paragraf",
      "B. Tengah paragraf",
      "C. Akhir paragraf",
      "D. Awal dan akhir paragraf"
    ],
    "answer": "A",
    "category": "Kalimat Utama"
  },
  {
    "question": PASSAGE.bawangPutih + "Konflik yang dialami Bawang Putih dalam cerita tersebut adalah...",
    "options": [
      "A. Bawang Putih bertengkar dengan Bawang Merah.",
      "B. Kain kesayangan ibu tiri hanyut dan Bawang Putih takut dimarahi.",
      "C. Bawang Putih tidak mau mencuci baju lagi.",
      "D. Bawang Putih jatuh ke dalam sungai yang deras."
    ],
    "answer": "B",
    "category": "Konflik Cerita"
  },
  {
    "question": PASSAGE.bawangPutih + "Karakteristik tokoh ibu tiri dalam cerita Bawang Putih umumnya adalah...",
    "options": [
      "A. Penyayang dan sabar",
      "B. Pemalas dan penakut",
      "C. Kejam dan sewenang-wenang",
      "D. Lemah lembut dan pemaaf"
    ],
    "answer": "C",
    "category": "Karakter Tokoh"
  },
  {
    "question": PASSAGE.tariSaman + "Teks di atas termasuk jenis teks...",
    "options": [
      "A. Persuasi",
      "B. Narasi fiksi",
      "C. Eksposisi (Informasi)",
      "D. Argumentasi"
    ],
    "answer": "C",
    "category": "Jenis Teks"
  },
  {
    "question": PASSAGE.tariSaman + "Informasi yang <strong>tidak</strong> terdapat dalam teks tentang Tari Saman adalah...",
    "options": [
      "A. Tari Saman berasal dari Aceh.",
      "B. Tari Saman tidak menggunakan alat musik.",
      "C. Penari Saman menggunakan pakaian adat yang harganya mahal.",
      "D. Tari Saman mengutamakan kekompakan gerakan."
    ],
    "answer": "C",
    "category": "Informasi Tersurat"
  },
  {
    "question": PASSAGE.budi + "Pesan moral dari cerita tersebut adalah...",
    "options": [
      "A. Kita harus memelihara semua hewan liar yang kita temui.",
      "B. Kasih sayang dan kepedulian terhadap makhluk hidup adalah perbuatan mulia.",
      "C. Kita harus memaksa orang tua agar menuruti keinginan kita.",
      "D. Anak kucing selalu membuat rumah menjadi kotor."
    ],
    "answer": "B",
    "category": "Amanat/Pesan Cerita"
  },
  {
    "question": PASSAGE.budi + "Tindakan ibu Budi pada akhir cerita menunjukkan sikap...",
    "options": [
      "A. Kasar dan tidak peduli",
      "B. Berpendirian keras",
      "C. Bijaksana dan berhati lembut",
      "D. Acuh tak acuh"
    ],
    "answer": "C",
    "category": "Karakter Tokoh"
  },
  {
    "question": PASSAGE.tariSaman + "Antonim dari kata \"tradisional\" pada teks tersebut adalah...",
    "options": [
      "A. Kuno",
      "B. Klasik",
      "C. Modern",
      "D. Lama"
    ],
    "answer": "C",
    "category": "Kosakata & Makna Kata"
  },
  {
    "question": `Susunlah kalimat-kalimat acak berikut menjadi sebuah paragraf yang padu!<br/>(1) Setelah itu, ia memotong kertas karton sesuai pola yang telah digambar.<br/>(2) Rina sedang membuat prakarya dari bahan bekas.<br/>(3) Terakhir, ia merekatkan semua bagian menggunakan lem hingga membentuk sebuah kotak pensil.<br/>(4) Pertama-tama, ia menyiapkan alat dan bahan yang dibutuhkan.<br/><br/>Urutan yang tepat adalah...`,
    "options": [
      "A. (2) - (4) - (1) - (3)",
      "B. (4) - (2) - (1) - (3)",
      "C. (2) - (1) - (4) - (3)",
      "D. (4) - (1) - (2) - (3)"
    ],
    "answer": "A",
    "category": "Menyusun Paragraf"
  },
  {
    "question": `Bacalah kalimat rumpang berikut!<br/><em>"Siswa kelas VI sedang melakukan <strong>...</strong> di laboratorium IPA tentang perkembangbiakan tumbuhan."</em><br/><br/>Kata yang tepat untuk melengkapi kalimat tersebut adalah...`,
    "options": [
      "A. Pemandangan",
      "B. Pengamatan",
      "C. Penglihatan",
      "D. Pertunjukan"
    ],
    "answer": "B",
    "category": "Kosakata & Makna Kata"
  },
  {
    "question": `<div class="passage"><strong>Bacalah penggalan pidato berikut!</strong><br/>Teman-teman yang saya sayangi, mari kita jaga kebersihan lingkungan sekolah kita. Jangan lagi membuang sampah sembarangan di laci meja atau di taman. Sekolah yang bersih akan membuat kita belajar dengan nyaman dan terhindar dari penyakit.</div>Isi dari penggalan pidato tersebut adalah...`,
    "options": [
      "A. Mengajak teman-teman untuk membersihkan kelas setiap hari Minggu.",
      "B. Himbauan agar tidak membuang sampah sembarangan dan menjaga kebersihan sekolah.",
      "C. Pemberitahuan tentang lomba kebersihan antarkelas.",
      "D. Larangan bermain di taman sekolah."
    ],
    "answer": "B",
    "category": "Pemahaman Teks Informasi"
  },
  {
    "question": `Perhatikan kalimat slogan berikut!<br/><strong>"Satu Pohon Ditanam, Ribuan Napas Terselamatkan"</strong><br/><br/>Makna dari slogan tersebut adalah...`,
    "options": [
      "A. Menanam pohon membutuhkan ribuan napas.",
      "B. Satu pohon hanya berguna untuk ribuan orang.",
      "C. Menanam pohon sangat penting karena memberikan oksigen bagi kehidupan.",
      "D. Menanam pohon adalah pekerjaan yang sangat melelahkan."
    ],
    "answer": "C",
    "category": "Makna Slogan"
  },
  {
    "question": `Perhatikan kata-kata berikut!<br/>(1) Apotik<br/>(2) Nasihat<br/>(3) Jadual<br/>(4) Izin<br/><br/>Kata <strong>baku</strong> ditunjukkan oleh nomor...`,
    "options": [
      "A. (1) dan (3)",
      "B. (2) dan (4)",
      "C. (1) dan (2)",
      "D. (3) dan (4)"
    ],
    "answer": "B",
    "category": "Kata Baku"
  },
  {
    "question": `Bacalah kalimat berikut!<br/><em>"Banyak anak-anak bermain di lapangan saat sore hari."</em><br/><br/>Perbaikan kalimat tersebut agar menjadi kalimat efektif adalah...`,
    "options": [
      "A. Banyak anak-anak yang bermain-main di lapangan saat sore hari.",
      "B. Anak-anak banyak bermain di lapangan saat sore hari.",
      "C. Banyak anak bermain di lapangan saat sore hari.",
      "D. Anak-anak saling bermain di lapangan saat sore hari."
    ],
    "answer": "C",
    "category": "Kalimat Efektif"
  },
  {
    "question": `<div class="passage"><strong>Bacalah cerita berikut!</strong><br/>Pada zaman dahulu, hiduplah seorang raja yang adil dan bijaksana. Suatu ketika, kerajaannya dilanda musim kemarau panjang. Rakyat mulai kekurangan air dan bahan makanan. Raja pun mengumpulkan seluruh menterinya untuk mencari jalan keluar dari musibah ini.</div>Bagian alur cerita di atas merupakan tahap...`,
    "options": [
      "A. Penyelesaian (Resolusi)",
      "B. Penurunan konflik (Klimaks)",
      "C. Pengenalan cerita dan kemunculan masalah",
      "D. Akhir cerita (Ending)"
    ],
    "answer": "C",
    "category": "Struktur Alur Cerita"
  },
  {
    "question": `<div class="passage"><strong>Bacalah laporan pengamatan berikut!</strong><br/><strong>Objek pengamatan:</strong> Kunjungan ke Kebun Binatang<br/><strong>Hasil pengamatan:</strong> Hewan-hewan di kebun binatang dirawat dengan cukup baik. Kandang mereka dibersihkan setiap pagi. Namun, masih ada beberapa pengunjung yang mengabaikan papan peringatan dengan memberi makan hewan sembarangan.</div>Kesimpulan dari laporan pengamatan tersebut adalah...`,
    "options": [
      "A. Kebun binatang tidak layak untuk dikunjungi karena kotor.",
      "B. Pihak pengelola sudah merawat hewan dengan baik, tetapi kesadaran pengunjung masih kurang.",
      "C. Pengunjung bebas memberikan makanan apa saja kepada hewan.",
      "D. Hewan-hewan di kebun binatang sangat buas dan berbahaya."
    ],
    "answer": "B",
    "category": "Menyimpulkan"
  },
  {
    "question": `<div class="passage"><strong>Bacalah dua teks berikut!</strong><br/><strong>Teks 1:</strong> Susu sapi mengandung kalsium tinggi yang sangat baik untuk pertumbuhan tulang dan gigi anak-anak. Oleh karena itu, anak-anak dianjurkan minum susu sapi secara rutin.<br/><strong>Teks 2:</strong> Kedelai merupakan bahan utama pembuatan susu kedelai. Minuman ini kaya akan protein nabati dan cocok dikonsumsi oleh mereka yang alergi terhadap susu sapi.</div>Persamaan dari kedua teks tersebut adalah...`,
    "options": [
      "A. Keduanya membahas jenis-jenis hewan ternak.",
      "B. Keduanya membahas tentang minuman yang bermanfaat bagi kesehatan.",
      "C. Keduanya membahas tentang penyakit alergi pada anak-anak.",
      "D. Keduanya membahas tentang bahan makanan dari tumbuhan."
    ],
    "answer": "B",
    "category": "Membandingkan Teks"
  },
  {
    "question": `<div class="passage"><strong>Bacalah teks berikut!</strong><br/>Sore itu, awan hitam pekat menyelimuti langit. Angin bertiup sangat kencang menerbangkan dedaunan kering. Suara guruh terdengar menggelegar dari kejauhan.</div>Berdasarkan teks tersebut, kejadian yang paling mungkin terjadi selanjutnya adalah...`,
    "options": [
      "A. Matahari akan bersinar terik.",
      "B. Pelangi akan segera muncul.",
      "C. Akan turun hujan deras.",
      "D. Bulan purnama akan bersinar terang."
    ],
    "answer": "C",
    "category": "Prediksi/Inferensi"
  }
];