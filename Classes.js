class BusArrival{
    constructor(vehicleId,timeToStation,lineName,towards) {
        this.vehicleId = vehicleId;
        this.timeToStation = timeToStation;
        this.lineName = lineName;
        this.towards = towards;
    }
}

class BusCodes{
    constructor(commonName, id) {
        this.commonName = commonName;
        this.id = id;
    }
}

// export let busArrival = new BusArrival ()
exports.BusArrival = BusArrival;
exports.BusCodes = BusCodes;