import useSWR from "swr";
import { useSpaceX, fetcher } from "../utils/use-space-x";

export const useTimeZoneFinder = (siteId) => {
  const { data } = useSpaceX("/launchpads");
  const site = data?.find((launchPad) => launchPad.site_id === siteId);
  const latitude = site?.location.latitude;
  const longitude = site?.location.longitude;
  const APIresponse = useSWR(
    latitude && longitude
      ? `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=1331766000&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      : null,
    fetcher
  );
  if (APIresponse.data?.errorMessage) console.log(APIresponse.data);
  return APIresponse.data?.timeZoneId;
};
