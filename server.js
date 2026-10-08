{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww12720\viewh7800\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 JavaScript\
const express = require('express');\
const jwt = require('jsonwebtoken');\
\
const app = express();\
app.use(express.json());\
\
const SECRET_KEY = 'NUESTRA_CLAVE_SECRETA_SUPER_SEGURA';\
\
app.post('/api/v1/verify', (req, res) => \{\
    const \{ cryptographicProof \} = req.body;\
    const isHuman = cryptographicProof ? true : false; \
\
    if (!isHuman) \{\
        return res.status(401).json(\{ \
            success: false, \
            error: "Verificacion rechazada: Prueba matematica invalida." \
        \});\
    \}\
\
    const secureToken = jwt.sign(\
        \{ status: "human_verified", issuer: "NullEdge" \},\
        SECRET_KEY,\
        \{ expiresIn: '5m' \}\
    );\
\
    return res.json(\{ \
        success: true, \
        verificationToken: secureToken \
    \});\
\});\
\
const PORT = process.env.PORT || 3000;\
app.listen(PORT, () => \{\
    console.log(`Servidor de NullEdge rugiendo en el puerto $\{PORT\}`);\
\});}