import express from "express";

const app = express();
app.use(express.json());

let livres = [
{ id: 1, titre: "Le Petit Prince", auteur: "Saint-Exupéry", disponible: true },
{ id: 2, titre: "Nedjma", auteur: "Kateb Yacine", disponible: true },
{ id: 3, titre: "L'Alchimiste", auteur: "Paulo Coelho", disponible: true }
];

let adherents = [
{ id: 1, nom: "Salma", email: "salma@exemple.ma" },
{ id: 2, nom: "Yassine", email: "yassine@exemple.ma" }
];

let emprunts = [];

// Get an id
let nextIdLivre = 4;
let nextIdAdherent = 3;
let nextIdEmprunt = 1;

// GET all livres
app.get("/livres", (req, res) => res.json(livres));

// GET one livre by id
app.get("/livres/:id", (req, res) => {
    const id = Number(req.params.id);
    const livre = livres.find(l => l.id === id);
    if (!livre) return res.status(404).json({ message: "Livre not found" });
    res.status(200).json(livre);
});

// POST a new livre
app.post("/livres", (req, res) => {
    const { titre, auteur } = req.body;
    if (!titre || !auteur) return res.status(400).json({ message: "Titre and auteur are required"})
    const newLivre = { id: nextIdLivre++, titre, auteur, disponible: true};
    livres.push(newLivre);
    res.status(201).json(newLivre, { message: "Livres created"})
});

// Patch a livre by id
app.patch("/livres/:id", (req, res) => {
    const id = Number(res.params.id);
    const livre = livres.find(l => l.id === id);
    if (!livre) return res.status(404).json({ message: "livre not fount"});
    if (titre != undefined) livre.titre = titre;
    if (auteur != undefined) livre.auteur = auteur;
    res.status(200).json(livre, { message: "livre updated"});
});

// DELETE a livre
app.delete("/livres/:id", (req, res) => {
    const id = Number(req.params.id);
    const livre = livres.find(l => l.id === id);
    if (!livre) return res.status(404).json({ message: "Livre not found" });
    livres = livres.filter(l => l.id !== id);
    res.status(200).json({ message: "Livre deleted" });
});

// -----2- Adherents -----
// GET all adherents
app.get("/adherents", (req, res) => {
    res.status(200).json(adherents);
});

// POST a new adherent
app.post("/adherents", (req, res) => {
    const { nom, email } = req.body;
    if (!nom || !email) return res.status(400).json({ message: "Nom and email are required" });
    const newAdherent = { id : nextIdAdherent++, nom, email };
    adherents.push(newAdherent),
    res.status(201).json(newAdherent, { message: "Adherent created"});
});

// -----3- Emprunts -----
// GET all EMPRUNTS
app.get("/emprunts", (req, res) => {
    res.status(200).json(emprunts);
});

app.listen(3000, () => console.log("Serveur sur http://localhost:3000"));

