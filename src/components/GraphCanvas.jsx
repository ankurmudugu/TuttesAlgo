import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import { applyTutteLayout } from './TutteHelper';

const width = 800;
const height = 600;

export default function GraphCanvas() {
  const svgRef = useRef();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Draw edges
    svg
      .selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .attr('x1', (d) => nodes[d.from]?.x ?? 0)
      .attr('y1', (d) => nodes[d.from]?.y ?? 0)
      .attr('x2', (d) => nodes[d.to]?.x ?? 0)
      .attr('y2', (d) => nodes[d.to]?.y ?? 0)
      .attr('stroke', 'black');

    // Draw nodes
    svg
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('cx', (d) => d.x ?? 0)
      .attr('cy', (d) => d.y ?? 0)
      .attr('r', 8)
      .attr('fill', (d) => (d.id === selectedNode ? 'orange' : 'steelblue'))
      .attr('stroke', 'black')
      .on('click', (event, d) => {
        event.stopPropagation();
        if (selectedNode === null) {
          setSelectedNode(d.id);
        } else if (selectedNode === d.id) {
          setSelectedNode(null);
        } else {
          setEdges([...edges, { from: selectedNode, to: d.id }]);
          setSelectedNode(null);
        }
      });

  }, [nodes, edges, selectedNode]);

  const handleCanvasClick = (event) => {
    const [x, y] = d3.pointer(event);
    const newId = nodes.length;
    setNodes([...nodes, { id: newId, x, y }]);
  };

  const handleMakePlanar = () => {
    const updated = applyTutteLayout(nodes, edges, width, height);
    console.log("Updated layout:", updated);
    setNodes(updated);
  };

  return (
    <div>
      <button onClick={handleMakePlanar}>Make Planar</button>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ border: '1px solid black' }}
        onClick={handleCanvasClick}
      />
    </div>
  );
}