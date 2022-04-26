import React, { memo, useEffect } from "react";
import { Text } from "react-native";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { ScreenWrapper } from "@/common/CommonStyles";
import { useAsyncFn } from "@/hooks";
import { requestPracticeDetail } from "@/store/home/function";
import { useNavigationParams } from "@/hooks/useNavigationParams";
import { usePractice } from "@/store/home";

export interface PracticeDetailProps {
  practiceId: string;
}

export const PracticeDetailScreen = memo(function PracticeDetailScreen() {
  const { practiceId } = useNavigationParams<PracticeDetailProps>();
  const practice = usePractice(practiceId);
  const [{ loading }, getData] = useAsyncFn(async () => {
    await requestPracticeDetail(practiceId);
  }, [practiceId]);

  useEffect(() => {
    getData();
  }, []);

  console.log("practice", practice);
  return (
    <ScreenWrapper>
      <DynamicHeader title={"PracticeDetailScreen"} />
      <Text>assds</Text>
    </ScreenWrapper>
  );
});

export default PracticeDetailScreen;
