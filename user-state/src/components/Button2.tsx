import { memo } from "react";

type Button2Props = {
  onClick: () => void;
  count: number;
};

export const Button2 = memo(function Button2({ onClick, count }: Button2Props) {
  console.log("Button2 rendered");
  return (
    <button
      className="px-3 py-1 bg-green-500 text-white rounded"
      onClick={onClick}
    >
      Count 3: {count}
    </button>
  );
});
