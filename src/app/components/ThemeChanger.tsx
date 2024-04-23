export default function ThemeChanger({
  handleOnClick,
}: {
  handleOnClick?: (e?: any) => void;
}) {
  const themes = [
    "HMR",
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];
  return (
    <>
      <select className="select select-ghost" onChange={handleOnClick}>
        {themes.map((theme, index) => (
          <option className="bg-base-300" key={index} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </>
  );
}
