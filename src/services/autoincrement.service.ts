import { Injectable } from '@nestjs/common';
import { AppResources } from 'src/enums/resources.enum';

@Injectable()
export class AutoIncrementService {
  private readonly records: Map<AppResources, number> = new Map([
    [AppResources.POST, 1],
    [AppResources.USER, 2],
  ]);

  getNextId(resource: AppResources): number {
    return this.records.get(resource) + 1;
  }

  setLatestId(resource: AppResources, id: number): void {
    this.records.set(resource, id);
  }
}
