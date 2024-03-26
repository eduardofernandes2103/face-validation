import { CircularProgress } from '@mui/material';
import styles from './styles.module.scss';
import Image from 'next/image';
import Logo from '../../assets/images/sphere_simbolo_colorida.svg';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <Image src={Logo} alt="automaker-logo" />
      <CircularProgress size={150} thickness={1} sx={{ color: '#90e0ef' }} />
    </div>
  );
};

export default Loading;