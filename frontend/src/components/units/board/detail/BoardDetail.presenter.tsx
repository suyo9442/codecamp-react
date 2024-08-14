import {
  Avatar,
  AvatarWrapper,
  Body,
  BottomWrapper,
  Button,
  CardWrapper,
  Contents,
  Header,
  Info,
  Title,
  YouTube,
  ToolTips,ImgWrapper,
} from "@/src/components/units/board/detail/BoardDetail.styles";
import { type IBoardDetailUIProps } from "./BoardDetail.types";
import ReactPlayer from "react-player";
import { formatCreatedAt } from "@/src/commons/utils/FormatDate";
import { Tooltip } from "antd";

export default function BoardDetailUI(props: IBoardDetailUIProps): JSX.Element {
  return (
    <>
      <CardWrapper>
        <Header>
          <AvatarWrapper>
            <Avatar src="/images/avatar.png" />
            <Info>
              <span>{props?.data?.fetchBoard?.writer}</span>
              <span>{formatCreatedAt(props?.data?.fetchBoard?.createdAt)}</span>
            </Info>
            <ToolTips>
              <img src="/images/link.svg" alt="" />
              <Tooltip
                title={
                  <div>
                    <p>{props?.data?.fetchBoard?.boardAddress?.address}</p>
                    <p>{props?.data?.fetchBoard?.boardAddress?.addressDetail}</p>
                  </div>
                }
              >
                <img src="/images/pin.svg" alt="" />
              </Tooltip>
            </ToolTips>
          </AvatarWrapper>
        </Header>
        <Body>
          <Title>{props?.data?.fetchBoard?.title}</Title>
          <Contents>
            {props?.data?.fetchBoard?.contents}
            
            <ImgWrapper>
	            {
								props?.data?.fetchBoard?.images &&
								props.data?.fetchBoard?.images?.map((list, idx) => (
						      <img
						        key={idx}
	                  src={`https://storage.googleapis.com/${list}`}
	                  alt={`uploaded-img-${idx}`}  // alt 속성 추가 (선택 사항)
	                />
								))
	            }
						</ImgWrapper>
            {props?.data?.fetchBoard?.youtubeUrl !== "" && (
              <YouTube>
                <ReactPlayer url={props?.data?.fetchBoard?.youtubeUrl ?? ""} width="486px" height="240px" />
              </YouTube>
            )}
					</Contents>
        </Body>
      </CardWrapper>
      <BottomWrapper>
        <Button onClick={props.onMoveToBoardList}>목록으로</Button>
        <Button onClick={props.onMoveToBoardEdit}>수정하기</Button>
      </BottomWrapper>
    </>
  );
}
