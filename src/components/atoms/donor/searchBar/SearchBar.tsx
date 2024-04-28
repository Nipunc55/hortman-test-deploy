const SearchBar = ({
  onChange,
  value,
  placeholder = "Search..."
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
}) => {
  return (
    <div className="gold-gradient-input-border w-70 h-10 relative">
      <input
        className="flex items-center z-30 px-2.5 bg-transparent h-full w-full outline-none text-inputText"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const SecondarySearchBar = ({
  onChange,
  value,
  placeholder = "Search..."
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
}) => {
  return (
    <div className="secondary-gold-gradient-input-border relative">
      <input
        className="flex items-center z-30 px-2.5 bg-transparent h-full w-full outline-none text-inputText"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export { SearchBar, SecondarySearchBar };
