import { Button, Typography, Icon } from "~/components";
import { Modal } from "antd";
import { track } from "~/analytics";
import styled from "@emotion/styled";
import { useSurveyModal } from "./state";

const StyledModal = styled(Modal)({
  ".ant-modal-body": {
    paddingTop: 16,
  },
  ".ant-modal-footer": {
    display: "none",
  },
});

export const SurveyModal = () => {
  const { isOpen, closeModal: closeModal } = useSurveyModal();

  return (
    <StyledModal
      open={isOpen}
      title="New start for Zak"
      onCancel={() => {
        closeModal();
        track("Survey modal cancelled", {});
      }}
    >
      <Typography.Paragraph>I'm Building outside Pokémon.</Typography.Paragraph>

      <Button
        type="primary"
        trackerId="budget_app_survey_join_discord"
        icon={<Icon name="Discord" />}
        size="middle"
        href="https://discord.gg/nwMcqyf8Xs"
        mb={16}
      >
        Let's see what sticks!
      </Button>
    </StyledModal>
  );
};
