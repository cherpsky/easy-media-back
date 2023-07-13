import { Injectable } from '@nestjs/common';
import { AppResources } from 'src/enums/resources.enum';

@Injectable()
export class AutoIncrementService {
  private readonly records: Map<AppResources, number> = new Map([
    [AppResources.POST, 0],
    [AppResources.USER, 0],
  ]);

  getNextId(resource: AppResources): number {
    return this.records.get(resource) + 1;
  }

  setLatestId(resource: AppResources, id: number): void {
    this.records.set(resource, id);
  }
}
