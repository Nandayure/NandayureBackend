export default function createSubFolders(parentFolderId: string) {
  const basicFolders = [
    {
      name: 'Solicitudes de vacaciones',
      mimeType: 'application/vnd.google-apps.folder',
      description: 'Carpeta de documentos de solicitudes de vacaciones',
      parents: [parentFolderId],
    },
    {
      name: 'Solicitudes de constancias salariales',
      mimeType: 'application/vnd.google-apps.folder',
      description: 'Carpeta de documentos de constancias salariales',
      parents: [parentFolderId],
    },
    {
      name: 'Boletas de pago',
      mimeType: 'application/vnd.google-apps.folder',
      description: 'Carpeta de documentos de boletas de pago',
      parents: [parentFolderId],
    },
    {
      name: 'Otros',
      mimeType: 'application/vnd.google-apps.folder',
      description: 'Carpeta de otros documentos',
      parents: [parentFolderId],
    },
  ];

  return basicFolders;
}
