import express from "express";
import livresRouter from "./routes/Livres.js";
import adherentsRouter from "./routes/Adherents.js";
 
const app = express();
app.use(express.json());
 

app.use("/livres", livresRouter);
app.use("/adherents", adherentsRouter);
 
app.listen(3000, () => console.log("Serveur sur http://localhost:3000"));