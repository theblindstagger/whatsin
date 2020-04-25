import { TestBed } from '@angular/core/testing';
import { ListsStore } from './lists.store';

describe('ListsStore', () => {
  let service: ListsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
