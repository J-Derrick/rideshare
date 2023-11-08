"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = __importStar(require("ws"));
const wss = new WebSocket.Server({ port: 8080 });
// Create separate arrays to store driver and rider WebSocket connections.
const driverConnections = [];
const riderConnections = [];
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        // Convert the incoming message to a string.
        const messageStr = message.toString();
        if (messageStr.startsWith('driver:')) {
            driverConnections.push(ws);
            const messageBody = messageStr.substring('driver:'.length);
            riderConnections.forEach((rider) => {
                if (rider !== ws && rider.readyState === WebSocket.OPEN) {
                    rider.send(`Driver says: ${messageBody}`);
                }
            });
        }
        else if (messageStr.startsWith('rider:')) {
            riderConnections.push(ws);
            const messageBody = messageStr.substring('rider:'.length);
            driverConnections.forEach((driver) => {
                if (driver !== ws && driver.readyState === WebSocket.OPEN) {
                    driver.send(`Rider says: ${messageBody}`);
                }
            });
        }
    });
    ws.on('close', () => {
        console.log('Client disconnected');
        // Remove the WebSocket connection from the appropriate array.
        const driverIndex = driverConnections.indexOf(ws);
        if (driverIndex !== -1) {
            driverConnections.splice(driverIndex, 1);
        }
        else {
            const riderIndex = riderConnections.indexOf(ws);
            if (riderIndex !== -1) {
                riderConnections.splice(riderIndex, 1);
            }
        }
    });
});
