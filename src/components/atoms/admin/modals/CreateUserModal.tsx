import { Dialog, DialogBody } from "@material-tailwind/react";
import { t } from "i18next";
import InputField from "../inputField/InputField";
import BasicButton from "../buttons/BasicButton";

interface CreateUserModalProps {
  open: boolean;
  handleOpen: (value: boolean) => void;
}

const CreateUserModal = ({ open, handleOpen }: CreateUserModalProps) => {
  return (
    <div className="absolute right-10">
      <Dialog
        placeholder={""}
        open={open}
        size={"xs"}
        handler={handleOpen}
        className=""
      >
        <DialogBody className="p-0" placeholder={""}>
          <div className="flex justify-between items-center  px-5 py-2">
            <div className="text-[#9A793D] text-5xl font-normal">
              {t("create-user")}
            </div>
            <div onClick={() => handleOpen(false)} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clipPath="url(#clip0_8213_18063)">
                  <path
                    d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 10L14 14M14 10L10 14"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_8213_18063">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="px-5 py-6 border border-t-secondary flex flex-col gap-7">
            <InputField
              placeholder="User Name"
              label={`${t("full-name")}`}
              value=""
              onInputChange={() => {}}
            />
            <InputField
              placeholder="Mobile"
              label={`${t("mobile")}`}
              value=""
              onInputChange={() => {}}
            />
            <InputField
              placeholder="name@email.com"
              label={`${t("email")}`}
              value=""
              onInputChange={() => {}}
            />
            <InputField
              placeholder="Role"
              label={`${t("role")}`}
              value=""
              onInputChange={() => {}}
            />
            <div className="flex justify-center">
              <BasicButton
                text={`${t("save")}`}
                onClick={() => {
                  handleOpen(false);
                }}
              />
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default CreateUserModal;
