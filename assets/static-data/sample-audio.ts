import { getAyahAudioKey } from "@/helper/key-helper";
import { Ayah } from "@/models/ayah";

const sampleAudio = [
	{ id: 1, url: "https://verses.quran.com/AbdulBaset/Mujawwad/mp3/001001.mp3" },
	{ id: 2, url: "https://verses.quran.com/AbdulBaset/Murattal/mp3/001001.mp3" },
	{ id: 3, url: "https://verses.quran.com/Sudais/mp3/001001.mp3" },
	{ id: 4, url: "https://verses.quran.com/Shatri/mp3/001001.mp3" },
	{ id: 5, url: "https://verses.quran.com/Rifai/mp3/001001.mp3" },
	{ id: 6, url: "https://mirrors.quranicaudio.com/everyayah/Husary_64kbps/001001.mp3" },
	{ id: 7, url: "https://verses.quran.com/Alafasy/mp3/001001.mp3" },
	{ id: 8, url: "https://verses.quran.com/Minshawi/Mujawwad/mp3/001001.mp3" },
	{ id: 9, url: "https://verses.quran.com/Minshawi/Murattal/mp3/001001.mp3" },
	{ id: 10, url: "https://verses.quran.com/Shuraym/mp3/001001.mp3" },
	{ id: 11, url: "https://mirrors.quranicaudio.com/everyayah/Mohammad_al_Tablaway_128kbps/001001.mp3" },
	{ id: 12, url: "https://mirrors.quranicaudio.com/everyayah/Husary_Muallim_128kbps/001001.mp3" }
];

export const getAyahAudio = (ayah: Ayah, resourceId: number) => {
  return sampleAudio.find(x => x.id === resourceId)?.url.replaceAll("001001", getAyahAudioKey(ayah)) ?? "";
};

export default sampleAudio;