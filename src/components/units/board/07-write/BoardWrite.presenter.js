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
    EmotionWrap,
    InlineBlockBox,
    RadioBox,
    RowBox,
    TitleSection,
    ValidErrMsg
} from "@/src/components/units/board/write/BoardWriter.styles";

export default function BoardWriteUI(props) {
        return (
            <EmotionWrap>
                <EmotionContainer>
                    <TitleSection>게시물 등록</TitleSection>
                    <ContentSection>
                        <ColumnBox>
                            <RowBox>
                                <CTLabel id='writer'>작성자</CTLabel>
                                <CTInput htmlfor='writer' type='text' placeholder='이름을 적어주세요.' onChange={(e) => props.onChangeValue('writer', e)} />
                                {props.values.writer.error && <ValidErrMsg>{props.values.writer.error}</ValidErrMsg>}
                            </RowBox>
                            <RowBox>
                                <CTLabel id='password'>비밀번호</CTLabel>
                                <CTInput htmlfor='password' type='text' placeholder='비밀번호를 입력해주세요.' onChange={(e) => props.onChangeValue('password', e)} />
                                {props.values.password.error && <ValidErrMsg>{props.values.password.error}</ValidErrMsg>}
                            </RowBox>
                        </ColumnBox>
                        <ColumnBox>
                            <RowBox>
                                <CTLabel id='title'>제목</CTLabel>
                                <CTInput htmlfor='title' type='text' placeholder='제목을 작성해주세요.' onChange={(e) => props.onChangeValue('title', e)} />
                                {props.values.title.error && <ValidErrMsg>{props.values.title.error}</ValidErrMsg>}
                            </RowBox>
                        </ColumnBox>
                        <ColumnBox>
                            <RowBox>
                                <CTLabel id='description'>내용</CTLabel>
                                <CTTextArea htmlfor='description' type='text' placeholder='내용을 작성해주세요.' onChange={(e) => props.onChangeValue('description', e)} />
                                {props.values.description.error && <ValidErrMsg>{props.values.description.error}</ValidErrMsg>}
                            </RowBox>
                        </ColumnBox>
                        <ColumnBox>
                            <RowBox>
                                <CTLabel>주소</CTLabel>
                                <InlineBlockBox>
                                    <CTInput type='text' placeholder='07250' width='77px' onChange={(e) => props.onChangeValue('address1', e)} />
                                    <CTButtonFilled type='button' margin='0 0 0 16px' color='var(--white)' bgColor='var(--black)' padding='16px'>우편번호 검색</CTButtonFilled>
                                </InlineBlockBox>
                                <InlineBlockBox>
                                    <CTInput type='text' onChange={(e) => props.onChangeValue('address2', e)} />
                                </InlineBlockBox>
                                <InlineBlockBox>
                                    <CTInput type='text' onChange={(e) => props.onChangeValue('address3', e)} />
                                </InlineBlockBox>
                            </RowBox>
                        </ColumnBox>
                        <ColumnBox>
                            <RowBox>
                                <CTLabel id='youtubeUrl'>유튜브</CTLabel>
                                <CTInput htmlfor='youtubeUrl' type='text' placeholder='링크를 복사해주세요.' onChange={(e) => props.onChangeValue('youtubeUrl', e)} />
                            </RowBox>
                        </ColumnBox>
                        <ColumnBox>
                            <RowBox>
                                <CTLabel>사진첨부</CTLabel>
                                <InlineBlockBox>
                                    {
                                        [1, 2, 3].map((item, idx) => (
                                            <AddImgBox key={idx}>
                                                <AddImgContent />
                                                Upload
                                            </AddImgBox>
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
                                        <CTRadio name='mainType' type='radio' id='youtube' value='youtube' onChange={(e) => props.onChangeValue('mainType', e)} checked />
                                        <CTLabel htmlFor='youtube'>유튜브</CTLabel>
                                    </RadioBox>
                                    <RadioBox>
                                        <CTRadio name='mainType' type='radio' id='picture' value='picture' onChange={(e) => props.onChangeValue('mainType', e)} />
                                        <CTLabel htmlFor='picture'>사진</CTLabel>
                                    </RadioBox>
                                </InlineBlockBox>
                            </RowBox>
                        </ColumnBox>
                        <ButtonSection>
                            <CTButtonFilled type='button' color='var(--black)' onClick={props.onUploadBoard} isActive={props.isActive}>등록하기</CTButtonFilled>
                        </ButtonSection>
                    </ContentSection>
                </EmotionContainer>
            </EmotionWrap>
        )
}
