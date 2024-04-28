import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import BasicButton from "../../../../atoms/donor/buttons/BasicButton";

const EduMaterial = () => {
  const router = useNavigate();
  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg py-2.5 mt-4 w-[70rem] mb-20 px-5 flex flex-col">
        <div className=" flex justify-between">
          <span className=" text-primary text-5xl font-medium">{t("edu")}</span>
          <div className="w-[130px] rounded-50">
            <BasicButton
              onClick={() => {
                router(-1);
              }}
              styledBorderEnabled={true}
              style={{
                backgroundColor: "#EFE8D8",
                color: "#000000",
                width: "130px",
                paddingLeft: "20px",
                paddingRight: "20px",
                borderRadius: "50px"
              }}
              styledFullyRounded
              text={`${t("go-back")}`}
            />
          </div>
        </div>
        <div className="flex flex-col overflow-auto mt-3.5">
          <span className=" text-lg font-bold">{t("donor-edu-materials")}</span>
          <span className=" text-base my-3">{t("edu-material-para-01")}</span>
          <span className=" text-lg font-bold">
            {t("edu-material-para-02")}
          </span>
          <span className="text-lg font-bold mt-3 underline">
            {t("edu-material-topic-01")}
          </span>
          <span className=" text-base">
            {t("your")} <span className=" font-bold"></span>
            {t("complete honesty")}
            {t("edu-material-para-03")}
            <span className=" font-bold">{t("edu-material-para-04")}</span>.
          </span>
          <span className="text-lg font-bold mt-3 underline">
            {t("edu-material-para-05")}
          </span>
          <span className=" text-base underline font-bold">
            {t("edu-material-para-06")}
          </span>
          <span>{t("edu-material-para-07")}</span>
          <span className=" text-base underline font-bold mt-3">
            {t("edu-material-topic-02")}
          </span>
          <div>
            <span>{t("edu-material-para-08")}</span>
            <div>
              <ol className="list-decimal">
                <li>{t("edu-material-topic-03")}</li>
                <li>{t("edu-material-topic-04")} </li>
                <li>{t("edu-material-topic-05")}</li>
              </ol>
            </div>
          </div>
          <span className="text-lg font-bold mt-3 underline">
            {t("edu-material-topic-06")}
          </span>
          <span className=" text-base">{t("edu-material-para-09")}</span>
          <span className=" text-base font-bold mt-3">
            {t("edu-material-topic-07")}
          </span>
          <div>
            <ul>
              <li>{t("edu-material-para-10")}</li>
              <li>{t("edu-material-para-11")}</li>
              <li>{t("edu-material-para-12")}</li>
              <li>{t("edu-material-para-13")}</li>
              <li>
                {t("edu-material-para-14")}
                <ul>
                  <li>{t("edu-material-point-1")}</li>
                  <li>{t("edu-material-point-2")}</li>
                  <li>{t("edu-material-point-3")}</li>
                  <li>{t("edu-material-point-4")}</li>
                  <li>{t("edu-material-point-5")}</li>
                  <li>{t("edu-material-point-6")}</li>
                  <li>{t("edu-material-point-7")}</li>
                </ul>
              </li>
            </ul>
          </div>
          <span className="text-base mt-5">
            {t("edu-material-para-15")}
            <span className=" font-bold">{t("edu-material-para-16")}</span>
          </span>
          <span className=" text-lg font-bold underline mt-3">
            {t("edu-material-para-17")}
          </span>
          {t("edu-material-para-18")}
        </div>
      </div>
    </div>
  );
};

export default EduMaterial;
