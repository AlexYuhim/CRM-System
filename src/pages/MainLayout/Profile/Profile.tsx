import { useAppDispatch, useAppSelector } from "@/ducks/hooks";
import { getProfile } from "@/ducks/user";
import { useEffect } from "react";
import { Typography } from "antd";
const { Title, Text, Paragraph } = Typography;

export function Profile() {
  const dispatch = useAppDispatch();

  const profile = useAppSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <Typography>
      <Title>{profile.username}</Title>
      <Paragraph>
        <Text strong>Email: </Text>
        <Text>{profile.email}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Телефон: </Text>
        <Text>{profile.phoneNumber}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Rokm: </Text>
        <Text>{profile.roles}</Text>
      </Paragraph>
    </Typography>
  );
}
