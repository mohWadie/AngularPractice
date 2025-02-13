import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageServiceService {
  constructor() {}

  writeData(key: string, value: any) {
    const parsedObject = JSON.stringify(value);
    localStorage.setItem(key, parsedObject);
  }

  readData(key: string, asJson: boolean) {
    const data = localStorage.getItem(key);
    if (asJson && data) return JSON.parse(data);
    return data;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
