exports.findShortestPath = (graph, startNode, endNode) => {
  const distances = {};
  const prev = {};
  const pq = new PriorityQueue();

  // Initialization
  distances[startNode] = 0;
  pq.enqueue(startNode, 0);
  for (let node in graph) {
    if (node !== startNode) {
      distances[node] = Infinity;
    }
    prev[node] = null;
  }

  while (!pq.isEmpty()) {
    const minNode = pq.dequeue().element;

    if (minNode === endNode) {
      const path = [];
      let temp = minNode;
      while (temp !== null) {
        path.unshift(temp);
        temp = prev[temp];
      }
      return { path, distance: distances[endNode] };
    }

    for (let neighbor in graph[minNode]) {
      const alt = distances[minNode] + graph[minNode][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        prev[neighbor] = minNode;
        pq.enqueue(neighbor, alt);
      }
    }
  }

  return { error: "Error calculating shortest path: No path found between the specified locations" };
};

class PriorityQueue {
  constructor() {
    this.collection = [];
  }

  enqueue(element, priority) {
    const node = { element, priority };
    if (this.isEmpty()) {
      this.collection.push(node);
    } else {
      const added = this.collection.some((el, index) => {
        if (node.priority < el.priority) {
          this.collection.splice(index, 0, node);
          return true;
        }
      });
      if (!added) {
        this.collection.push(node);
      }
    }
  }

  dequeue() {
    return this.collection.shift();
  }

  isEmpty() {
    return this.collection.length === 0;
  }
}
