export async function WelcomeMail(
  EmployeeId: string,
  Password: string,
  loginURL: string,
) {
  return `<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Registro Exitoso</title>
  </head>
  <body>
    <!-- Tabla contenedora principal -->
    <table
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="padding: 20px"
    >
      <tr>
        <td align="center">
          <table
            width="100%"
            max-width="500"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            "
          >
            <tr>
              <td
                align="center"
                style="
                  padding: 20px;
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
                  color: #0e0e0e;
                "
              >
                <h1 style="margin-bottom: 10px; font-size: 24px">
                  Municipalidad de Nandayure
                </h1>
                <img
                  src="cid:logoImage"
                  alt="Logo"
                  style="
                    width: 80px;
                    height: 80px;
                    margin-bottom: 10px;
                    border-radius: 50%;
                  "
                />
                <h2 style="font-size: 20px; margin-bottom: 0">
                  Registro Exitoso
                </h2>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px">
                <p style="margin-bottom: 15px; color: #333; line-height: 1.5">
                  Su cuenta ha sido registrada correctamente.
                </p>
                <p style="margin-bottom: 15px; color: #333; line-height: 1.5">
                  Usuario: ${EmployeeId}.
                  <br />
                  Contraseña: ${Password}
                </p>
                <p style="margin-bottom: 15px; color: #333; line-height: 1.5">
                  Puedes verificarlo presionando en el siguiente botón.
                </p>
                <a
                  href="${loginURL}"
                  style="
                    display: inline-block;
                    background-color: #1fae32;
                    color: #ffffff;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 16px;
                  "
                  >Ir a Iniciar Sesión</a
                >
              </td>
            </tr>
            <tr>
              <td
                align="center"
                style="
                  padding: 10px;
                  border-bottom-left-radius: 10px;
                  border-bottom-right-radius: 10px;
                  color: #959393;
                "
              >
                <p style="font-size: 14px">
                  © 2024 Municipalidad de Nandayure. Todos los derechos
                  reservados.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

export async function RecoverPasswordMail(ResetPasswordURL: string) {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Forgot Password</title>
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
        color: #2c3e50;
      }
      p {
        font-size: 16px;
        color: #555555;
      }
      a {
        display: block;
        width: 220px;
        margin: 20px auto;
        padding: 15px;
        text-align: center;
        background-color: #3498db;
        color: #ffffff;
        text-decoration: none;
        font-size: 18px;
        border-radius: 5px;
        transition: background-color 0.3s;
      }
      a:hover {
        background-color: #2980b9;
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
            <img
              src="cid:logoImage"
              alt="Logo"
              style="max-width: 100px; height: auto"
            />
            <h2>Recuperación de Contraseña</h2>
          </div>
          <div class="main">
            <p>Estimado usuario,</p>
            <p>
              Hemos recibido una solicitud para cambiar la contraseña de su
              cuenta en la Municipalidad. Si no realizó esta solicitud, puede
              ignorar este mensaje. De lo contrario, haga clic en el enlace a
              continuación para recuperar su contraseña:
            </p>
            <a href="${ResetPasswordURL}">Recuperar Contraseña</a>
            <p>
              Este enlace es válido por 10 minutos y un solo uso. Si necesita asistencia
              adicional, no dude en contactarnos.
            </p>
          </div>
          <div class="footer">
            <p>
              © 2024 Municipalidad de Nandayure. Todos los derechos reservados.
            </p>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>


`;
}

export async function ConfirmationRequestMail(requestType: string) {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Correo Confirmación</title>
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
        color: #2c3e50;
      }
      p {
        font-size: 16px;
        color: #555555;
      }
      .bandera {
        margin-top: 20px;
        width: 100%;
        height: 30px;
      }
      .bandera .verde {
        background-color: #008000;
        height: 10px;
        width: 33.33%;
        float: left;
      }
      .bandera .amarillo {
        background-color: #ffff00;
        height: 10px;
        width: 33.33%;
        float: left;
      }
      .bandera .celeste {
        background-color: #00bfff;
        height: 10px;
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
            <img
              src="cid:logoImage"
              alt="Logo"
              style="max-width: 100px; height: auto"
            />
            <h2>Solicitud de ${requestType} Enviada Exitosamente</h2>
          </div>
          <div class="main">
            <p>Estimado usuario,</p>
            <p>
              Hemos enviado tu solicitud correctamente. Queda a la espera de las
              revisiones por los responsables respectivos. Esperamos pronto
              darte una respuesta.
            </p>
            <div class="bandera">
              <div class="verde"></div>
              <div class="amarillo"></div>
              <div class="celeste"></div>
            </div>
            <p>
              Este es un correo automático. Por favor, no respondas a este
              mensaje.
            </p>
          </div>
          <div class="footer">
            <p>
              © 2024 Municipalidad de Nandayure. Todos los derechos reservados.
            </p>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function ApproverNotificationMail(
  requesterId: string,
  requesterName: string,
  requestType: string,
) {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Correo de Notificación</title>
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
        color: #2c3e50;
      }
      p {
        font-size: 16px;
        color: #555555;
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
            <h2>Tienes una Nueva Solicitud de ${requestType} que Aprobar</h2>
          </div>
          <div class="main">
            <p>Estimado usuario,</p>
            <p>
              Has recibido una nueva solicitud de ${requestType} a nombre de <b>${requesterName}</b> con numero de cédula <b>${requesterId}</b>. Queda a la espera de la revisión
              para dar una pronta respuesta al colaborador. Esperamos que pronto
              puedas revisarla.
            </p>
            <div class="bandera">
              <div class="verde"></div>
              <div class="amarillo"></div>
              <div class="celeste"></div>
            </div>
            <p>
              Este es un correo automático. Por favor, no respondas a este
              mensaje.
            </p>
          </div>
          <div class="footer">
            <p>
              © 2024 Municipalidad de Nandayure. Todos los derechos reservados.
            </p>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function RequestResolutionnMail(
  isApproved: boolean,
  requestType: string,
) {
  const message = isApproved
    ? `Tu solicitud de ${requestType} ha sido aprobada`
    : `Tu solicitud de ${requestType} ha sido rechazada`;
  const details = isApproved
    ? 'Estamos contentos de informarte que tu solicitud ha sido aprobada exitosamente. Para ver mas detalles de la aprobacion visita nuestro sitio web.'
    : 'Lamentamos informarte que tu solicitud ha sido rechazada. Para ver mas detalles de la aprobacion visita nuestro sitio web.';

  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
        color: #2c3e50;
      }
      p {
        font-size: 16px;
        color: #555555;
      }
      .approved {
        color: green;
        font-weight: bold;
      }
      .rejected {
        color: red;
        font-weight: bold;
      }
      a {
        display: block;
        width: 220px;
        margin: 20px auto;
        padding: 15px;
        text-align: center;
        background-color: #3498db;
        color: #ffffff;
        text-decoration: none;
        font-size: 18px;
        border-radius: 5px;
        transition: background-color 0.3s;
      }
      a:hover {
        background-color: #2980b9;
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
          <img
            src="cid:logoImage"
            alt="Logo"
            style="max-width: 100px; height: auto"
          />
          <h2 class="${isApproved ? 'approved' : 'rejected'}">${message}</h2>
        </div>
        <div class="main">
          <p>Estimado usuario,</p>
          <p>${details}</p>
          <div class="bandera">
            <div class="verde"></div>
            <div class="amarillo"></div>
            <div class="celeste"></div>
          </div>
          <p>Este es un correo automático. Por favor, no respondas a este mensaje.</p>
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
