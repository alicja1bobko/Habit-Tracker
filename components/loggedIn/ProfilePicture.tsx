import Image from "next/image";
import React from "react";

type Props = {};
let completed = 20;

const ProfilePicture = (props: Props) => {
  return (
    <div className="p-3">
      <div className="w-[140px] h-[140px] bg-white rounded-full absolute -translate-x-[5px] -translate-y-[5px] z-20"></div>
      <div
        className="w-[150px] h-[150px] rounded-full absolute -translate-x-[10px] -translate-y-[10px] z-10"
        style={{
          backgroundImage: `conic-gradient(#f05100 ${completed}%,transparent 0%)`,
        }}
      ></div>
      <div className="w-[152px] h-[152px] bg-[#fcfbf9] rounded-full absolute -translate-x-[11px] -translate-y-[11px] z-5"></div>
      <Image
        alt="Profile photo"
        width={130}
        height={130}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBcg5OV7m4Ojt-6P7o0JwzgBcZosZwisJw0A&usqp=CAU"
        objectFit="cover"
        className="rounded-full relative z-20"
      />
    </div>
  );
};

export default ProfilePicture;
