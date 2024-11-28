import cors from "cors";
import express from "express";

const app = express();
app.use(express.json());
app.use(cors());

const items = [
  { id: Math.random().toString(36).slice(2, 7), description: "Pão Francês", price: 5.84 },
  { id: Math.random().toString(36).slice(2, 7), description: "Picanha", price: 40.58 },
  { id: Math.random().toString(36).slice(2, 7), description: "Sabonete", price: 2.49 },
];

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  items.push(req.body);
  res.end();
});

app.delete("/items/:id", (req, res) => {
  const item = items.find((item: any) => item.id === req.params.id);
  if (item) {
    items.splice(items.indexOf(item), 1);
  }
  res.end();
});

app.put("/items/:id", (req, res) => {
  //tbd
});

app.listen(3000);
