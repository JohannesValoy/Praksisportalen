export default function ThemeSwap({
  handleOnClick,
}: {
  readonly handleOnClick?: (e?: any) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleOnClick && handleOnClick(e.target.value);
  };
  const themes = [
    "HMR",
    "aqua",
    "autumn",
    "business",
    "coffee",
    "corporate",
    "cmyk",
    "cupcake",
    "cyberpunk",
    "dark",
    "dracula",
    "fantasy",
    "forest",
    "garden",
    "halloween",
    "lemonade",
    "luxury",
    "night",
    "retro",
    "synthwave",
    "valentine",
    "wireframe",
  ];

  return (
    <select className="select bg-base-200" onChange={handleChange}>
      <option disabled selected value="" className="bg-base-200">
        Select theme
      </option>
      {themes.map((theme) => (
        <option className="bg-base-300" key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
}
