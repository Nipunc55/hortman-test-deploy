import { Button } from "@material-tailwind/react";
import SearchIcon from "../../../../assets/svg/searchIcon";

const SearchMiniButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      placeholder={""}
      onClick={onClick}
      className="w-full text-center flex font-normal justify-center items-center text-base h-10 bg-[#C8934F] normal-case rounded-lg border border-[#9A793D]"
    >
      <SearchIcon /> <span className="ml-3">Search</span>
    </Button>
  );
};

export default SearchMiniButton;
