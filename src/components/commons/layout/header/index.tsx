import React ,{useState}from "react";
import {Menu, type MenuProps} from "antd";
import styled from "@emotion/styled";
import {LogoutOutlined, LoginOutlined} from "@ant-design/icons"; import {useRouter} from "next/router";

const MenuWrap = styled(Menu)`
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: end;
  //background: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  padding: 0 16px;
  height: 50px;
  
  >li:first-of-type:after {
    display: none;
  }
  >li:hover:after {
    border-bottom-color: #ff7c83 !important;
  }
  >.ant-menu-item-selected {
    color: var(--main) !important;
  }
  >.ant-menu-item-selected:after {
    border-bottom-color: #ff7c83 !important;
  }
`
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    label: '',
    key: 'home',
    style: {
      background: "url('/images/logo.png') center center no-repeat",
      backgroundSize: "contain", // Use contain to make sure the image fits within the container without being cropped
      width: '120px',
      display: 'flex', // To center the content if needed
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 'auto',
    }
  },
  {
    label: '로그인',
    key: 'login',
    icon: <LoginOutlined />,
  },
  {
    label: '로그아웃',
    key: 'logout',
    icon: <LogoutOutlined />,
  },
];

export default function LayoutHeader(): JSX.Element {
    const router = useRouter();
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
        console.log(e.key)

        switch (e.key) {
            case 'home': return router.push('/boards')
            case 'login': return router.push('/auth/signIn')
        }
    };

    return (
        <MenuWrap
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    )
}
