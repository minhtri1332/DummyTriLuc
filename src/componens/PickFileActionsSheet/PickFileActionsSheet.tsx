import React, { memo } from "react";
import { PickFileActionsSheetProps } from "./types";
import PickFileContent from "./PickFileContent";
import {
  ActionSheetHeader,
  ActionSheetWrapper,
} from "@/componens/PickFileActionsSheet/ActionSheet";

const PickFileActionsSheet = memo(
  ({
    isVisible,
    onCloseRequest,
    onFilePicked,
    takeCameraOptions,
    pickImageOptions,
    pickFileOptions,
    title,
    includeTakeCamera = true,
    includePickFile = true,
    onPressDetect,
  }: PickFileActionsSheetProps) => {
    return (
      <ActionSheetWrapper isVisible={isVisible} onCloseRequest={onCloseRequest}>
        <ActionSheetHeader
          title={title || "Hành động"}
          onCloseRequest={onCloseRequest}
        />
        <PickFileContent
          onCloseRequest={onCloseRequest}
          onFilePicked={onFilePicked}
          pickFileOptions={pickFileOptions}
          pickImageOptions={pickImageOptions}
          takeCameraOptions={takeCameraOptions}
          includeTakeCamera={includeTakeCamera}
          includePickFile={includePickFile}
          onPressDetect={onPressDetect}
        />
      </ActionSheetWrapper>
    );
  }
);

PickFileActionsSheet.displayName = "PickFileActionsSheet";

export default PickFileActionsSheet;
