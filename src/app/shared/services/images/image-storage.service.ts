import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { firstValueFrom } from 'rxjs';

interface ImageRecord {
  country: string;
  imagePath: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageStorageService {

  constructor(private dbService : NgxIndexedDBService) { }

  storeImage(country: string, imagePath: string): Promise<{ country: string; imagePath: string; } & {id: any}> {
    return firstValueFrom(this.dbService.add('images', { country, imagePath }));
  }

  getImagesByCountry(country: string): Promise<string[]> {
    return firstValueFrom(this.dbService.getAllByIndex('images', 'country', IDBKeyRange.only(country)))
    .then((records: any[]) => {
      const imageRecords = records as ImageRecord[];
      return imageRecords.map(record => record.imagePath);
    })
    .catch(err => {
      console.error('Error fetching images:', err);
      return [];
    });
  }
}
