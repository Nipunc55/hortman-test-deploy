import TextInput from "../../../atoms/admin/inputs/textInput";
import TableTitle from "../../../atoms/admin/typography/TableTitle";

const TableWithSearchBar = () => {
  return (
    <div>
      <div>
        <div>
          <TableTitle
            text="Table Title"
            textSize="text-6xl"
            color="text-textSecondary"
          />
          <TextInput styles="gold-gradient-border" />
        </div>
      </div>
    </div>
  );
};

export default TableWithSearchBar;
