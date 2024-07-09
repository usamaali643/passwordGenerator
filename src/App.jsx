import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number) str += 123456789;
    if (character) str += "!@#$%^&*()_+";

    for (let i = 1; i < length; i++) {
      const randomPassword = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomPassword);
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, setPassword]);

  const copyClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="md:w-fit w-72 bg-stone-600 py-10 bg-opacity-15 rounded-3xl  justify-center m-auto  text-center my-20">
        <h1 className="text-3xl  text-white my-5">Password Generator</h1>
        <div className="flex justify-center items-center">
          <input
            type="text"
            readOnly
            className="md:w-96 w-40  py-2 outline-none border-none rounded-md px-2 text-2xl"
            value={password}
            ref={passwordRef}
            placeholder="password"
          />
          <button
            type="button"
            className="mx-2 bg-sky-800 text-white py-2 px-4 rounded-xl"
            onClick={copyClipBoard}
          >
            Copy
          </button>
        </div>
        <div className=" md:flex  md:justify-center  md:flex-row flex-col my-4 text-orange-500">
          <div className="flex justify-center my-4 text-orange-500">
            <input
              type="range"
              min={8}
              max={50}
              className="mx-2 cursor-pointer"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length} </label>
          </div>
          <div className="flex justify-center  my-4 mx-4 text-orange-500">
            <input
              type="checkbox"
              className="mx-2 cursor-pointer"
              onChange={() => setNumber((prev) => !prev)}
            />
            <label>Number</label>
          </div>
          <div className="flex  justify-center my-4 mx-4 text-orange-500">
            <input
              type="checkbox"
              className="mx-2 cursor-pointer"
              onChange={() => setCharacter((prev) => !prev)}
            />
            <label>Special Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
