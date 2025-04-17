export async function CancelationRequestMailToApprover(
  requesterId: string,
  requesterName: string,
  requestType: string,
  requesterEmail: string,
  cancelationReason: string,
  appLink: string, // 👈 agregado para el botón
) {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Solicitud Cancelada</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        width: 100%;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table {
        border-spacing: 0;
        border-collapse: collapse;
        width: 100%;
        margin: 0 auto;
      }
      img {
        border: 0;
        line-height: 100%;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
      .wrapper {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .header,
      .main,
      .footer {
        padding: 20px;
        text-align: center;
      }
      h1,
      h2,
      p {
        font-family: "Times New Roman", Times, serif;
        margin: 0 0 10px;
        color: #000000;
        line-height: 1.5;
      }
      h1 {
        font-size: 24px;
      }
      h2 {
        font-size: 20px;
        color: #e74c3c;
      }
      p {
        font-size: 16px;
        color: #555555;
      }
      .reason {
        background-color: #f9eaea;
        padding: 10px;
        border-left: 4px solid #e74c3c;
        margin-top: 15px;
        color: #c0392b;
        font-style: italic;
      }
      .btn {
        display: inline-block;
        padding: 12px 24px;
        margin-top: 25px;
        background-color: #3498db;
        color: #ffffff;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      }
      .bandera {
        margin-top: 5%;
        width: 100%;
        height: 30px;
        margin-bottom: 0;
      }
      .verde {
        background-color: #008000;
        height: 10%;
        width: 33.33%;
        float: left;
      }
      .amarillo {
        background-color: #ffff00;
        height: 10%;
        width: 33.33%;
        float: left;
      }
      .celeste {
        background-color: #00bfff;
        height: 10%;
        width: 33.33%;
        float: left;
      }
      .footer {
        margin-top: 40px;
        font-size: 12px;
        color: #aaaaaa;
      }
    </style>
  </head>
  <body>
    <table role="presentation" class="wrapper">
      <tr>
        <td>
          <div class="header">
            <h1>Municipalidad de Nandayure</h1>
            <img src="cid:logoImage" alt="Logo Municipalidad de Nandayure" style="max-width: 100px; height: auto;" />
            <h2>Notificación de Cancelación</h2>
          </div>
          <div class="main">
            <p>Estimado/a funcionario/a,</p>
            <p>Le informamos que la siguiente solicitud ha sido cancelada antes de ser procesada:</p>
            <p><strong>Tipo de solicitud:</strong> ${requestType}</p>
            <p><strong>Solicitante:</strong> ${requesterName} (${requesterId})</p>
            <p><strong>Correo del solicitante:</strong> ${requesterEmail}</p>
            <div class="reason">
              <strong>Motivo de cancelación:</strong><br />
              ${cancelationReason}
            </div>
            <p>Si tiene preguntas sobre esta cancelación, por favor comuníquese con el solicitante.</p>

            <a href="${appLink}" class="btn">Ir a la aplicación</a>

            <div class="bandera">
              <div class="verde"></div>
              <div class="amarillo"></div>
              <div class="celeste"></div>
            </div>

            <p style="margin-top: 20px; font-size: 12px; color: #888;">
              Este es un correo automático. Por favor, no respondas a este mensaje.
            </p>
          </div>
          <div class="footer">
            <p>© 2024 Municipalidad de Nandayure. Todos los derechos reservados.</p>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
