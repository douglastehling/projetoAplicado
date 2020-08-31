/* const express = require("express");
const app = express(); */
const fs = require("fs");
const axios = require("axios");

const api = axios.create({
  baseURL: "http://localhost:3004",
});

const getItens = async () => {
  const response = await api.get(`/products`);
  const data = response.data;

  const newObj = data.map((x) => ({
    id: x.idProduct,
    title: x.title,
    excerpt: x.excerpt,
    image: x.imageFull,
    quantity: x.quantity,
    totalValue: x.totalValue,
    unit: x.unit,
    prices: x.prices,
    quantityStock: x.quantityStock,
    category: x.category,
    department: x.department,
  }));

  fs.writeFileSync("newDb.json", JSON.stringify(newObj));
  console.log({ newObj, size: newObj.length });
};

getItens();
