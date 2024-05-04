/**
 * Component to display a color description
 * @param root - The root of the component
 * @param root.name - The name of the color
 * @param root.description - The description of the color
 * @returns The Color Description Component
 */
const ColorDescription = ({ name, description }) => (
  <p>
    <strong>{name}:</strong> {description}
  </p>
);

/**
 * Page Component to show DaisyUI Theme Colors
 * @param ColorDescription - The Color Description Component
 * @returns The DaisyUI Theme Colors Page
 */
const Page = () => {
  const colors = [
    "bg-primary",
    "bg-secondary",
    "bg-accent",
    "bg-neutral",
    "bg-success",
    "bg-info",
    "bg-warning",
    "bg-error",
    "bg-base-100",
    "bg-base-200",
    "bg-base-300",
  ];

  return (
    <div className="p-6">
      <h1>DaisyUI Theme Colors</h1>
      <div className="grid grid-cols-4 gap-4">
        {colors.map((color) => (
          <div key={color} className={`h-16 shadow ${color} border`}>
            {color}
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <ColorDescription
          name="Primary Color"
          description="The primary color is the main color that represents your brand or the main focus of your design. Use it for headers, important buttons, links, and other prominent elements. It draws attention and establishes brand identity."
        />
        <ColorDescription
          name="Secondary Color"
          description="The secondary color complements the primary color and provides visual variety. Use it for backgrounds, borders, secondary buttons, or to highlight less important elements. It adds depth and visual interest to your design."
        />
        <ColorDescription
          name="Accent Color"
          description="The accent color is used to draw attention to specific elements or actions. Use it for call-to-action buttons, alerts, or important messages. It emphasizes key actions or information."
        />
        <ColorDescription
          name="Base Color"
          description="The base color serves as a background color for your content. Use it as the background of your website or application, behind text and other elements. It provides a foundation for your design, ensuring readability and visual coherence."
        />
        <ColorDescription
          name="Neutral Color"
          description="Neutral colors are used for text, backgrounds, and other elements where you want to minimize visual distraction. Use them for text, backgrounds, borders, and other supporting elements. It creates contrast with primary and secondary colors, making content easy to read and understand."
        />
        <ColorDescription
          name="Success Color"
          description="The success color indicates positive feedback or successful completion of an action. Use it for success messages, confirmation messages, or to indicate completed tasks. It reinforces positive user experiences and actions."
        />
        <ColorDescription
          name="Info Color"
          description="The info color is used for providing neutral information or guidance to the user. Use it for informational messages, tooltips, or links to additional resources. It provides context or additional information without drawing too much attention."
        />
        <ColorDescription
          name="Warning Color"
          description="The warning color alerts users to potential issues or actions that require attention. Use it for warning messages, error notifications, or to indicate incomplete or invalid input. It draws attention to potential problems or areas that need the user's attention."
        />
        <ColorDescription
          name="Error Color"
          description="The error color indicates that something has gone wrong or needs immediate attention. Use it for error messages, validation errors, or to indicate critical issues. It draws immediate attention to problems and prompts users to take action to resolve them."
        />
      </div>
    </div>
  );
};

export default Page;
