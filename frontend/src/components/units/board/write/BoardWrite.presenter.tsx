import {
  AddImgBox,
  AddImgContent,
  ButtonSection,
  ColumnBox,
  ContentSection,
  CTButtonFilled,
  CTInput,
  CTLabel,
  CTRadio,
  CTTextArea,
  EmotionContainer,
  EmotionWrap,FileInput,
  InlineBlockBox,
  RadioBox,
  RowBox,
  TitleSection,
  ValidErrMsg,
} from "@/src/components/units/board/write/BoardWriter.styles";
import { type IBoardWriteUIProps } from "@/src/components/units/board/write/BoardWrite.types";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";
import BoardImg from "@/src/components/units/board/write/BoardImg.container";

export default function BoardWriteUI(props: IBoardWriteUIProps): JSX.Element {
  return (
    <EmotionWrap>
      <EmotionContainer>
        <TitleSection>게시물 {props.isEdit ? "수정" : "등록"}</TitleSection>
        <ContentSection>
          <ColumnBox>
            <RowBox>
              <CTLabel htmlFor="writer">작성자</CTLabel>
              <CTInput
                id="writer"
                type="text"
                placeholder="이름을 적어주세요."
                onChange={(e) => {
                  props.onChangeValue("writer", e);
                }}
                defaultValue={props.data?.fetchBoard.writer ?? ""}
                readOnly={Boolean(props.data?.fetchBoard.writer)}
              />
              {props.values.writer.error !== "" && <ValidErrMsg>{props.values.writer.error}</ValidErrMsg>}
            </RowBox>
            <RowBox>
              <CTLabel htmlFor="password">비밀번호</CTLabel>
              <CTInput
                id="password"
                type="text"
                placeholder="비밀번호를 입력해주세요."
                onChange={(e) => {
                  props.onChangeValue("password", e);
                }}
              />
              {props.values.password.error !== "" && <ValidErrMsg>{props.values.password.error}</ValidErrMsg>}
            </RowBox>
          </ColumnBox>
          <ColumnBox>
            <RowBox>
              <CTLabel htmlFor="title">제목</CTLabel>
              <CTInput
                id="title"
                type="text"
                placeholder="제목을 작성해주세요."
                onChange={(e) => {
                  props.onChangeValue("title", e);
                }}
                defaultValue={props.data?.fetchBoard.title ?? ""}
              />
              {props.values.title.error !== "" && <ValidErrMsg>{props.values.title.error}</ValidErrMsg>}
            </RowBox>
          </ColumnBox>
          <ColumnBox>
            <RowBox>
              <CTLabel htmlFor="description">내용</CTLabel>
              <CTTextArea
                id="description"
                placeholder="내용을 작성해주세요."
                onChange={(e) => {
                  props.onChangeValue("description", e);
                }}
                defaultValue={props.data?.fetchBoard.contents ?? ""}
              />
              {props.values.description.error !== "" && <ValidErrMsg>{props.values.description.error}</ValidErrMsg>}
            </RowBox>
          </ColumnBox>
          <ColumnBox>
            <RowBox>
              <CTLabel>주소</CTLabel>
              <InlineBlockBox>
                <CTInput
                  type="text"
                  placeholder="07250"
                  width="77px"
                  readOnly
                  value={props.address?.zipcode !== "" ? props.address.zipcode : props.data?.fetchBoard.boardAddress?.zipcode ?? ""}
                />
                <CTButtonFilled
                  onClick={props.onToggleModal}
                  type="button"
                  margin="0 0 0 16px"
                  color="var(--white)"
                  bgColor="var(--black)"
                  padding="16px"
                >
                  우편번호 검색
                </CTButtonFilled>
              </InlineBlockBox>
              <InlineBlockBox>
                <CTInput
                  type="text"
                  readOnly
                  value={props.address?.address !== "" ? props.address.address : props.data?.fetchBoard.boardAddress?.address ?? ""}
                />
              </InlineBlockBox>
              <InlineBlockBox>
                <CTInput
                  type="text"
                  onChange={(e) => props.onSetAddressDetail(e.target.value)}
                  value={props.address?.addressDetail !== "" ? props.address.addressDetail : props.data?.fetchBoard.boardAddress?.addressDetail ?? ""}
                />
              </InlineBlockBox>
            </RowBox>
          </ColumnBox>
          <ColumnBox>
            <RowBox>
              <CTLabel htmlFor="youtubeUrl">유튜브</CTLabel>
              <CTInput
                id="youtubeUrl"
                type="text"
                placeholder="링크를 복사해주세요."
                defaultValue={props.data?.fetchBoard.youtubeUrl ?? ""}
                onChange={(e) => {
                  props.onChangeValue("youtubeUrl", e);
                }}
              />
            </RowBox>
          </ColumnBox>
          <ColumnBox>
            <RowBox>
              <CTLabel>사진첨부</CTLabel>
              <InlineBlockBox>
								{
									new Array(3).fill(0).map((_, idx) => (
										<BoardImg
										  key={idx}
											onSetImgUrls={props.onSetImgUrls}
											onDeleteFile={props.onDeleteFile}
										  idx={idx}
										  item={props.imgUrl?.[idx]}
										/>
									))
								}
              </InlineBlockBox>
            </RowBox>
          </ColumnBox>
          <ColumnBox>
            <RowBox>
              <CTLabel>메인설정</CTLabel>
              <InlineBlockBox>
                <RadioBox>
                  <CTRadio
                    name="mainType"
                    type="radio"
                    id="youtube"
                    value="youtube"
                    onChange={(e) => {
                      props.onChangeValue("mainType", e);
                    }}
                    checked
                  />
                  <CTLabel htmlFor="youtube">유튜브</CTLabel>
                </RadioBox>
                <RadioBox>
                  <CTRadio
                    name="mainType"
                    type="radio"
                    id="picture"
                    value="picture"
                    onChange={(e) => {
                      props.onChangeValue("mainType", e);
                    }}
                  />
                  <CTLabel htmlFor="picture">사진</CTLabel>
                </RadioBox>
              </InlineBlockBox>
            </RowBox>
          </ColumnBox>
          <ButtonSection>
            <CTButtonFilled
              color="var(--black)"
              onClick={() => {
                props.onUploadBoard(props.isEdit);
              }}
              isActive={props.isActive}
            >
              {props.isEdit ? "수정" : "등록"}하기
            </CTButtonFilled>
          </ButtonSection>
        </ContentSection>

        {props.isModalOpen && (
          <Modal open={props.isModalOpen} onOk={props.onToggleModal} onCancel={props.onToggleModal}>
            <DaumPostcodeEmbed onComplete={props.onSetAddress} {...props} />
          </Modal>
        )}
      </EmotionContainer>
    </EmotionWrap>
  );
}
