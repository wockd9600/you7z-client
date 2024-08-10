import React from "react";
import { ReactComponent as SettingIcon } from "../assets/icons/setting.svg";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: "setting";
}

const icons = {
    setting: SettingIcon,
};

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
    const SvgIcon = icons[name];

    if (!SvgIcon) {
        console.error(`Icon '${name}' not found.`);
        return null; // 아이콘을 찾지 못했을 때는 null을 반환하거나, 대체 요소를 반환
    }

    return <SvgIcon {...props} />;
};

export default Icon;
