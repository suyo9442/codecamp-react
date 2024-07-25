import { EmotionWrap } from "@/src/components/units/board/write/BoardWriter.styles";
import {
    InputSec,
    Stars,
    Title,
    CommentBox,
    Avatar,
    CommentContent,
    UserInfo,
    Contents,
    CreatedAt,
    ActionButtons,
    InputBox,
    TextArea,
    SubmitBtn,
    TextLen
} from "@/src/components/units/board/comment/BoardComment.styles"
import StarIcon from "@/src/components/commons/StarIcon";
import CommentDeleteBtn from "@/src/components/commons/CommentDeleteBtn";
import CommentEditBtn from "@/src/components/commons/CommentEditBtn";

export default function BoardCommentUI(props) {
    return (
        <EmotionWrap isShadow={false}>
            <>
                <Title>
                    <img src='/images/comment.svg' />
                    댓글
                </Title>
                <InputSec>
                    <Stars>
                        {
                            props.stars?.map((star, idx) =>
                                <button key={idx} onClick={() => onSetStars(idx)} >
                                    <StarIcon fill={star} />
                                </button>
                            )
                        }
                    </Stars>
                    <InputBox>
                        <TextArea
                            placeholder={props.PLACE_HOLDER}
                            onChange={e => props.onSetValues('contents', e)}
                            value={props.values.contents}
                            maxLength={props.TXT_MAX_LENGTH}
                        />
                        <TextLen>{`${props.txtLen} / ${props.TXT_MAX_LENGTH}`}</TextLen>
                        <SubmitBtn onClick={props.onCreateBoardComment}>등록하기</SubmitBtn>
                    </InputBox>
                </InputSec>
                <>
                    {
                        props.comments?.map(list =>
                            <CommentBox key={list._id}>
                                <Avatar onClick={props.onDeleteBoardComment}>
                                    <img src='/images/avatar.png' alt='avatar' />
                                </Avatar>
                                <CommentContent>
                                    <UserInfo>
                                        <span>{list.writer}</span>
                                        <span>
                                            {[...Array(Math.floor(list.rating))].map((_, index) => (
                                                <StarIcon key={index} fill={true} />
                                            ))}
                                            {[...Array(5 - Math.floor(list.rating))].map((_, index) => (
                                                <StarIcon key={index} />
                                            ))}
                                        </span>
                                    </UserInfo>
                                    <Contents>
                                        {list.contents}
                                    </Contents>
                                    <CreatedAt>
                                        {list.createdAt}
                                    </CreatedAt>
                                </CommentContent>
                                <ActionButtons>
                                    <CommentEditBtn />
                                    <CommentDeleteBtn onDelete={() => props.onDeleteBoardComment(list._id)} />
                                </ActionButtons>
                            </CommentBox>
                        )
                    }
                </>
            </>
        </EmotionWrap>
    )
};
