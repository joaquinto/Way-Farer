const busQueries = {
  findBusById: 'SELECT * FROM bus WHERE bus_id = $1',

  getBusCapacity: 'SELECT capacity FROM bus INNER JOIN trip On trip.bus_id = bus.bus_id WHERE trip.id = $1',
};

export default busQueries;
