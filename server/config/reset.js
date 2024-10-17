import { pool } from "./database.js";
import "./dotenv.js";
import { carsData } from "../data/cars.js";
import { exteriorsData } from "../data/exteriors.js";
import { interiorsData } from "../data/interiors.js";
import { roofsData } from "../data/roofs.js";
import { wheelsData } from "../data/wheels.js";

const createTables = async () => {
  const createTableQuery = `
                DROP TABLE IF EXISTS cars;
                DROP TABLE IF EXISTS exteriors;
                DROP TABLE IF EXISTS interiors;
                DROP TABLE IF EXISTS roofs;
                DROP TABLE IF EXISTS wheels;
                
                CREATE TABLE cars (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(255),
                        isconvertible BOOLEAN,
                        exterior INTEGER,
                        roof INTEGER,
                        wheels INTEGER,
                        interior INTEGER,
                        price INTEGER
                );
    
                CREATE TABLE exteriors (
                        id SERIAL PRIMARY KEY,
                        color VARCHAR(255),
                        image VARCHAR(255),
                        price INTEGER
                );
                
                CREATE TABLE interiors (
                        id SERIAL PRIMARY KEY,
                        color VARCHAR(255),
                        image VARCHAR(255),
                        price INTEGER,
                        iscombo BOOLEAN
                );

                CREATE TABLE roofs (
                        id SERIAL PRIMARY KEY,
                        color VARCHAR(255),
                        image VARCHAR(255),
                        price INTEGER,
                        isconvertible BOOLEAN
                );

                CREATE TABLE wheels (
                        id SERIAL PRIMARY KEY,
                        color VARCHAR(255),
                        image VARCHAR(255),
                        price INTEGER
                );
        `;

  try {
    await pool.query(createTableQuery);
    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables: ", error);
  }
};

const seedTables = async () => {
  await createTables();

  carsData.forEach((car) => {
    const insertCarQuery = {
      text: "INSERT INTO cars (name, isconvertible, exterior, roof, wheels, interior, price) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    };

    const values = [
      car.name,
      car.isconvertible,
      car.exterior,
      car.roof,
      car.wheels,
      car.interior,
      car.price,
    ];

    pool.query(insertCarQuery, values, (error, results) => {
      if (error) {
        throw error;
      }
      console.log(`✅ Car ${car.name} added successfully`);
    });
  });

  exteriorsData.forEach((exterior) => {
    const insertExteriorQuery = {
      text: "INSERT INTO exteriors (color, image, price) VALUES ($1, $2, $3)",
    };

    const values = [exterior.color, exterior.image, exterior.price];

    pool.query(insertExteriorQuery, values, (error, results) => {
      if (error) {
        throw error;
      }
      console.log(`✅ Exterior ${exterior.color} added successfully`);
    });
  });

  interiorsData.forEach((interior) => {
    const insertInteriorQuery = {
      text: "INSERT INTO interiors (color, image, price, iscombo) VALUES ($1, $2, $3, $4)",
    };

    const values = [
      interior.color,
      interior.image,
      interior.price,
      interior.iscombo,
    ];

    pool.query(insertInteriorQuery, values, (error, results) => {
      if (error) {
        throw error;
      }
      console.log(`✅ Interior ${interior.color} added successfully`);
    });
  });

  roofsData.forEach((roof) => {
    const insertRoofQuery = {
      text: "INSERT INTO roofs (color, image, price, isconvertible) VALUES ($1, $2, $3, $4)",
    };

    const values = [roof.color, roof.image, roof.price, roof.isconvertible];

    pool.query(insertRoofQuery, values, (error, results) => {
      if (error) {
        throw error;
      }
      console.log(`✅ Roof ${roof.color} added successfully`);
    });
  });

  wheelsData.forEach((wheel) => {
    const insertWheelQuery = {
      text: "INSERT INTO wheels (color, image, price) VALUES ($1, $2, $3)",
    };

    const values = [wheel.color, wheel.image, wheel.price];

    pool.query(insertWheelQuery, values, (error, results) => {
      if (error) {
        throw error;
      }
      console.log(`✅ Wheel ${wheel.color} added successfully`);
    });
  });
};

seedTables();
