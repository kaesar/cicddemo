import { Drone } from '../src/models/models';
import { db, save } from '../src/adapter/dbAccess';
import * as droneHandler from '../src/handler/droneHandler';

jest.mock('pino');
jest.mock('../src/adapter/dbAccess');

describe('Drone Handler Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
    db.close();
  });

  it('should get list of drones', () => {
    (db.getCollection as jest.Mock).mockReturnValue({
      data: [
        new Drone('123', 'Lightweight', 100, 90, 'IDLE'),
        new Drone('456', 'Middleweight', 200, 80, 'IDLE'),
      ],
    });

    const result = droneHandler.getAllDrones();
    db.close();

    expect(result).toHaveLength(2);
  });

  it('should register a new drone', () => {
    const mockDrone = new Drone('789', 'Heavyweight', 300, 70, 'IDLE');
    (db.save as jest.Mock).mockReturnValue(mockDrone);
    (db.getCollection as jest.Mock).mockReturnValue({
      findOne: jest.fn(() => false),
    });

    const result = droneHandler.registerDrone('789', 'Heavyweight', 300, 70);
    db.close();

    expect(result).toBeDefined();
  });

  it('should return an error when drone exists', () => {
    const mockDrone = new Drone('789', 'Heavyweight', 300, 70, 'IDLE');
    (db.save as jest.Mock).mockReturnValue(mockDrone);
    (db.getCollection as jest.Mock).mockReturnValue({
      findOne: jest.fn(() => mockDrone),
    });

    const result = droneHandler.registerDrone('789', 'Heavyweight', 300, 70);
    db.close();

    expect(result).toBeDefined();
  });

  it('should return an error for an incorrect drone model', () => {
    const invalidModel = 'InvalidModel';
    (db.getCollection as jest.Mock).mockReturnValue({
      findOne: jest.fn(() => false),
    });
    
    const result: any = droneHandler.registerDrone('123', invalidModel, 300, 70);
    db.close();
  
    // Verifica que el resultado sea un objeto de error
    expect(result?.error).toBeTruthy();
  });

  it('should return an error for exceeding battery capacity', () => {
    const exceedingBatteryCapacity = 110;
    (db.getCollection as jest.Mock).mockReturnValue({
      findOne: jest.fn(() => false),
    });
  
    const result: any = droneHandler.registerDrone('123', 'Heavyweight', 300, exceedingBatteryCapacity);
    db.close();

    // Verifica que el resultado sea un objeto de error
    expect(result.error).toBeTruthy();
  });

  it('removes a drone from the collection', () => {
    const id = '123';
    const findOneMock = jest.fn(() => ({ id: parseInt(id) }));
    (db.getCollection as jest.Mock).mockReturnValue({
      findOne: findOneMock,
      remove: jest.fn(),
    });

    const result = droneHandler.removeDrone(id);
    db.close();

    expect(result).toBeUndefined();
    expect(findOneMock).toHaveBeenCalledWith({ id: parseInt(id) });
  });

  it('should get list of idle drones', () => {
    const mockDrones = [
      new Drone('123', 'Middleweight', 200, 80, 'IDLE'),
      new Drone('456', 'Lightweight', 150, 90, 'LOADING'),
      new Drone('789', 'Heavyweight', 300, 70, 'IDLE'),
    ];
    (db.getCollection as jest.Mock).mockReturnValue({
      where: jest.fn(() => mockDrones.filter(drone => drone.state === 'IDLE')),
    });

    const result = droneHandler.getDronesIdle();
    db.close();

    expect(result).toHaveLength(2);
    expect(result[0].state).toBe('IDLE');
    expect(result[1].state).toBe('IDLE');
  });

});
