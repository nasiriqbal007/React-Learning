export function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  console.log("Button rendered");
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 bg-blue-500 text-white rounded"
    >
      {children}
    </button>
  );
}
