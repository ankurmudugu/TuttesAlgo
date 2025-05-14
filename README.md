
Tutte's Algorithm Graph Visualizer
This project implements Tutte's Algorithm for generating planar straight-line drawings of graphs. It allows users to create graphs interactively by adding nodes and edges on a grid, and then applies Tutte's algorithm to display a planar representation of the graph.

Project Structure
src/components/GraphCanvas.jsx: The main component for rendering the graph, handling node and edge creation.

src/components/TutteHelper.jsx: Implements the logic for applying Tutte's algorithm to the graph.

Features
Add nodes by clicking on the grid.

Draw edges between nodes, including cycles.

Apply Tutte's algorithm to transform the graph into a planar straight-line graph.

Prerequisites
Before you can run this project, ensure you have the following installed:

Node.js (LTS version recommended)

npm (comes with Node.js)

Getting Started
Clone the repository:


git clone https://github.com/ankurmudugu/TuttesAlgo.git
cd graph-visualizer
Install dependencies:


npm install
Run the development server:

npm run dev
Open the project in your browser at http://localhost:5173.

Usage
Create a Graph:

Click on the grid to add nodes.

Click on nodes to draw edges between them.

To add an edge between two existing nodes, select the first node, click on the second node, and the edge will be created.

Apply Tutte's Algorithm:

After adding the nodes and edges, click the "Make Planar" button to apply Tutte's algorithm and display the planar straight-line graph.
