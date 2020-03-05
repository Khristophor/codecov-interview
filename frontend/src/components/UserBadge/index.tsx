import * as React from "react";
import styled from "styled-components";

interface Props {
  userName: string;
  serviceId: string;
}
const UserAvatar = ({ userName, serviceId }: Props) => {
  return (
    <Container>
      <Avatar
        alt="github avatar"
        src={`https://avatars0.githubusercontent.com/u/${serviceId}?v=3&s=48`}
      />
      {userName}
    </Container>
  );
};

export default UserAvatar;

const Container = styled.span`
  display: inline-flex;
  align-items: center;

  font-size: 13px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #25465a;
`;

const Avatar = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  margin: 0 0.5rem;
`;
