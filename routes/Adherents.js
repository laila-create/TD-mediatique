import { Router } from "express";
 
const router = Router();
 
export const adherents = [
    { id: 1, nom: "Salma", email: "salma@exemple.ma" },
    { id: 2, nom: "Yassine", email: "yassine@exemple.ma" }
];
let nextIdAdherent = 3;
 
// GET all adherents  
router.get("/", (req, res) => {
    res.status(200).json(adherents);
});
 
// POST an adherent  
router.post("/", (req, res) => {
    const { nom, email } = req.body;
    if (!nom || !email) {
        return res.status(400).json({ message: "Nom and email are required" });
    }
    const newAdherent = { id: nextIdAdherent++, nom, email };
    adherents.push(newAdherent);
    res.status(201).json(newAdherent);
});
 
export default router;