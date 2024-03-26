export function dataURItoFile(dataURI: string, filename: string): File {
  const splitDataURI: string[] = dataURI.split(',');
  const mimeType: string = splitDataURI[0].split(':')[1].split(';')[0];
  const byteString: string = atob(splitDataURI[1]);

  const byteArray: Uint8Array = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
  }

  const blob: Blob = new Blob([byteArray], { type: mimeType });

  return new File([blob], filename, { type: mimeType });
}
