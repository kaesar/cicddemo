class Drone {
    serialNumber: string;
    model: string;
    weightLimit: number;
    batteryCapacity: number;
    state: string;
    payload: object;
  
    constructor(
      serialNumber: string,
      model: string,
      weightLimit: number,
      batteryCapacity: number,
      state: string
    ) {
      this.serialNumber = serialNumber;
      this.model = model;
      this.weightLimit = weightLimit;
      this.batteryCapacity = batteryCapacity;
      this.state = state;
      this.payload = {};
    }
}
  
export { Drone };
