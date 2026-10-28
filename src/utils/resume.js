export const resumeUrl = '/Malith_Madushan_CV.pdf';
export function downloadResume() {
  const link = document.createElement('a');
  link.href = resumeUrl;
  link.download = 'Malith_Madushan_CV.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
