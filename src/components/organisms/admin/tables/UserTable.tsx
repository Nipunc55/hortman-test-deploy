import { t } from "i18next";
import TableTitle from "../../../atoms/admin/typography/TableTitle";
import BasicButton from "../../../atoms/admin/buttons/BasicButton";
import UserTableHeaders from "../../../molecules/admin/userTables/tableHeaders/UserTableHeaders";
import UserTableRows from "../../../molecules/admin/userTables/tableRows/UserTableRows";
import { Alert } from "@material-tailwind/react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import { useEffect, useState } from "react";
import { getUsers } from "../../../../api/user";
import UserCreateModal from "../../../molecules/admin/modals/UserCreateModal";
import TablePagination from "../../../molecules/admin/pagination/TablePagination";
import CreateUserModal from "../../../atoms/admin/modals/CreateUserModal";

const UserTable = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [userData, setUsersData] = useState<any>(null);
  const [isUserCreateModalOpen, setIsUserCreateModalOpen] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [name, setName] = useState("");
  const [role, setRole] = useState<any>(undefined);
  const [status, setStatus] = useState<any>(undefined);
  const [filteredUserData, setFilteredUserData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isUserCreateModalOpen) void getUserData();
  }, [searchTerm, currentPage, isUserCreateModalOpen]);

  const getUserData = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any = await getUsers(
      false,
      currentPage,
      10,
      role,
      name,
      status
    );
    setIsLoading(false);

    if (apiSuccess && apiSuccess.status === 200) {
      setUsersData(apiSuccess.data.data.docs);
      console.log(apiSuccess.data.data.docs);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setTotalPages(apiSuccess.data.data.totalPages);
      setIsLoading(false);
    } else if (apiError) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setMessage(apiError.response.data.message);
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };
  const [UserCreateModalOpen, setUserCreateModalOpen] =
    useState<boolean>(false);

  const filterSearch = () => {
    setName(name);
    setRole(role);
    setStatus(status);

    const filteredData = userData.filter((item: any) => {
      const matchesName = !name || item?.name;
      const matchesRole = !role || item?.role;
      const matchesStatus =
        status === undefined || item?.is_active === (status === true);
      return matchesName && matchesRole && matchesStatus;
    });

    setFilteredUserData(filteredData);
    void getUserData();
    console.log(filteredUserData + "filtered Data");
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  console.log(onInputChange);

  return (
    <div className="bg-tableBg w-full p-5 rounded-xl shadow-lg my-5  mb-16">
      {isError && (
        <Alert
          color="red"
          className="w-full container absolute flex justify-center top-40"
        >
          <span>{message}</span>
        </Alert>
      )}
      <div className="flex justify-between items-center mb-2">
        <TableTitle
          text={`${t("users")}`}
          textSize="text-6xl"
          color="text-textSecondary"
        />
        <BasicButton
          onClick={() => {
            setIsUserCreateModalOpen(true);
          }}
          text={`${t("create")}`}
          style={{
            backgroundColor: "#EFE8D8",
            color: "#000000"
          }}
        />
        <CreateUserModal
          open={UserCreateModalOpen}
          handleOpen={setUserCreateModalOpen}
        />
      </div>
      <UserTableHeaders
        role={role}
        status={status}
        filterSearch={filterSearch}
        name={name}
        setAccess={setRole}
        setStatus={setStatus}
        setName={setName}
      />
      <div className="min-h-[200px] flex flex-col justify-between">
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center my-10">
              <LoaderIconSvg />
            </div>
          ) : (
            <>
              <UserTableRows data={userData} />
            </>
          )}
          <div>
            {totalPages > 1 && (
              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
      <UserCreateModal
        open={isUserCreateModalOpen}
        handleOpen={setIsUserCreateModalOpen}
      />
    </div>
  );
};

export default UserTable;
