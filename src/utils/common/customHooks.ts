import { useEffect } from "react";
import { generateToken } from "../../firebase/config";
import { registerDevice } from "../../api/deviceTokens";

export function useNotificationToken() {
  useEffect(() => {
    let isMounted = true; // Flag to track component mounting state

    async function getToken() {
      const notificationToken = localStorage.getItem("notification_token");
      if (!notificationToken) {
        const token = await generateToken();

        if (isMounted && token) {
          await registerDevice("token", token, "WEB");
          localStorage.setItem("notification_token", token);
        }
      }
    }

    void getToken();

    // Cleanup function to cancel any pending tasks when component unmounts
    return () => {
      isMounted = false; // Mark component as unmounted
    };
  }, []);
}
