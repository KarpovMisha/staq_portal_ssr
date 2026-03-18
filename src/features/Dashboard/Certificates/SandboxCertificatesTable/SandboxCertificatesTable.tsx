import moment from 'moment';
import cn from 'classnames';

import DownloadIcon from '@/ui/icons/download.svg';
import TrashIcon from '@/ui/icons/trash.svg';
import styles from './CertificateTable.module.scss';

// import { downloadCertificate } from '../../redux/reducers/certificates';
import { Button } from '@/ui/elements';
import { useAppDispatch } from '@/store/hooks';
import { dashboardActions } from '@/store/slices/dashboard';

type SandboxCertificatesTableProps = {
  certificates: {
    id: string;
    creationDate: string;
    status: string;
  }[];
  title: string;
  description: string;
};

export default function SandboxCertificatesTable({
  certificates,
  title,
  description,
}: SandboxCertificatesTableProps) {
  const dispatch = useAppDispatch();

  function downloadFile(certificateId: any) {
    console.log(certificateId);
    // dispatch(downloadCertificate({ id: certificateId }));
  }

  return (
    <div className={styles.cert_table}>
      <div className={styles.cert_table__title}>{title}</div>
      <div className={styles.cert_table__description}>{description}</div>
      <div className={styles.cert_table__table}>
        <div className="response-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {certificates?.map((cert) => {
                const dateFormat = 'YYYY-MM-DD HH:mm:ss';
                const certCreationDate = moment.utc(cert.creationDate).local().format(dateFormat);
                return (
                  <tr key={cert.id}>
                    <td>Sandbox CSR</td>
                    <td>{cert.status}</td>
                    <td>{certCreationDate}</td>
                    <td>
                      <div className={cn([styles['cert_table__table--buttons']])}>
                        {cert.status?.toLowerCase() !== 'revoked' && (
                          <Button
                            variant="error"
                            onClick={() =>
                              dispatch(
                                dashboardActions.setActiveModalDetails({
                                  name: 'revoke CSR file',
                                  certId: cert.id,
                                  certCreationDate,
                                })
                              )
                            }
                          >
                            <div className={styles['cert_table__table--button']}>
                              Revoke access <TrashIcon />
                            </div>
                          </Button>
                        )}
                        <Button onClick={() => downloadFile(cert.id)}>
                          <div className={styles['cert_table__table--button']}>
                            Download <DownloadIcon />
                          </div>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
