export async function NewDepartmentHeadMail(
  headName: string,
  departmentName: string,
  pendingRequestsCount: number,
  appLink: string,
) {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Nuevo Jefe de Departamento</title>
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
      .wrapper {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .header, .main, .footer {
        padding: 20px;
        text-align: center;
      }
      h1 {
        font-size: 24px;
        color: #2c3e50;
      }
      p {
        font-size: 16px;
        color: #555555;
      }
      .count {
        background-color: #eafaf1;
        padding: 10px;
        border-left: 4px solid #2ecc71;
        margin: 20px 0;
        font-weight: bold;
        color: #27ae60;
      }
      .btn {
        display: inline-block;
        padding: 12px 24px;
        margin-top: 20px;
        background-color: #3498db;
        color: #ffffff;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      }
      img {
        border: 0;
        max-width: 100px;
        height: auto;
        margin-bottom: 10px;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #aaaaaa;
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
    </style>
  </head>
  <body>
    <table role="presentation" class="wrapper">
      <tr>
        <td>
          <div class="header">
            <h1>Municipalidad de Nandayure</h1>
        <img
              src="cid:logoImage"
              alt="Logo"
              style="max-width: 100px; height: auto"
            />
            <h2>¡Felicidades, ${headName}!</h2>
            <p>Has sido asignado/a como Jefe del Departamento de <strong>${departmentName}</strong>.</p>
          </div>
          <div class="main">
            ${
              pendingRequestsCount > 0
                ? `<p>Actualmente tienes <strong>${pendingRequestsCount}</strong> solicitudes activas heredadas del jefe anterior que requieren tu atención.</p>`
                : `<p>En este momento no hay solicitudes pendientes heredadas. ¡Buen comienzo!</p>`
            }

            <div class="count">
              Total de solicitudes activas: ${pendingRequestsCount}
            </div>

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
