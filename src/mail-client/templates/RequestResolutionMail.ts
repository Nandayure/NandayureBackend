export async function RequestResolutionMail(
  isApproved: boolean,
  requestType: string,
  appLink: string,
) {
  const message = isApproved
    ? `Tu solicitud de ${requestType} ha sido aprobada`
    : `Tu solicitud de ${requestType} ha sido rechazada`;
  const details = isApproved
    ? 'Estamos contentos de informarte que tu solicitud ha sido aprobada exitosamente. Para ver más detalles, visita nuestro sitio web.'
    : 'Lamentamos informarte que tu solicitud ha sido rechazada. Para ver más detalles, visita nuestro sitio web.';

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Notificación de Solicitud</title>
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
        max-width: 100px;
        height: auto;
        margin-bottom: 10px;
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
        line-height: 1.5;
      }
      h1 {
        font-size: 24px;
        color: #2c3e50;
      }
      h2 {
        font-size: 20px;
      }
      .approved {
        color: green;
        font-weight: bold;
      }
      .rejected {
        color: red;
        font-weight: bold;
      }
      p {
        font-size: 16px;
        color: #555555;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 24px;
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
        margin-top: 30px;
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
            <h2 class="${isApproved ? 'approved' : 'rejected'}">${message}</h2>
          </div>
          <div class="main">
            <p>Estimado usuario,</p>
            <p>${details}</p>
            <a href="${appLink}" class="btn">Ir a la aplicación</a>
            <div class="bandera">
              <div class="verde"></div>
              <div class="amarillo"></div>
              <div class="celeste"></div>
            </div>
            <p style="margin-top: 20px;">
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
