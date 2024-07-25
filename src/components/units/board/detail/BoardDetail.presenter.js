import {EmotionContainer, EmotionWrap} from "@/styles/emotions/boardNew";
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

export default function BoardDetailUI(props) {
    return (
        <EmotionWrap>
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
                <BottomWrapper>
                    <Button>목록으로</Button>
                    <Button>수정하기</Button>
                    <Button>삭제하기</Button>
                </BottomWrapper>
            </EmotionContainer>
        </EmotionWrap>
    );
}
