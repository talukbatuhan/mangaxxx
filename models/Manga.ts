// models/Manga.ts - KONTROL EDİLMİŞ VERSİYON
import mongoose from 'mongoose';

const EpisodeSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  timeAgo: { type: String, required: true },
  isNew: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

const MangaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  coverImage: { type: String, required: true },
  countryFlag: { type: String, required: true },
  episodes: [EpisodeSchema],
  status: { 
    type: String, 
    enum: ['Devam Ediyor', 'Completed', 'Tamamlandı'],
    default: 'Devam Ediyor'
  },
  rating: { type: String },
  genres: [{ type: String }],
  description: { type: String },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// ÖNEMLİ: Modeli doğru export et
const Manga = mongoose.models.Manga || mongoose.model('Manga', MangaSchema);
export default Manga;