const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

function verifierAccesAutorise(req, res, next) {
    const routeSecrete = 'votre_route_secrete'; 
    const token = req.query.token; 

    if (token === routeSecrete) {
        next();
    } else {
        res.status(403).send('Accès interdit');
    }
}

app.get('/admin', verifierAccesAutorise, (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'), err => {
        if (err) {
            console.error('Erreur lors de l\'envoi du fichier HTML :', err);
            res.status(500).send('Erreur serveur');
        }
    });
});
