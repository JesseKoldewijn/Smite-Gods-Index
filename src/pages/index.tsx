async function HomePage() {
  const data = await getData();

  return (
    <div className="my-auto flex w-full flex-col items-center">
      <title>{data.title}</title>
      <strong>{data.headline}</strong>
      <p>{data.body}</p>
    </div>
  );
}
export default HomePage;

const getData = async () => {
  const data = {
    title: 'Smite 2 Gods | Jereko',
    headline: 'Smite 2 Gods',
    body: 'A database of all the gods in Smite 2.',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
