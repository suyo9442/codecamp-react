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
    TitleSection, ValidErrMsg
} from "@/styles/emotions/boardNew";
import {useEffect, useState} from "react";

export default function BoardNewPage() {
    const [values, setValues] = useState({
        writer: {value: '', error: '',},
        password: {value: '', error: '',},
        title: {value: '', error: '',},
        description: {value: '', error: '',},
        address1: {value: ''},
        address2: {value: ''},
        address3: {value: ''},
        youtubeUrl: {value: ''},
        picture: [],
        mainType: {value: 'youtube'},
    });
    const [isValid, setIsValid] = useState(false);

    const onChangeValue = (name, e) => {
        setValues(prevValues => ({
            ...prevValues,
            [name]: {
                ...prevValues[name],  // 기존의 값 유지
                value: e.target.value  // value 업데이트
            }
        }));
    }
    const onUploadBoard = () => {
        setValues(prevValues => {
            const newValues = { ...prevValues };

            Object.keys(newValues).forEach(key => {
                if (!newValues[key].value) {
                    newValues[key].error = '내용을 입력해주세요';
                } else {
                    newValues[key].error = '';  // 값이 있는 경우 오류를 제거합니다.
                }
            });

            return newValues;
        });

        const validKey = ['writer', 'password', 'title', 'description'];
        const isValid = validKey.every(key => values[key]?.value)
        if(isValid) {
            alert('등록 성공!')
        }
    }

    return (
        <EmotionWrap>
            <EmotionContainer>
                <TitleSection>게시물 등록</TitleSection>
                <ContentSection>
                    <ColumnBox>
                        <RowBox>
                            <CTLabel id='writer'>작성자</CTLabel>
                            <CTInput htmlfor='writer' type='text' placeholder='이름을 적어주세요.' onChange={(e) => onChangeValue('writer', e)} />
                            {values?.writer?.error && <ValidErrMsg>{values?.writer?.error}</ValidErrMsg>}
                        </RowBox>
                        <RowBox>
                            <CTLabel id='password'>비밀번호</CTLabel>
                            <CTInput htmlfor='password' type='text' placeholder='비밀번호를 입력해주세요.' onChange={(e) => onChangeValue('password', e)} />
                            {values.password.error && <ValidErrMsg>{values.password.error}</ValidErrMsg>}
                        </RowBox>
                    </ColumnBox>
                    <ColumnBox>
                        <RowBox>
                            <CTLabel id='title'>제목</CTLabel>
                            <CTInput htmlfor='title' type='text' placeholder='제목을 작성해주세요.' onChange={(e) => onChangeValue('title', e)} />
                            {values.title.error && <ValidErrMsg>{values.title.error}</ValidErrMsg>}
                        </RowBox>
                    </ColumnBox>
                    <ColumnBox>
                        <RowBox>
                            <CTLabel id='description'>내용</CTLabel>
                            <CTTextArea htmlfor='description' type='text' placeholder='내용을 작성해주세요.' onChange={(e) => onChangeValue('description', e)} />
                            {values.description.error && <ValidErrMsg>{values.description.error}</ValidErrMsg>}
                        </RowBox>
                    </ColumnBox>
                    <ColumnBox>
                        <RowBox>
                            <CTLabel>주소</CTLabel>
                            <InlineBlockBox>
                                <CTInput type='text' placeholder='07250' width='77px' onChange={(e) => onChangeValue('address1', e)} />
                                <CTButtonFilled type='button' margin='0 0 0 16px' color='var(--white)' bgColor='var(--black)' padding='16px'>우편번호 검색</CTButtonFilled>
                            </InlineBlockBox>
                            <InlineBlockBox>
                                <CTInput type='text' onChange={(e) => onChangeValue('address2', e)} />
                            </InlineBlockBox>
                            <InlineBlockBox>
                                <CTInput type='text' onChange={(e) => onChangeValue('address3', e)} />
                            </InlineBlockBox>
                        </RowBox>
                    </ColumnBox>
                    <ColumnBox>
                        <RowBox>
                            <CTLabel id='youtubeUrl'>유튜브</CTLabel>
                            <CTInput htmlfor='youtubeUrl' type='text' placeholder='링크를 복사해주세요.' onChange={(e) => onChangeValue('youtubeUrl', e)} />
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
                                    <CTRadio name='mainType' type='radio' id='youtube' value='youtube' onChange={(e) => onChangeValue('mainType', e)} checked />
                                    <CTLabel htmlFor='youtube'>유튜브</CTLabel>
                                </RadioBox>
                                <RadioBox>
                                    <CTRadio name='mainType' type='radio' id='picture' value='picture' onChange={(e) => onChangeValue('mainType', e)} />
                                    <CTLabel htmlFor='picture'>사진</CTLabel>
                                </RadioBox>
                            </InlineBlockBox>
                        </RowBox>
                    </ColumnBox>
                    <ButtonSection>
                        <CTButtonFilled type='button' color='var(--black)' onClick={onUploadBoard}>등록하기</CTButtonFilled>
                    </ButtonSection>
                </ContentSection>
            </EmotionContainer>
        </EmotionWrap>
    )
}
