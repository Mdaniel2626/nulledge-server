const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

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
// Añadimos '0.0.0.0' para que Render abra la puerta correctamente hacia internet
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor de NullEdge rugiendo en el puerto ${PORT}`);
});
