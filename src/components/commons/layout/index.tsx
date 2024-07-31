import React ,{useState}from 'react';
import { Carousel, Menu } from 'antd';
import { MoneyCollectOutlined, PicLeftOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd'; import styled from "@emotion/styled";

interface ILayoutProps {
    children: JSX.Element
}
const SlideImgBox = styled.div`
  height: 400px;
  overflow: hidden;
  
  > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
  }
`
const MenuWrap = styled(Menu)`
  border-bottom: 1px solid var(--grey-100);
  display: flex;
  justify-content: center;
`

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    label: '자유게시판',
    key: 'freeBoard',
    icon: <PicLeftOutlined />,
  },
  {
    label: '중고마켓',
    key: 'fleaMarket',
    icon: <MoneyCollectOutlined />,
  },
  {
    label: '마이페이지',
    key: 'myPage',
    icon: <UserOutlined />,
  },
];

export default function Layout(props: ILayoutProps): JSX.Element {
      const [current, setCurrent] = useState('mail');

      const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
      };

    return (
        <>
            <Carousel
                autoplay
                draggable
                arrows
                infinite={true}
            >
                <SlideImgBox>
                    <img src="/images/banner01.jpeg"/>
                </SlideImgBox>
            </Carousel>

            <MenuWrap
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
            />
            <div>{props.children}</div>
            <div>푸터</div>
        </>
    )
}
