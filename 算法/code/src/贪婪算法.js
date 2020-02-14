// 所有的州
let states_needed = new Set(["mt", "wa", "or", "id", "nv", "ut", "ca", "az"])
// 广播电台
let stations = {}
stations["kone"] = new Set(["id", "nv", "ut"])
stations["ktwo"] = new Set(["wa", "id", "mt"])
stations["kthree"] = new Set(["or", "nv", "ca"])
stations["kfour"] = new Set(["nv", "ut"])
stations["kfive"] = new Set(["ca", "az"])


function findStations(states_needed, stations) {
  let over_stations = [];
  let covered;
  let stations_covered;
  let best_stations;
  while (states_needed.size !== 0) {
    stations_covered = [];
    for (let key in stations) {
      covered = [...states_needed].filter(states => stations[key].has(states));
      if (covered.length > stations_covered.length) {
        stations_covered = covered;
        best_stations = key;
      }
    }
    over_stations.push(best_stations);
    delete stations[best_stations];
    stations_covered.forEach(states => {
      states_needed.delete(states);
    })
  }
  return over_stations
}


console.log(findStations(states_needed, stations))