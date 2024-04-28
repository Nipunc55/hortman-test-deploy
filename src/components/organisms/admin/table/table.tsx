import EditButtonSvg from "../../../../assets/svg/EditButtonSvg";
import { TableViewButton } from "../../../atoms/admin/buttons/TableButtons";
import TableTitle from "../../../atoms/admin/typography/TableTitle";

const Table = () => {
  const TABLE_HEAD = [
    "Date",
    "HSCL ID",
    "packageName",
    "Donor Name",
    "Banking Type",
    "Status",
    "Action"
  ];

  const TABLE_ROWS = [
    {
      date: "August 19, 2023 23:15:30",
      hsclID: "HSCL20231001",
      packageName: "Treasure Hope",
      donorName: "Latifa Sherbeeni",
      bankingType: "Family Banking",
      status: "Pending"
    },
    {
      date: "August 19, 2023 23:15:30",
      hsclID: "HSCL20231001",
      packageName: "Treasure Hope",
      donorName: "Latifa Sherbeeni",
      bankingType: "Family Banking",
      status: "Pending"
    },
    {
      date: "August 19, 2023 23:15:30",
      hsclID: "HSCL20231001",
      packageName: "Treasure Hope",
      donorName: "Latifa Sherbeeni",
      bankingType: "Family Banking",
      status: "Pending"
    },
    {
      date: "August 19, 2023 23:15:30",
      hsclID: "HSCL20231001",
      packageName: "Treasure Hope",
      donorName: "Latifa Sherbeeni",
      bankingType: "Family Banking",
      status: "Pending"
    },
    {
      date: "August 19, 2023 23:15:30",
      hsclID: "HSCL20231001",
      packageName: "Treasure Hope",
      donorName: "Latifa Sherbeeni",
      bankingType: "Family Banking",
      status: "Pending"
    },
    {
      date: "August 19, 2023 23:15:30",
      hsclID: "HSCL20231001",
      packageName: "Treasure Hope",
      donorName: "Latifa Sherbeeni",
      bankingType: "Family Banking",
      status: "Pending"
    }
  ];
  return (
    <div className="my-5">
      <div className="bg-white w-full p-5 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <TableTitle text={"Applications Status"} />
          <TableViewButton text={"View All"} />
        </div>
        <div className="h-full w-full overflow-y-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-secondary pb-2 pt-4"
                  >
                    <span className="font-medium text-base text-black">
                      {head}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                ({
                  date,
                  hsclID,
                  packageName,
                  donorName,
                  bankingType,
                  status
                }) => (
                  <tr key={date} className="even:bg-blue-gray-50/50">
                    <td className="py-2">
                      <span color="blue-gray" className="font-normal">
                        {date}
                      </span>
                    </td>
                    <td className="py-2">
                      <span color="blue-gray" className="font-normal">
                        {hsclID}
                      </span>
                    </td>
                    <td className="py-2">
                      <span color="blue-gray" className="font-normal">
                        {packageName}
                      </span>
                    </td>
                    <td className="py-2">
                      <span color="blue-gray" className="font-normal">
                        {donorName}
                      </span>
                    </td>
                    <td className="py-2">
                      <span color="blue-gray" className="font-normal">
                        {bankingType}
                      </span>
                    </td>
                    <td className="py-2">
                      <span color="blue-gray" className="font-normal">
                        {status}
                      </span>
                    </td>
                    <td className="py-2 flex justify-center items-center">
                      <button>
                        <EditButtonSvg />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
