import React from 'react';
import Car from './Car';
import obstacles from './obstacles';
import { api, wait } from './utils';
import config from './config';
import CustomerIcon from './CustomerIcon';

const { gridSize, squareSize, fetchInterval } = config;

const coordsToObstacles = {};
obstacles.forEach(([xStart, xEnd, yStart, yEnd, color]) => {
  let x = xStart;
  while (x <= xEnd) {
    let y = yStart;
    while (y <= yEnd) {
      coordsToObstacles[`${x}:${y}`] = color || '#c1c3c7';
      y += 1;
    }
    x += 1;
  }
});

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.previousUpdateAt = Date.now();
    this.state = {
      cars: [],
      customers: [],
      refreshing: false,
    };
  }

  async loadData() {
    while (true) {
      try {
        const rides = await api.get('/rides');
        const ridesArray = Array.isArray(rides) ? rides : [];
        
        const timeout = 2000;
        const now = Date.now();
        if ((now - this.previousUpdateAt) > timeout) {
          this.previousUpdateAt = now;
          this.setState({ cars: [], refreshing: true });
          await wait(fetchInterval);
          continue;
        }

        this.previousUpdateAt = now;

        const cars = [];
        for (const ride of ridesArray) {
          try {
            const { car_id, location } = ride;
            let path = ride.path;
            if (typeof path === 'string') {
              path = JSON.parse(path);
            }
            const [x, y] = location.split(':');
            cars.push({
              id: car_id,
              path: path,
              actual: [parseInt(x), parseInt(y)],
            });
          } catch (parseError) {
            console.error('Error parsing ride:', parseError);
            continue;
          }
        }

        this.setState({ cars, refreshing: false });
      } catch (error) {
        console.error('Error loading rides:', error);
        this.setState({ refreshing: false });
      }
      
      await wait(fetchInterval);
    }
  }

  async loadCustomers() {
    while (true) {
      try {
        const customers = await api.get('/customers');
        // Ensure customers is an array
        const customersArray = Array.isArray(customers) ? customers : [];
        this.setState({ customers: customersArray });
      } catch (error) {
        console.error('Error loading customers:', error);
        this.setState({ customers: [] });
      }
      
      await wait(fetchInterval);
    }
  }

  componentDidMount() {
    this.loadData();
    this.loadCustomers();
  }

  render() {
    const obstacleElems = [];
    for (let [key, color] of Object.entries(coordsToObstacles)) {
      const [x, y] = key.split(':');
      obstacleElems.push(
        <rect
          key={`${x}:${y}`}
          width={squareSize}
          height={squareSize}
          x={x * squareSize}
          y={y * squareSize}
          fill={color}
          stroke={color}
        />
      );
    }

    // Safe mapping with fallback to empty array
    const cars = (Array.isArray(this.state.cars) ? this.state.cars : []).map(({ id, actual, path }) => {
      return <Car key={id} actual={actual} path={path} />;
    });

    const customers = (Array.isArray(this.state.customers) ? this.state.customers : []).map((customer) => {
      if (!customer || !customer.location) return null;
      const [x, y] = customer.location.split(':');
      return (
        <CustomerIcon
          key={customer.id || customer.name}
          x={parseInt(x) * squareSize - 10}
          y={parseInt(y) * squareSize - 10}
        />
      );
    }).filter(customer => customer !== null);

    return (
      <div className="map">
        <div className="map-inner">
          <div className={`map-refresh ${this.state.refreshing ? 'active' : ''}`} />
          <svg width={gridSize} height={gridSize} className="map">
            {obstacleElems}
            {cars}
            {customers}
          </svg>
        </div>
      </div>
    );
  }
}
