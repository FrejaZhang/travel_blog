import { MapPoint } from '../types/index';
import { diaries } from './diaries';

export const mapPoints: MapPoint[] = diaries.map((diary) => ({
  id: diary.id,
  diaryId: diary.id,
  title: diary.title,
  destination: diary.destination,
  country: diary.country,
  lat: diary.lat,
  lng: diary.lng,
  coverImage: diary.coverImage,
  slug: diary.slug,
}));
