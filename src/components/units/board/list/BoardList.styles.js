import styled from "@emotion/styled";

export const Wrap = styled.div`
    width: 1200px;
    margin: 100px auto;
`
export const BestBoardsWrap = styled.div``
export const TableWrap = styled.div``
export const BestBoardsSec = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 24px;
    padding: 0 0 32px 0;
`
export const SearchSec = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 32px;
    padding: 32px 0;
`
export const BoardsSec = styled.table`
    width: 100%;
    border-top: 1px solid var(--black);
    border-bottom: 1px solid var(--black);
    border-collapse: collapse;
`
export const PaginationSec = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 36px 0;
`
export const Title = styled.div`
    padding: 32px 0;
    display: flex;
    justify-content: center;
    font-size: 3.6rem;
    font-weight: 700;
`
/*베스트 게시글*/
export const BestBoardsBox = styled.div`
    border-radius: 20px;
    height: 257px;
    flex: 4;
    box-shadow: 5px 5px 10px 0 #0000001A;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    cursor: pointer;
`
export const BestBoardTop = styled.div`
    background: beige;
    flex: 1;
`
export const BestBoardBottom = styled.div`
    flex: 1.1;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const BBTitle = styled.div`
    font-size: 1.8rem;
    margin-bottom: 16px;
`
export const BBDesc = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    > div {
        display: block;
    }
`
export const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
    img {
        width: 24px;
        height: 24px;
    }
`
export const Date = styled.div`
    font-size: 1.2rem;
`
export const ButtonLike = styled.button`
    > svg, em {
        transition: all 0.2s;
    }
    &:hover > svg, &:hover > em {
        stroke-width: var(--yellow-100);
        color: var(--yellow-100);
    }
`
/*검색창*/
export const SearchInput = styled.input`
    border-radius: 10px;
    background: var(--grey-300);
    height: 52px;
    flex: 3;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 16px;
    font-size: 1.6rem;
`
export const DateInput = styled.input`
    height: 52px;
    flex: 2;
    border: 1px solid var(--grey-100); 
    color: var(--grey-100);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 16px;
    font-size: 1.6rem;
`
/*게시글*/
export const BoardTr = styled.tr`
    border-bottom: 1px solid var(--grey-100);
    transition: all 0.1s;
    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`
export const BoardTh = styled.th`
    width: ${props => props.width || 'auto'};
    padding: 16px 0;
`
export const BoardTd = styled.td`
    width: ${props => props.width || 'auto'};
    padding: 16px 0;
    text-align: center;
    cursor: pointer;
`
/*페이지네이션*/
export const PaginationBox = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`
export const Pagination = styled.ul`
    display: flex;
    font-size: 1.6rem;

    li {
        
        &.active > button {
            font-weight: 700;
            color: var(--yellow-100);
        }
        &:hover > button {
            font-weight: 700;
        }
    }
    
    li > button {
        padding: 12px;
        transition: all 0.2s;
    }
`
export const ButtonArrow = styled.button`
    position: relative;
    padding: 16px;
    &::after {
        content: '';
        width: 8px;
        height: 8px;
        border-top: 2px solid #121212; 
        border-right: 2px solid #121212;
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: ${props => props.arrow === 'right' ? 'translate(-50%, -50%) rotate(45deg)' : 'translate(-50%, -50%) rotate(225deg)'};
        transition: all 0.2s;
    }

    &:hover::after {
    border-color: var(--yellow-100); /* hover 시 border 색상 변경 */
    }
`;

/*common*/
export const ButtonFilled = styled.button`
    height: 52px;
    background: var(--black);
    color: var(--white);  
    border-radius: 10px;
    padding: 14px 16px;
`
export const ButtonOutlined = styled.button`
    height: 52px;
    border: 1px solid var(--grey-100);
    color: var(--black);
    border-radius: 10px;
    padding: 14px 16px;
    margin-left: auto;
`


