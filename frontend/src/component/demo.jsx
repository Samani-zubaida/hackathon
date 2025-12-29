import { useEffect } from "react";
import { getPlaceImage } from "../utils/getImage.js";
function TestImage() {
  useEffect(() => {
    async function fetchImage() {
      const image = await getPlaceImage(
        "burger King"
      );
      console.log(image);
    }

    fetchImage();
  }, []);

  return <div>Check console</div>;
}
export default TestImage;