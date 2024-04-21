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


function minDistance(dist, sptSet) {
    // min value
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

//function to print the nearest hospital
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

// implementation Dijkstra's single source
//we are using adjency matrix

//adjeny list representation
function dijkstra(graph, src) {
    let dist = new Array(V).fill(Infinity); // The output array. dist[i] will hold the shortest distance from src to i
    let sptSet = new Array(V).fill(false); // sptSet[i] will be true if vertex i is included in shortest path tree or shortest distance from src to i is finalized

    // Convert source hospital name to index
    const srcIndex = hospitals[src];

    // Initialize distance from source to itself as 0
    dist[srcIndex] = 0;

    // Find shortest path for all vertices
    for (let count = 0; count < V - 1; count++) {
        // Pick the minimum distance vertex from the set of vertices not yet processed.
        let u = minDistance(dist, sptSet);
        console.log('Processing vertex:', u);

        // Mark the picked vertex as processed
        sptSet[u] = true;

        // Update dist value of the adjacent vertices of the picked vertex.
        for (const neighbor of graph[u]) {
            const [v, weight] = neighbor;
            if (!sptSet[v] && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
            }
        }
    }

    // Print the nearest hospital
    printNearestHospital(dist, srcIndex);
}

// Function to handle form submission
document.getElementById('patientForm').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("Form submitted!"); // Check if this line is logged
    
    // Get the value of the current sector from the form
    const currentSector = document.getElementById('currentSector').value;
    console.log('Current Sector:', currentSector);
    
    // Run Dijkstra algorithm with the provided current sector as the source hospital
    dijkstra(graph, currentSector);
});


