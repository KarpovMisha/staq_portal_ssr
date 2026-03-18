export const certificatesStrings = {
  container: {
    title: 'Certificates',
    sandboxCertificates: 'Sandbox certificate',
    sandboxDescripition: 'This certificate is used for testing purposes only.',
  },
  modal: {
    title: 'Revoke certificate',
    description: (date: string) =>
      `Revoke your signed certificate generated on ${date}? Once you revoke a certificate, there is no going back. Please be certain before proceeding.`,
  },
  toasts: {
    revokingException:
      'Certificate cannot be revoked. Please try again later or contact support.',
    successRevoke: 'Certificate revoked successfully.',
  },
};
