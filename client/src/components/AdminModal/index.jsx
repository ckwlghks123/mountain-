import React from "react";

import * as S from "./styles";

const AdminModal = ({
  className,
  onClose,
  maskClosable,
  visible,
  text,
  subText,
  buttonText,
  buttonOnClick,
}) => {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const cancelOnClick = () => {
    onClose();
  };

  return (
    <>
      <S.ModalOverlay visible={visible} />
      <S.ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex={-1}
        visible={visible}
      >
        <S.ModalInner tabIndex={0} className="modal-inner">
          <S.InnerContainer>
            <S.TextContainer>{text}</S.TextContainer>
            <S.SubTextContainer>{subText}</S.SubTextContainer>
            <S.ButtonContainer>
              <S.LeftButton onClick={cancelOnClick}>취소</S.LeftButton>
              <S.RightButton onClick={buttonOnClick}>
                {buttonText}
              </S.RightButton>
            </S.ButtonContainer>
          </S.InnerContainer>
        </S.ModalInner>
      </S.ModalWrapper>
    </>
  );
};

export default AdminModal;
