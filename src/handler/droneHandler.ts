import { Drone } from '../models/models';
import { db, save } from '../adapter/dbAccess';

function getAllDrones() {
    return db.getCollection('drones')?.data;
}

function registerDrone(serialNumber: string, model: string, weightLimit: number, batteryCapacity: number) {
    const item = new Drone(serialNumber, model, weightLimit, batteryCapacity, 'IDLE');
    const check = db.getCollection('drones').findOne({serialNumber: serialNumber});
    console.log('=>', check)
    if (check) {
        console.log('=> 1')
        return { error: true, message: 'ERROR: Drone is already in database'};
    } else if (['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight'].indexOf(model) === -1) {
        console.log('=> 2')
        return { error: true, message: 'ERROR: Drone model is wrong (use: Lightweight, Middleweight, Cruiserweight, Heavyweight'};
    } else if (batteryCapacity > 100) {
        console.log('=> 3')
        return { error: true, message: 'ERROR: Drone battery capacity is maximum 100%'};
    }
    console.log('=> 4')
    save('drones', item);
    return item;
}

function removeDrone(id: string) {
    try {
        console.log(parseInt(id));
    } catch (err) {
        return { error: true, message: 'ERROR: Drone Id is wrong'};
    }
    const item = db.getCollection('drones').findOne({id: parseInt(id)});
    if (!item) {
        return { error: true, message: 'ERROR: Drone dont exists in database'};
    }
    return db.getCollection('drones').remove(item);
}

function getDronesIdle() {
    return db.getCollection('drones').where((item) => { return (item.state === 'IDLE') });
}

function getDroneById(id: string) {
    try {
        console.log(parseInt(id));
    } catch (err) {
        return { error: true, message: 'ERROR: Drone Id is wrong'};
    }
    const item = db.getCollection('drones').findOne({id: parseInt(id)});
    if (!item) {
        return { error: true, message: 'ERROR: Drone dont exists in database'};
    }
    return item;
}

export {
getAllDrones,
registerDrone,
removeDrone,
getDronesIdle,
getDroneById
};
