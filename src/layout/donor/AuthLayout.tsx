/* eslint-disable @typescript-eslint/no-floating-promises */

import i18n from "../../i18n";
import LoginPage from "../../pages/auth/login";
import LocaleContext from "../../utils/context/LocaleContext";
import { useState } from "react";

const LoginLayout = () => {
  const [locale, setLocale] = useState(i18n.language);

  i18n.on("languageChanged", (_lng) => setLocale(i18n.language));

  return (
    <div>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <LoginPage />
      </LocaleContext.Provider>
    </div>
  );
};

export { LoginLayout };
