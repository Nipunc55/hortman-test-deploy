const UserRolesSelector = ({
  defaultValue = "administrator",
  onChange
}: {
  defaultValue?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="px-4.5 py-1.25 w-35 bg-secondary rounded-md text-xsxl flex flex-row justify-between items-center">
      <select
        defaultValue={defaultValue}
        onChange={onChange}
        className="bg-transparent outline-none w-full"
      >
        <option value="administrator">Administrator</option>
        <option value="donor">Donor</option>
        <option value="driver">Driver</option>
        <option value="healthProfessional">Health Professional</option>
      </select>
    </div>
  );
};

export default UserRolesSelector;
