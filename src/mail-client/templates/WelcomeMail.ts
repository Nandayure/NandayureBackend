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
