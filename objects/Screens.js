import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import videoSrcs from '../videos.json';

const screens = [];
const rowSize = 4;
const videoWidth = 1.778;
const videoHeight = 1;
const videoThickness = 0.05;

const xOffset = -6;
const zOffset = -4.2;
const yOffset = videoHeight + 0.1;

const spacing = 0.15