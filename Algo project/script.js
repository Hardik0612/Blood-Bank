// Names of the Hospitals
const hospitals = {
    "Sector 62": 0,
    "Sector 52": 1,
    "Sector 148": 2,
    "Sector 18": 3,
    "Sector 15": 4,
    "Botanical Garden": 5,
    "Sector 16": 6,
    "Sector 104": 7,
    "Sector 128": 8
};

// Number of hospitals
const V = Object.keys(hospitals).length;

// Adjacency List Representation
const graph = [
    [[1, 1]], // Sector 62
    [[0, 1], [2, 1]], // Sector 52
    [[1, 1], [3, 1]], // Sector 148
    [[2, 1], [4, 1]], // Sector 18
    [[3, 1], [5, 1]], // Sector 15
    [[4, 1], [6, 1]], // Botanical Garden
    [[5, 1], [7, 1]], // Sector 16
    [[6, 1], [8, 1]], // Sector 104
    [[7, 1]] // Sector 128
];

function minDistance(dist, sptSet) {
    let min = Infinity;
    let min_index;

    for (let v = 0; v < V; v++) {
        if (sptSet[v] === false && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    }

    return min_index;
}

function printNearestHospital(dist, src) {
    let minDistance = Infinity;
    let nearestHospital;

    for (const hospitalName in hospitals) {
        const index = hospitals[hospitalName];
        if (dist[index] < minDistance && index !== src) {
            minDistance = dist[index];
            nearestHospital = hospitalName;
        }
    }

    if (minDistance === Infinity) {
        console.log(`The source hospital ${Object.keys(hospitals)[src]} is isolated.`);
    } else {
        console.log(`Nearest hospital to ${Object.keys(hospitals)[src]} is ${nearestHospital} with a distance of ${minDistance}`);
    }
}

function dijkstra(graph, src) {
    let dist = new Array(V).fill(Infinity);
    let sptSet = new Array(V).fill(false);

    const srcIndex = hospitals[src];
    dist[srcIndex] = 0;

    for (let count = 0; count < V - 1; count++) {
        let u = minDistance(dist, sptSet);
        sptSet[u] = true;
        for (const neighbor of graph[u]) {
            const [v, weight] = neighbor;
            if (!sptSet[v] && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
            }
        }
    }

    printNearestHospital(dist, srcIndex);
}

document.getElementById('patientForm').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("Form submitted!");

    const currentSector = document.getElementById('currentSector').value;
    console.log('Current Sector:', currentSector);
    
    dijkstra(graph, currentSector);
});
