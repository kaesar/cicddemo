import express from 'express';
import request from 'supertest';
import * as droneHandler from '../src/handler/droneHandler';
import apiRoutes from '../src/routes/apiRoutes';

jest.mock('../src/handler/droneHandler');

describe('API Routes Tests', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api', apiRoutes);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a list of drones', async () => {
    const mockDrones = [
      {
        serialNumber: '123',
        model: 'Middleweight',
        weightLimit: 200,
        batteryCapacity: 80,
        state: 'IDLE',
      },
      {
        serialNumber: '456',
        model: 'Heavyweight',
        weightLimit: 500,
        batteryCapacity: 60,
        state: 'LOADED',
      },
    ];
    (droneHandler.getAllDrones as jest.Mock).mockReturnValue(mockDrones);

    const response = await request(app).get('/api/drones');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDrones);
    expect(droneHandler.getAllDrones).toHaveBeenCalled();
  });

  it('should register a new drone', async () => {
    const mockNewDrone = {
      serialNumber: '123',
      model: 'Middleweight',
      weightLimit: 200,
      batteryCapacity: 80,
    };
    (droneHandler.registerDrone as jest.Mock).mockReturnValue(mockNewDrone);

    const response = await request(app)
      .post('/api/drones')
      .send(mockNewDrone);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockNewDrone);
    expect(droneHandler.registerDrone).toHaveBeenCalledWith(
      mockNewDrone.serialNumber,
      mockNewDrone.model,
      mockNewDrone.weightLimit,
      mockNewDrone.batteryCapacity
    );
  });

  it('removes a drone and returns result', async () => {
    const id = '123';
    const expectedResult = { message: 'Drone removed' };
    (droneHandler.removeDrone as jest.Mock).mockReturnValue(expectedResult);

    const response = await request(app).delete(`/api/drones/${id}`);

    expect(droneHandler.removeDrone).toHaveBeenCalledWith(id);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResult);
  });

  it('should get a list of idle drones', async () => {
    const mockIdleDrones = [
      {
        serialNumber: '123',
        model: 'Middleweight',
        weightLimit: 200,
        batteryCapacity: 80,
        state: 'IDLE',
      },
      {
        serialNumber: '456',
        model: 'Heavyweight',
        weightLimit: 500,
        batteryCapacity: 60,
        state: 'IDLE',
      },
    ];
    (droneHandler.getDronesIdle as jest.Mock).mockReturnValue(mockIdleDrones);

    const response = await request(app).get('/api/drones/idle');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockIdleDrones);
    expect(droneHandler.getDronesIdle).toHaveBeenCalled();
  });


  it('should return a drone by ID', async () => {
    const expectedDrone = {
      id: '123',
      model: 'Lightweight',
      weightLimit: 100,
      batteryCapacity: 90,
      state: 'IDLE',
    };
    jest.spyOn(droneHandler, 'getDroneById').mockReturnValue(expectedDrone);

    const response = await request(app).get('/api/drones/123');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedDrone);
  });

});
