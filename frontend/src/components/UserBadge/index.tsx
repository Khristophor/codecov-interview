import * as React from "react";

interface Props {
  userName: string;
  serviceId: string;
}
const UserAvatar = ({ userName, serviceId }: Props) => {
  return (
    <span>
      {userName}
      <img
        alt="github avatar"
        src={`https://avatars0.githubusercontent.com/u/${serviceId}?v=3&s=48`}
      />
    </span>
  );
};

export default UserAvatar;
