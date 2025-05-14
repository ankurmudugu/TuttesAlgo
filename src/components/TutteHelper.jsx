export function applyTutteLayout(nodes, edges, width, height) {
  const n = nodes.length;
  if (n === 0) return nodes;

  const updatedNodes = nodes.map(n => ({ ...n }));

  const outer = [0, 1, 2]; 
  outer.forEach((id, i) => {
    const angle = (2 * Math.PI * i) / outer.length;
    updatedNodes[id].x = width / 2 + 200 * Math.cos(angle);
    updatedNodes[id].y = height / 2 + 200 * Math.sin(angle);
  });

  const adj = Array.from({ length: n }, () => []);
  edges.forEach(e => {
    adj[e.from].push(e.to);
    adj[e.to].push(e.from);
  });

  const isFixed = new Set(outer);

  for (let iter = 0; iter < 500; iter++) {
    for (let i = 0; i < n; i++) {
      if (isFixed.has(i)) continue;
      const neighbors = adj[i];
      if (neighbors.length === 0) continue;

      let sumX = 0, sumY = 0;
      neighbors.forEach(j => {
        sumX += updatedNodes[j].x;
        sumY += updatedNodes[j].y;
      });

      updatedNodes[i].x = sumX / neighbors.length;
      updatedNodes[i].y = sumY / neighbors.length;
    }
  }

  return updatedNodes;
}
