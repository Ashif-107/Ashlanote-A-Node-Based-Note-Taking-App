'use client'

import React, { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    ReactFlowProvider,
    type Node,
    type Edge,
    type ColorMode,
    Position,
} from '@xyflow/react';
import Image from 'next/image';

import '@xyflow/react/dist/style.css';

import { CircleNode, DiamondNode } from '../Customs/CustomNodes';

const initialNodes = [
    {
        id: '1', position: { x: -300, y: 0 }, type: 'diamond',
        data: { label: 'Hold Left Mouse To Pan the View' },
        sourcePosition: Position.Right, // Right connector
        targetPosition: Position.Left,  // Left connector

    },
    {
        id: '2', position: { x: 85, y: 0 }, type: 'circle',
        data: { label: 'Right Click To Delete the Node' },
        sourcePosition: Position.Right, // Right connector
        targetPosition: Position.Left,  // Left connector
    },
    {
        id: '3', position: { x: 0, y: -100 },
        data: { label: 'Hold Left Mouse To Drag the Node' },
        sourcePosition: Position.Right, // Right connector
        targetPosition: Position.Left,  // Left connector
    },
    {
        id: '4', position: { x: 0, y: 100 }, type: 'circle',
        data: { label: 'Right is source connector and Left is Target' },
        sourcePosition: Position.Right, // Right connector
        targetPosition: Position.Left,  // Left connector
    },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', label: 'Click the Edge to Delete' },
    { id: 'e1-3', source: '1', target: '3', },
    { id: 'e1-4', source: '1', target: '4', },

];

const nodeTypes = {
    circle: CircleNode,
    diamond: DiamondNode,
};

export default function Home() {
    const [colorMode, setColorMode] = useState<ColorMode>('light');

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const [newNodeText, setNewNodeText] = useState("");
    const [newNodeShape, setNewNodeShape] = useState('rectangle');

    const [showField, setShowField] = useState(false);
    const [showShapeField, setShowShapeField] = useState(false);

    // Load nodes and edges from LocalStorage on initial render
    useEffect(() => {
        const savedNodes = localStorage.getItem('flow-nodes');
        const savedEdges = localStorage.getItem('flow-edges');

        if (savedNodes) setNodes(JSON.parse(savedNodes));
        if (savedEdges) setEdges(JSON.parse(savedEdges));
    }, []);

    // Save nodes and edges to LocalStorage whenever they change
    useEffect(() => {
        localStorage.setItem('flow-nodes', JSON.stringify(nodes));
        localStorage.setItem('flow-edges', JSON.stringify(edges));
    }, [nodes, edges]);



    const handleAddButtonClick = () => {
        setShowField(!showField);
    };

    const handleShapeButtonClick = () => {
        setShowShapeField(!showShapeField);
    };


    const onConnect = useCallback(
        (params: { source: string; target: string }) => {
            const newEdge = { id: `e${params.source}-${params.target}`, ...params };
            setEdges((eds) => addEdge(newEdge, eds));
        },
        [setEdges],
    );

    const onChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
        setColorMode(evt.target.value as ColorMode);
    };

    const deleteNode = useCallback(
        (nodeId: string) => {
            setNodes((nds) => nds.filter((node) => node.id !== nodeId)); // Remove the node by its ID
            setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)); // Remove edges connected to the node
        },
        [setNodes, setEdges]
    );

    const deleteEdge = useCallback(
        (edgeId: string) => {
            setEdges((eds) => eds.filter((edge) => edge.id !== edgeId)); // Remove the edge by its ID
        },
        [setEdges]
    );
    const onNodeContextMenu = (event: React.MouseEvent, node: Node) => {
        event.preventDefault(); // Prevent the default context menu
        deleteNode(node.id); // Delete the node
    };

    const onEdgeClick = (event: React.MouseEvent, edge: Edge) => {
        event.preventDefault(); // Prevent any other default behavior
        deleteEdge(edge.id); // Delete the edge
    };

    const addNode = () => {
        if (newNodeText.trim() === "") return;

        const newNode = {
            id: `${nodes.length + 1}`,
            data: { label: newNodeText },
            position: { x: Math.random() * 150, y: Math.random() * 150 },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            type: newNodeShape,
        };

        setNodes((nds) => [...nds, newNode]);
        setNewNodeText(""); // Clear the input field
        setNewNodeShape(newNodeShape);
    };


    const backgroundDotColor = colorMode === 'dark' ? '#B0BEC5' : '#DFE1E2';

    return (
        <ReactFlowProvider>

            <div style={{ width: '100vw', height: '100vh' }} className=''>
                <ReactFlow
                    colorMode={colorMode}
                    nodes={nodes.map((node) => ({
                        ...node,
                        data: { ...node.data, colorMode }, // Include colorMode in node data
                    }))}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeContextMenu={onNodeContextMenu}
                    onEdgeClick={onEdgeClick}
                    fitView
                    nodeTypes={nodeTypes}
                />
                <Controls />
                <MiniMap nodeColor="#888" nodeStrokeWidth={1} maskColor="rgba(0, 0, 0, 0.3)" />
                <Background
                    variant="dots"
                    gap={10}
                    size={2}
                    style={{
                        backgroundColor: '#EBEDEE', // Set background color to #EBEDEE
                    }}
                    color={backgroundDotColor}
                />
                <div className='absolute top-8 right-5'>
                    <select onChange={onChange} data-testid="colormode-select">
                        <option value="light">light</option>
                        <option value="dark">dark</option>
                        <option value="system">system</option>
                    </select>
                </div>
                <div className="absolute top-[150px] left-5 z-10 ">
                    <button onClick={handleAddButtonClick} className='text-3xl px-4 hover:rotate-90 transition duration-200'>+</button>
                    {showField && (
                        <div className='bg-[#A4A5A6] p-2 flex flex-col gap-2'>
                            <input
                                type="text"
                                placeholder="Enter node text"
                                value={newNodeText}
                                onChange={(e) => setNewNodeText(e.target.value)}
                                className='p-2 text-black border-2 border-black'
                            />

                            <button onClick={addNode} className='bg-blue-500 text-white p-2 border-2 border-black'>
                                Add Node
                            </button>

                        </div>
                    )}
                </div>
                <div className="absolute top-[210px] left-4 z-9">
                    <button onClick={handleShapeButtonClick} className='text-3xl px-4 hover:scale-110 transition duration-200 '>
                        <Image src="/cylinder.png" alt="shape" width={25} height={25} />
                    </button>
                    {
                        showShapeField && (
                            <select
                                value={newNodeShape}
                                onChange={(e) => setNewNodeShape(e.target.value)}
                                className="p-2 text-black border-2 border-black"
                            >
                                <option value="circle">Circle</option>
                                <option value="rectangle">Rectangle</option>
                                <option value="diamond">Diamond</option>
                            </select>

                        )
                    }
                </div>


            </div>
        </ReactFlowProvider>
    );
}