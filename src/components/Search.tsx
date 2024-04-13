import { memo } from "react";

// for Future Preference

interface SearchProps {
  onChange: (text: string) => void;
}

const Search = ({ onChange }: SearchProps) => {
  return (
    <input
      type="text"
      placeholder="Seach users..."
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default memo(Search);
