import { Injectable } from '@angular/core';

export type RoomType = 'standard' | 'deluxe' | 'suite' | 'presidential';

@Injectable({
  providedIn: 'root'
})
export class RoomImagesService {
  private readonly fallbackImage = 'assets/images/photo-1512918728675.avif';

  private readonly roomTypeImages: Record<RoomType, string[]> = {
    standard: [
      'assets/images/photo-1591088398332.avif'
    ],
    deluxe: [
      'assets/images/photo-1566665797739.avif'
    ],
    suite: [
      'assets/images/photo-1582719478250.avif'
    ],
    presidential: [
      'assets/images/photo-1512918728675.avif'
    ]
  };

  getImagesByRoomType(type: RoomType): string[] {
    return this.roomTypeImages[type] || [this.fallbackImage];
  }

  getAllRoomTypes(): RoomType[] {
    return Object.keys(this.roomTypeImages) as RoomType[];
  }

  private isValidRoomType(type: string): type is RoomType {
    return Object.keys(this.roomTypeImages).includes(type);
  }
}