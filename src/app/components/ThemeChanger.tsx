/**
 * The ThemeSwap component is a dropdown menu that allows the user to select a theme.
 * @param root The root element of the application
 * @param root.handleOnClick The function that is called when the user selects a theme.
 * @returns A dropdown menu that allows the user to select a theme.
 */
export default function ThemeSwap({
  handleOnClick,
}: {
  handleOnClick?: (e?: any) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleOnClick && handleOnClick(e.target.value);
  };
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
    "autumn",
    "business",
    "coffee",
    "winter",
    "dim",
    "sunset",
  ];
  return (
    <>
      <select className="select select-ghost" onChange={handleChange}>
        <option disabled selected value="" className="bg-base-100">
          Select theme
        </option>
        {themes.map((theme, index) => (
          <option className="bg-base-300" key={index} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </>
  );
}
