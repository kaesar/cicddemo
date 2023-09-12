import { db, save } from '../src/adapter/dbAccess';

describe('DB Access Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
    db.close();
  });

  it('should save data to the database', () => {
    const result = save('drones', { id: 1, name: 'Drone 1' });
    expect(result).toBeTruthy();
  });

  it('should retrieve data from the database', () => {
    const collection = db.getCollection('drones');
    collection.insert({ id: 2, name: 'Drone 2' });

    const retrievedData = collection.data;
    expect(retrievedData).toHaveLength(2);
  });

});
