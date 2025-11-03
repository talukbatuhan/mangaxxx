// models/Manga.ts - TYPE-SAFE VERSİYON
import mongoose, { Document, Model } from 'mongoose';

export interface IEpisode {
  number: number;
  timeAgo: string;
  isNew: boolean;
  date?: Date;
}

export interface IManga extends Document {
  title: string;
  coverImage: string;
  countryFlag: string;
  episodes: IEpisode[];
  status: 'Devam Ediyor' | 'Completed' | 'Tamamlandı';
  rating?: string;
  genres?: string[];
  description?: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const EpisodeSchema = new mongoose.Schema<IEpisode>({
  number: { type: Number, required: true },
  timeAgo: { type: String, required: true },
  isNew: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

const MangaSchema = new mongoose.Schema<IManga>({
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
  views: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Modeli type-safe şekilde export et
const Manga: Model<IManga> = mongoose.models.Manga || mongoose.model<IManga>('Manga', MangaSchema);
export default Manga;