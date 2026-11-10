import { Router } from "express";
 
const router = Router();
 
// "export" pour que routes/emprunts.js puisse utiliser ce tableau
export const livres = [
    { id: 1, titre: "Le Petit Prince", auteur: "Saint-Exupéry", disponible: true },
    { id: 2, titre: "Nedjma", auteur: "Kateb Yacine", disponible: true },
    { id: 3, titre: "L'Alchimiste", auteur: "Paulo Coelho", disponible: true }
];
let nextIdLivre = 4;
 
// GET all livres  ->  GET /livres
router.get("/", (req, res) => {
    res.status(200).json(livres);
});
 
// GET one livre  ->  GET /livres/:id
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const livre = livres.find(l => l.id === id);
    if (!livre) return res.status(404).json({ message: "Livre not found" });
    res.status(200).json(livre);
});
 
// POST a livre  ->  POST /livres
router.post("/", (req, res) => {
    const { titre, auteur } = req.body;
    if (!titre || !auteur) {
        return res.status(400).json({ message: "Titre and auteur are required" });
    }
    const newLivre = { id: nextIdLivre++, titre, auteur, disponible: true };
    livres.push(newLivre);
    res.status(201).json(newLivre);
});
 
// PATCH a livre  ->  PATCH /livres/:id
router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);
    const { titre, auteur } = req.body;
    const livre = livres.find(l => l.id === id);
    if (!livre) return res.status(404).json({ message: "Livre not found" });
    if (titre !== undefined) livre.titre = titre;
    if (auteur !== undefined) livre.auteur = auteur;
    res.status(200).json(livre);
});
 
// DELETE a livre  ->  DELETE /livres/:id
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = livres.findIndex(l => l.id === id);
    if (index === -1) return res.status(404).json({ message: "Livre not found" });
    livres.splice(index, 1); // on modifie le tableau sur place
    res.status(204).send();
});
 
export default router;
 