import { CgSearchLoading } from "react-icons/cg";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const Search = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div className="search">
      <div>
        <CgSearchLoading color="white" size={30} />
        <input
          type="text"
          placeholder="Search Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};
export default Search;
