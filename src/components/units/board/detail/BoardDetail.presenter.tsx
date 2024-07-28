import {EmotionContainer, EmotionWrap} from "@/src/components/units/board/write/BoardWriter.styles";
import {
    Avatar,
    AvatarWrapper,
    Body,
    BottomWrapper,
    Button,
    CardWrapper,
    Contents,
    CreatedAt,
    Header,
    Info,
    Title,
    Writer
} from "@/src/components/units/board/detail/BoardDetail.styles";
import { IBoardDetailUIProps } from "./BoardDetail.types";

export default function BoardDetailUI(props: IBoardDetailUIProps) {
    return (
        <>
            <EmotionWrap isShadow={true}>
                <EmotionContainer>
                    <CardWrapper>
                        <Header>
                            <AvatarWrapper>
                                <Avatar src="/images/avatar.png" />
                                <Info>
                                    <Writer>{props?.data?.fetchBoard?.writer}</Writer>
                                    <CreatedAt>
                                        {props?.data?.fetchBoard?.createdAt}
                                    </CreatedAt>
                                </Info>
                            </AvatarWrapper>
                        </Header>
                        <Body>
                            <Title>{props?.data?.fetchBoard?.title}</Title>
                            <Contents>{props?.data?.fetchBoard?.contents}</Contents>
                        </Body>
                    </CardWrapper>
                </EmotionContainer>
            </EmotionWrap>
            <EmotionWrap>
                <BottomWrapper>
                    <Button onClick={props.onMoveToBoardList}>목록으로</Button>
                    <Button onClick={props.onMoveToBoardEdit}>수정하기</Button>
                </BottomWrapper>
            </EmotionWrap>
        </>
    );
}
