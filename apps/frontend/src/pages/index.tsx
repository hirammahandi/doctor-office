import { memo, useCallback, useState } from "react";

const namesArray = ["hiram", "abel", "daniel"];

// eslint-disable-next-line react/display-name
const Card = memo((props: Record<string, any>) => {
  console.log(props);
  return (
    <div>
      <p>{props.name}</p>
      <button onClick={() => props.handleChangeName(props.index, "Raul")}>
        Change Name
      </button>
    </div>
  );
});

const Home = () => {
  const [count, setCount] = useState(0);
  const [names, setNames] = useState(namesArray);

  const handleChangeName = useCallback((index: number, newName: string) => {
    setNames((prev) => {
      const newNames = [...prev];
      newNames[index] = newName;

      return newNames;
    });
  }, []);

  return (
    <div style={{ padding: 100 }}>
      <h1>Home</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
      {names.map((name, index) => (
        <Card
          key={name + index}
          name={name}
          index={index}
          handleChangeName={handleChangeName}
        />
      ))}
    </div>
  );
};

export default Home;
