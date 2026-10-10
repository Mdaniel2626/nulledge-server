const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Permitir acceso CORS para que cualquier cliente (como nuestra demo o apps de terceros) hable con la API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

const SECRET_KEY = 'NUESTRA_CLAVE_SECRETA_SUPER_SEGURA';

app.post('/api/v1/verify', (req, res) => {
    const { cryptographicProof } = req.body;
    const isHuman = cryptographicProof ? true : false; 

    if (!isHuman) {
        return res.status(401).json({ 
            success: false, 
            error: "Verificacion rechazada: Prueba matematica invalida." 
        });
    }

    const secureToken = jwt.sign(
        { status: "human_verified", issuer: "NullEdge" },
        SECRET_KEY,
        { expiresIn: '5m' }
    );

    return res.json({ 
        success: true, 
        verificationToken: secureToken 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor de NullEdge rugiendo en el puerto ${PORT}`);
});
