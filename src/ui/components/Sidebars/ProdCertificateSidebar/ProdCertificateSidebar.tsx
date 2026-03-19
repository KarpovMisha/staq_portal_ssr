// import cn from 'classnames';

// import { useAppSelector } from 'hooks/useRedux';
// import { prodCertificatesActiveStep, prodCertificatesList } from '../../../redux/reducers/prodCertificates';
// import styles from './ProdCertificateSidebar.module.scss';

// export default function ProdCertificateSidebar() {
//   const steps = useAppSelector(prodCertificatesList);
//   const activeStepd = useAppSelector(prodCertificatesActiveStep);

//   return (
//     <aside className={styles.prod_certificate} aria-label="Onboarding steps">
//       <ol className={styles.prod_certificate__steps}>
//         {steps?.map((s, i) => {
//           const isActiveStep = activeStepd === s.title;
//           return (
//             <li
//               key={i}
//               className={cn(styles.prod_certificate__step, {
//                 [styles['prod_certificate__step--active']]: isActiveStep,
//               })}
//             >
//               <div className={styles.prod_certificate__head}>
//                 <span className={cn(styles.prod_certificate__number, {
//                   [styles['prod_certificate__number--active']]: isActiveStep
//                 })} aria-hidden>
//                   {i + 1}
//                 </span>
//                 <span className={styles.prod_certificate__title}>{s.title}</span>
//               </div>

//               {s.sub && isActiveStep && (
//                 <ul className={styles.prod_certificate__sublist}>
//                   {s.sub.map((c, i) => (
//                     <li
//                       key={i}
//                       className={cn(styles.prod_certificate__subitem, {
//                         [styles['prod_certificate__subitem--active']]: c.active && !c.checked,
//                       })}
//                     >
//                       <span className={styles.prod_certificate__subLabel}>{c.label}</span>
//                       <span
//                         className={cn(styles.prod_certificate__radio, {
//                           [styles['prod_certificate__radio--active']]: c.active,
//                           [styles['prod_certificate__radio--success']]: c.checked,
//                         })}
//                         aria-hidden
//                       />
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           );
//         })}
//       </ol>
//     </aside>
//   );
// }
