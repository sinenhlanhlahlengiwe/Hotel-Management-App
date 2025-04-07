import { Injectable } from '@angular/core';

export type RoomType = 'standard' | 'deluxe' | 'suite' | 'presidential';

@Injectable({
  providedIn: 'root'
})
export class RoomImagesService {
  private readonly fallbackImage = 'assets/images/photo-1512918728675.jpg';

  private readonly roomTypeImages: Record<RoomType, string[]> = {
    standard: [
      'assets/images/photo-1591088398332.jpg'
    ],
    deluxe: [
      'assets/images/photo-1566665797739.jpg'
    ],
    suite: [
      'assets/images/photo-1582719478250'
    ],
    presidential: [
      'assets/images/photo-1512918728675'
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