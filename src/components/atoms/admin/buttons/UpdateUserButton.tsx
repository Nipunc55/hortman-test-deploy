import { useState } from "react";
import ActionIcon from "../../../../assets/svg/actionIcon";
import UserUpdateModal from "../../../molecules/admin/modals/UserUpdateModal";

const UpdateUserButton = ({ data }: { data: any }) => {
  const [isUserUpdateModalOpen, setIsUserUpdateModalOpen] =
    useState<boolean>(false);
  return (
    <div className="cursor-pointer">
      <div onClick={() => setIsUserUpdateModalOpen(true)}>
        <ActionIcon />
      </div>
      <UserUpdateModal
        open={isUserUpdateModalOpen}
        handleOpen={setIsUserUpdateModalOpen}
        data={data}
      />
    </div>
  );
};

export default UpdateUserButton;
