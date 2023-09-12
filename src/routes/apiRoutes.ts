import express from 'express';
import { Request, Response } from 'express';
import * as droneHandler from '../handler/droneHandler';

const router = express.Router();

router.get('/drones', (req: Request, res: Response) => {
    const result = droneHandler.getAllDrones();
    res.json(result);
});

router.post('/drones', (req: Request, res: Response) => {
    const { serialNumber, model, weightLimit, batteryCapacity } = req.body;
    const newDrone = droneHandler.registerDrone(serialNumber, model, weightLimit, batteryCapacity);
    res.json(newDrone);
});

router.delete('/drones/:id', (req: Request, res: Response) => {
    const result = droneHandler.removeDrone(req.params.id);
    res.json(result);
});

router.get('/drones/idle', (req: Request, res: Response) => {
    const result = droneHandler.getDronesIdle();
    res.json(result);
});

router.get('/drones/:id', (req: Request, res: Response) => {
    const result = droneHandler.getDroneById(req.params.id);
    res.json(result || {});
});

export default router;
