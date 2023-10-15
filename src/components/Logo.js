import { constants } from "../utils/constants";
import logoAtom from "../recoil/logo/atom";
import { useRecoilValue } from "recoil";

const Logo = ({ width, height }) => {
  const logostatus=useRecoilValue(logoAtom);
  return (
    <img
      //src={constants.hospital_logo}
      src={logostatus?constants.hospital_logo:constants.hospital_logo2}
      alt={constants.name}
      width={width}
      height={height}
    />
  );
};

export default Logo;
