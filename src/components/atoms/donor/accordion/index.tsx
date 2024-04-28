import {
  Accordion,
  AccordionHeader,
  AccordionBody
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import i18n from "../../../../i18n";
import { type FaqSectionTypes } from "../../../../types/faqSectionTypes";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 }
};

interface IconProps {
  id: number;
  open: any;
}

function Icon({ id, open }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <g clipPath="url(#clip0_3507_13537)">
        <path
          d="M6 9L12 15L18 9"
          stroke="#C8934F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3507_13537">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const AccordionSection = ({ data }: { data: FaqSectionTypes[] }) => {
  const [locale, setLocale] = useState(i18n.language);
  const isArabic = locale === "ar";

  useEffect(() => {
    const updateLocale = () => {
      setLocale(i18n.language);
    };

    i18n.on("languageChanged", updateLocale);

    return () => {
      i18n.off("languageChanged", updateLocale);
    };
  }, []);
  const [open, setOpen] = useState(0);

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  return (
    <div className="px-3">
      {data.map((item) => {
        return (
          <Accordion
            placeholder={""}
            open={open === item.id}
            animate={CUSTOM_ANIMATION}
            icon={<Icon id={item.id} open={open} />}
            key={item.id}
          >
            {isArabic ? (
              <AccordionHeader
                placeholder={""}
                onClick={() => handleOpen(item.id)}
                className="text-xsxl font-medium text-black-500 text-right"
              >
                {item.arabicQuestion}
              </AccordionHeader>
            ) : (
              <AccordionHeader
                placeholder={""}
                onClick={() => handleOpen(item.id)}
                className="text-xsxl font-medium text-black-500"
              >
                {item.question}
              </AccordionHeader>
            )}
            {isArabic ? (
              <AccordionBody>
                <span className="text-xsxl font-normal text-black-500">
                  {item.arabicAnswer}
                </span>
              </AccordionBody>
            ) : (
              <AccordionBody>
                <span className="text-xsxl font-normal text-black-500">
                  {item.answer}
                </span>
              </AccordionBody>
            )}
          </Accordion>
        );
      })}
    </div>
  );
};

export default AccordionSection;
