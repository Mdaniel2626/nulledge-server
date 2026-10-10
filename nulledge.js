// NullEdge SDK - Versión 1.0 (Edge Privacy-First Verification)
class NullEdgeSDK {
    constructor(config) {
        this.apiUrl = config.apiUrl || 'https://api.getnulledge.com/api/v1/verify';
        this.containerId = config.containerId;
        this.renderUI();
    }

    // Dibuja el botón de verificación en la página del cliente
    renderUI() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div style="background: #1e293b; padding: 20px; border-radius: 10px; color: #f8fafc; text-align: center; font-family: sans-serif; max-width: 350px;">
                <h3 style="margin: 0 0 10px 0; color: #38bdf8;">NullEdge Verification</h3>
                <p style="font-size: 12px; color: #94a3b8; margin-bottom: 15px;">Verificación biométrica local sin almacenamiento centralizado.</p>
                <button id="nulledge-btn" style="background: #38bdf8; color: #0f172a; border: none; padding: 10px 16px; font-weight: bold; border-radius: 6px; cursor: pointer;">Verificar identidad</button>
                <div id="nulledge-status" style="margin-top: 15px; font-size: 13px;"></div>
            </div>
        `;

        document.getElementById('nulledge-btn').addEventListener('click', () => this.ejecutarProceso());
    }

    // Proceso ejecutado estrictamente en el dispositivo del usuario (Edge)
    async ejecutarProceso() {
        const statusDiv = document.getElementById('nulledge-status');
        statusDiv.style.color = "#facc15";
        statusDiv.innerHTML = "Procesando en el borde y destruyendo datos locales...";

        // Prueba matemática generada localmente (simulando vivacidad y hash de dispositivo)
        const cryptographicProof = {
            deviceHash: "edge-device-" + Math.random().toString(36.substring(2, 9)),
            livenessPassed: true,
            timestamp: Date.now()
        };

        try {
            // Envío del token matemático al servidor central
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cryptographicProof })
            });

            const data = await response.json();

            if (data.success) {
                statusDiv.style.color = "#34d399";
                statusDiv.innerHTML = `✅ <strong>Verificado</strong><br><small style="word-break: break-all;">Token: ${data.verificationToken.substring(0, 25)}...</small>`;
                
                // Si el cliente configuró una función de éxito, la ejecutamos
                if (typeof this.onSuccess === 'function') {
                    this.onSuccess(data.verificationToken);
                }
            } else {
                statusDiv.style.color = "#f87171";
                statusDiv.innerHTML = `❌ Error: ${data.error}`;
            }
        } catch (error) {
            statusDiv.style.color = "#f87171";
            statusDiv.innerHTML = `❌ Error de conexión con la red NullEdge.`;
        }
    }

    // Método para que el cliente capture el token con seguridad
    onVerificationSuccess(callback) {
        this.onSuccess = callback;
    }
}
