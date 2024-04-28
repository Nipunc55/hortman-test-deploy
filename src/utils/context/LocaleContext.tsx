import { createContext } from "react";

interface LanguageContextProps {
  locale: string;
  setLocale: (locale: string) => void;
}

const defaultValue: LanguageContextProps = {
  locale: "en",
  setLocale: () => {}
};

const LanguageContext = createContext(defaultValue);

export default LanguageContext;
