/* eslint-disable @typescript-eslint/no-floating-promises */
import { t } from "i18next";
import LocationPicker from "../../../../assets/svg/locationPicker";
import { useEffect, useState } from "react";

interface GeoInfo {
  country?: string;
}

const LocationTrackerButton = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [geoInfo, setGeoInfo] = useState<GeoInfo>({});

  const getVisitorIpAddress = async () => {
    try {
      const res = await fetch("https:api.ipify.org");
      const data = await res.text();
      setIpAddress(data);
    } catch (error) {
      console.log("Failed to fetch IP: ", error);
    }
  };

  useEffect(() => {
    getVisitorIpAddress();
  }, []);

  const fetchIpInfo = async () => {
    try {
      const res = await fetch(`http://ip-api.com/json/${ipAddress}`);
      const data = await res.json();
      setGeoInfo(data);
    } catch (error) {
      console.log("Failed to fetch IP: ", error);
    }
  };

  console.log(geoInfo);

  return (
    <div className="flex flex-row items-center justify-center py-5 border-b-[1px] border-b-secondary">
      <button
        className=" bg-[#133419] flex flex-row px-12 py-3 w-fit gap-3 rounded-md"
        onClick={fetchIpInfo}
      >
        <LocationPicker />
        <span className=" text-white font-medium text-base">
          {t("pickCurrentLocation")}
        </span>
      </button>
    </div>
  );
};

export default LocationTrackerButton;
