import { t } from "i18next";
import DropDownList from "../../../../atoms/admin/dropDownList/DropDownList";
import SearchMiniButton from "../../../../atoms/admin/buttons/SearchMiniButton";
import InputField from "../../../../atoms/admin/inputField/InputField";

const UserTableHeaders = ({
  name,
  role,
  status,
  setName,
  setAccess,
  setStatus,
  filterSearch
}: {
  name: string;
  role: string;
  status: boolean;
  setName: (value: any) => void;
  setAccess: (value: any) => void;
  setStatus: (value: any) => void;
  filterSearch: () => void;
}) => {
  const options = [
    { value: undefined, label: "All" },
    { value: "ADMIN", label: "Administrator" },
    { value: "DONOR", label: "Donor" },
    { value: "HEALTH", label: "Health care professional" },
    { value: "DRIVER", label: "Driver" }
  ];

  const optionsStatus = [
    { value: undefined, label: "All" },
    { value: true, label: "Active" },
    { value: false, label: "Inactive" }
  ];

  const onAccessHandler = async (event: { value: string; label: string }) => {
    setAccess(event.value);
  };

  const onStatusHandler = async (event: { value: string; label: string }) => {
    setStatus(event.value);
  };

  return (
    <>
      <div className="flex gap-5 pt-6 pb-3  flex-row text-base font-medium  items-center justify-center border-t border-[#EFE8D8]">
        <div className="flex flex-col gap-1 w-full">
          <div>{t("name")}</div>
          <div>
            <InputField
              placeholder="Name"
              label=""
              onInputChange={(e) => setName(e.target.value)}
              value={name}
              styles={{ width: "100%", height: "40px" }}
              key={"key"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full min-w-[180px]">
          <div>{t("Access")}</div>
          <div className="">
            <DropDownList
              options={options}
              name="role"
              value={role === undefined ? "All" : role}
              // onSelect={() => {}}
              onChange={onAccessHandler}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full min-w-[180px]">
          <div>{t("Status")}</div>
          <div className="">
            <DropDownList
              options={optionsStatus}
              name="status"
              // eslint-disable-next-line no-constant-condition
              value={
                status === undefined ? "All" : status ? "Active" : "Inactive"
              }
              // onSelect={() => {}}
              onChange={onStatusHandler}
              placeholder=""
            />
          </div>
        </div>
        <div className="mt-6 w-full">
          <SearchMiniButton
            onClick={() => {
              filterSearch();
            }}
          />
        </div>
      </div>
      <div className="flex flex-row text-base font-medium pb-3 pt-7 items-center justify-center border-b-2 border-secondary">
        <div className="flex-[3]">{t("created-at")}</div>
        <div className="flex-[4] ">{t("name")}</div>
        <div className="flex-[2.5]">{t("mobile")}</div>
        <div className="flex-[4.5]">{t("email")}</div>
        <div className="flex-[3]">{t("access")}</div>
        <div className="flex-[2]">{t("status")}</div>
        <div className="flex-[1]"></div>
      </div>
    </>
  );
};

export default UserTableHeaders;
