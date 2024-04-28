import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import { useEffect, useState } from "react";
import i18n from "./i18n";
import LocaleContext from "./utils/context/LocaleContext";
import Rootlayout from "./layout/admin/rootLayout";
import Dasboard from "./pages/admin/dasboard";
import Payments from "./pages/admin/payments";
import Invoice from "./pages/admin/payments/paymentInvoice";
import DonorApplications from "./pages/admin/donorApplications";
import DonorApplicationIndividual from "./pages/admin/donorApplicationIndividual";
import EducationalMaterial from "./pages/admin/educationalMaterial";
import AddEducationalMaterial from "./pages/admin/addEducationalMaterial";
import EducationalMaterialBlog from "./pages/admin/educationalMaterial/educationalMaterial";
import Reports from "./pages/admin/reports";
import Users from "./pages/admin/users";
import LoginPage from "./pages/auth/login";
import OtpPage from "./pages/auth/otp";
import RootLayout from "./layout/donor/RootLayout";
import Home from "./pages/donor/home";
import Profile from "./pages/donor/my-profile";
import StemCellPackages from "./pages/donor/stem-cell-packages";
import StemCellPackagesInvoicePage from "./pages/donor/stem-cell-packages/invoicePage";
import EmptyStatePage from "./pages/donor/stem-cell-packages/emptyStatePage";
import DonorPayments from "./pages/donor/payments";
import DonorEducationalMaterial from "./pages/donor/educational-material";
import EducationalMaterialBlogHome from "./pages/donor/educational-material/educationalMaterialBlogHome";
import DonorInvoice from "./pages/donor/payments/paymentInvoice";
import ContactUs from "./pages/donor/contact-us";
import Notifications from "./pages/donor/notifications";
import EligibleScreen from "./pages/donor/eligible-screen";
import ConsentForm from "./pages/donor/consent-form";
import CheckOut from "./pages/donor/checkout";
import HealthCareLayout from "./layout/donor/HealthCareLayout";
import HealthCareHome from "./pages/donor/healthCareHome";
import EducationalMaterialHealthCare from "./pages/donor/educational-material/educationalMaterialHealthCare";
import QuickSetupLayout from "./layout/donor/QuickSetupLayout";
import DonorQuickSetup from "./pages/donor/quick-setup/donor";
import HealthCareProfessionalQuickSetup from "./pages/donor/quick-setup/health-care-profession";
import QuestionContainer from "./components/organisms/donor/questionnaire/QuestionContainer";
import QuestionContainerTwo from "./components/organisms/donor/questionnaireTwo/QuestionContainer";
import FAQ from "./pages/donor/faq";
import CongratulateScreen from "./pages/donor/congrats-screen";
import EduMaterial from "./components/organisms/donor/quickSetup/donor/EduMaterial";
import AccountTypePage from "./pages/donor/account-type";
import WelcomePage from "./pages/donor/welcome";
import MoreInfoPage from "./pages/donor/more-Info";
import BasicLayout from "./layout/donor/BasicLayout";
import EducationalMaterialBlogHealtchCare from "./pages/admin/educationalMaterial/educationalMaterialHealthCare";
import NotificationsAdmin from "./pages/admin/notifications";
import { generateToken } from "./firebase/config";
// import { onMessage } from "firebase/messaging";
import { ToastContainer } from "react-toastify";
import { registerDevice } from "./api/deviceTokens";

