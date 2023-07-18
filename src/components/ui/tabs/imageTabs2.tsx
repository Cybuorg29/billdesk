import { erpAssets } from "../../../images/ImageExport";

interface ImagetabObj {
  name: string;
  amount: any;
  logo: any;
  sign: any;
}
interface ImagetabsArray {
  array: ImagetabObj[];
}

const ImageTabs2 = ({ name, amount, logo, sign }: ImagetabObj) => {
  return (
    <div className="hover:scale-105  duration-150 cursor-pointer w-full h-full rounded-xl">
      <img
        className="w-full h-full  rounded-xl"
        src={erpAssets.tabBackground}
      ></img>
    </div>
  );
};

export default ImageTabs2;
