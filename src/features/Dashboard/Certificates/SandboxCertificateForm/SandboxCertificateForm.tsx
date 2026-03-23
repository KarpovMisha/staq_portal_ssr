'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import cn from 'classnames';

import Loader from '@/ui/icons/loader.svg';
import ArrowIcon from '@/ui/icons/arrowRight.svg';
import CopyIcon from '@/ui/icons/btn-copy.svg';
import UploadIcon from '@/ui/icons/upload.svg';
import TrashIcon from '@/ui/icons/trash.svg';
import FileIcon from '@/ui/icons/select-file.svg';
import { Button, FileInput } from '@/ui/elements';
import { showError, showSuccess } from '@/ui/components/Toasts/Toast';
import { useAppDispatch } from '@/store/hooks';
import { uploadCertificate } from '@/services/certificates';
import { useRevokeCertificateMutation } from '@/hooks/useCertificatesQuery';
import { useDownloadCertificate } from '@/hooks/useDownloadCertificate';
import styles from './SandboxCertificateForm.module.scss';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export default function SandboxCertificateForm() {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [certificateId, setCertificateId] = useState<string | null>(null);
  const { mutateAsync: revokeCertificate } = useRevokeCertificateMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { mutate: downloadCertificate } = useDownloadCertificate();

  async function uploadCSRFile(file: File[]) {
    if (!file) return;

    try {
      const result = await uploadCertificate({
        attachments: { file: file[0] },
      });
      setFileName(file[0]?.name || null);
      setCertificateId(result?.id ? String(result.id) : null);
      setStatus('success');
      showSuccess('CSR loaded successfully.');
    } catch (e) {
      showError('Something went wrong with the upload, please try again');
    }
  }

  async function revokeFile() {
    if (!certificateId) {
      showError('Certificate ID is missing. Please upload a CSR file again.');
      return;
    }

    try {
      await revokeCertificate(certificateId);
      showSuccess('Certificate revoked successfully.');
    } catch (error) {
      showError('Certificate cannot be revoked. Unknown error');
    } finally {
      setStatus('idle');
      setFileName(null);
      setCertificateId(null);
    }
  }

  function downloadFile() {
    downloadCertificate({ id: String(certificateId) });
  }

  return (
    <div className={styles.create_certificate}>
      <div
        className={styles.create_certificate__back}
        onClick={() => router.push('/dashboard/certificates')}
      >
        <ArrowIcon />
        <span>Back</span>
      </div>
      <div className={styles.create_certificate__header}>
        Set up your Sandbox access certificate
      </div>
      <div className={styles.create_certificate__description}>
        Follow these 5 steps to create and install a test certificate. Keep your
        private key secure, only the CSR and certificate are shared with us.
      </div>
      <div className={styles.create_certificate__steps}>
        <div className={styles.create_certificate__step}>
          <div className={styles.create_certificate__rail}>
            <span
              className={styles.create_certificate__bullet}
              aria-hidden="true"
            ></span>
          </div>
          <div className={styles.create_certificate__content}>
            <div className={styles.create_certificate__title}>
              Generate a private key
            </div>
            <div>
              <div className={styles.create_certificate__description}>
                Create a new RSA private key. This file stays on your system
                keep it safe and never share it with anyone.
              </div>
              <div className={styles.create_certificate__input}>
                <div>$ openssl genrsa -out server.key 2048</div>
                <span className={styles.create_certificate__search_icon}>
                  <CopyIcon />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.create_certificate__step}>
          <div className={styles.create_certificate__rail}>
            <span
              className={styles.create_certificate__bullet}
              aria-hidden="true"
            ></span>
          </div>

          <div className={styles.create_certificate__content}>
            <div className={styles.create_certificate__title}>
              Generate a Certificate Signing Request (CSR)
            </div>
            <div>
              <div className={styles.create_certificate__description}>
                Use your private key to generate a CSR. This file contains your
                public key and organisation details, which we’ll use to issue
                your Sandbox certificate.
              </div>
              <div className={styles.create_certificate__input}>
                <div>$ openssl genrsa -out server.key 2048</div>
                <span className={styles.create_certificate__search_icon}>
                  <CopyIcon />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.create_certificate__step}>
          <div className={styles.create_certificate__rail}>
            <span
              className={styles.create_certificate__bullet}
              aria-hidden="true"
            ></span>
          </div>

          <div className={styles.create_certificate__content}>
            <div className={styles.create_certificate__title}>
              Upload your CSR
            </div>
            <div className={styles.create_certificate__description}>
              Upload the sandbox.csr file here. We’ll sign it and generate your
              Sandbox certificate.
            </div>
            <FileInput
              accept={{ 'application/pkcs10': ['.csr'] }}
              noDrag={false}
              onDrop={(file) => uploadCSRFile(file)}
            >
              {status === 'idle' && (
                <div className={styles.create_certificate__upload}>
                  <UploadIcon />
                  <p>Drag and drop your .csr file here to upload</p>
                  <div>Upload file</div>
                </div>
              )}
              {status === 'uploading' && (
                <div className={styles.create_certificate__uploading}>
                  <Loader />
                  <p>Uploading...</p>
                </div>
              )}
              {status === 'success' && (
                <div className={styles.create_certificate__success}>
                  <FileIcon />
                  <div
                    className={cn([
                      styles['create_certificate__success--name'],
                    ])}
                  >
                    {fileName}
                    <p>Uploaded</p>
                  </div>
                  <div
                    className={cn([
                      styles['create_certificate__success--trash'],
                    ])}
                    onClick={(e) => {
                      e.stopPropagation();
                      revokeFile();
                    }}
                  >
                    <TrashIcon />
                  </div>
                </div>
              )}
            </FileInput>
          </div>
        </div>

        <div className={styles.create_certificate__step}>
          <div className={styles.create_certificate__rail}>
            <span
              className={styles.create_certificate__bullet}
              aria-hidden="true"
            ></span>
          </div>

          <div className={styles.create_certificate__content}>
            <div className={styles.create_certificate__title}>
              Download your signed certificate
            </div>
            <div className={styles.create_certificate__description}>
              Once signed, download your Sandbox certificate. This file is
              required to authenticate against our APIs.
            </div>
            <div className={styles.create_certificate__download_btn}>
              <Button
                name="Download certificate"
                variant="gradient_primary"
                type="button"
                onClick={() => downloadFile()}
              />
            </div>
          </div>
        </div>

        <div className={styles.create_certificate__step}>
          <div className={styles.create_certificate__rail}>
            <span
              className={styles.create_certificate__bullet}
              aria-hidden="true"
            ></span>
          </div>

          <div className={styles.create_certificate__content}>
            <div className={styles.create_certificate__title}>
              Use your certificate in API calls
            </div>
            <div className={styles.create_certificate__description}>
              Install the certificate and key on your server or application
              client. Configure your HTTP client to use them for mutual TLS
              (mTLS) when calling Sandbox APIs.
            </div>
            <div className={styles.create_certificate__show_btn}>
              <Button
                variant="primary"
                type="submit"
                onClick={() =>
                  router.push('/get-started/generate-csr-certificate')
                }
              >
                Read the guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
