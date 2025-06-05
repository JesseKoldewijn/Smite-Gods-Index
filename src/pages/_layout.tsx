import type { ReactNode } from 'react';

import { Header } from '../components/header';
import '../styles.css';

type RootLayoutProps = { readonly children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <div className="flex min-h-screen flex-col items-center lg:m-0 lg:min-h-svh lg:justify-center">
      <meta name="description" content={data.description} />
      <link rel="icon" type="image/png" href={data.icon} />
      <Header />
      {children}
    </div>
  );
}

const getData = async () => {
  const data = {
    description: 'An internet website!',
    icon: '/images/favicon.png',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
