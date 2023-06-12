'use client';

import AuthModal from '@/components/AuthModal';
import SubscribeModal from '@/components/SubscribeModal';
import UploadModal from '@/components/UploadModal';
import { ProductWithPrice } from '@/types';

import { useEffect, useState } from 'react';

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  );
};

export default ModalProvider;