function App() {
  async function getToken() {
    const notificationToken = localStorage.getItem("notification_token");
    if (notificationToken) return;
    const token = await generateToken();

    if (token) {
      await registerDevice("token", token, "WEB");
      localStorage.setItem("notification_token", token);
    }
  }
  useEffect(() => {
    void getToken();

    // onMessage(messaging, (payload: any) => {
    //   toast.success(payload?.notification?.title);
    //   console.log("payload", payload);
    // });
  }, []);
  useEffect(() => {
    if (window.location.pathname === "/") window.location.replace("/login");
  }, [1]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        {/* Admin */}
        <Route path="/admin" element={<Rootlayout />}>
          <Route index element={<Dasboard />} />
          <Route path="/admin/payments" element={<Payments />} />
          <Route
            path="/admin/payments/invoice/:invoiceId"
            element={<Invoice />}
          />
          <Route
            path="/admin/donor-applications"
            element={<DonorApplications />}
          />
          <Route
            path="/admin/donor-applications/:name/:donorName"
            element={<DonorApplicationIndividual />}
          />
          <Route
            path="/admin/educational-material"
            element={<EducationalMaterial />}
          />
          <Route
            path="/admin/add-educational-material"
            element={<AddEducationalMaterial />}
          />
          <Route
            path="/admin/educational-material/educational-material-article/:articleId"
            element={<EducationalMaterialBlog />}
          />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/notifications" element={<NotificationsAdmin />} />
        </Route>

        {/* Donor */}
        <Route path="/donor" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/donor/my-profile" element={<Profile />} />
          <Route
            path="/donor/stem-cell-packages"
            element={<StemCellPackages />}
          />
          <Route
            path="/donor/stem-cell-packages/tracker/:packageId"
            element={<StemCellPackagesInvoicePage />}
          />
          <Route
            path="/donor/stem-cell-packages/empty"
            element={<EmptyStatePage />}
          />
          <Route path="/donor/payments" element={<DonorPayments />} />
          <Route
            path="/donor/payments/invoice/:invoiceId"
            element={<DonorInvoice />}
          />
          <Route
            path="/donor/educational-material"
            element={<DonorEducationalMaterial />}
          />
          <Route
            path="/donor/educational-material/educational-material-article/:articleId"
            element={<EducationalMaterialBlogHome />}
          />
          <Route path="/donor/contact-us" element={<ContactUs />} />
          <Route path="/donor/notifications" element={<Notifications />} />
          <Route path="/donor/eligible-screen" element={<EligibleScreen />} />
          <Route path="/donor/consent-form" element={<ConsentForm />} />
          <Route path="/donor/checkout" element={<CheckOut />} />
        </Route>

        {/* Health-Care */}
        <Route path="/health-care" element={<HealthCareLayout />}>
          <Route index element={<HealthCareHome />} />
          <Route
            path="/health-care/educational-material"
            element={<EducationalMaterialHealthCare />}
          />
          <Route
            path="/health-care/educational-material/educational-material-article/:articleId"
            element={<EducationalMaterialBlogHealtchCare />}
          />
          <Route path="/health-care/contact-us" element={<ContactUs />} />
        </Route>

        {/* Quick Setup */}
        <Route path="/quick-setup" element={<QuickSetupLayout />}>
          <Route index element={<DonorQuickSetup />} />
          <Route
            path="/quick-setup/health-care-professional"
            element={<HealthCareProfessionalQuickSetup />}
          />
          <Route
            path="/quick-setup/questionnaire"
            element={<QuestionContainer />}
          />
          <Route
            path="/quick-setup/questionnaire-2"
            element={<QuestionContainerTwo />}
          />
          <Route path="/quick-setup/donor-education/faq" element={<FAQ />} />
          <Route
            path="/quick-setup/congratulate-screen"
            element={<CongratulateScreen />}
          />
          <Route path="/quick-setup/edu-material" element={<EduMaterial />} />
        </Route>

        {/* Basic Layout */}

        <Route path="/basic-layout" element={<BasicLayout />}>
          {/* <Route
            path="/basic-layout/more-information-about-educational-materials"
            element={<EducationalMaterialsQuickSetup />}
          /> */}
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/account-type" element={<AccountTypePage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="/more-information-of-stem-cell-banking"
          element={<MoreInfoPage />}
        />
      </Route>
    )
  );

  const [locale, setLocale] = useState(i18n.language);

  i18n.on("languageChanged", (_lng) => setLocale(i18n.language));

  return (
    <div>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <RouterProvider router={router} />
      </LocaleContext.Provider>
      <ToastContainer containerId={"friendRequest"} />
    </div>
  );
}

export default App;
