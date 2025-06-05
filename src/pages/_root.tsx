export default async function RootElement({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" className="system">
      <head></head>
      <body>{children}</body>
    </html>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
