import React from "react";
import {Menu} from "antd";
import {PicLeftOutlined,MoneyCollectOutlined,UserOutlined} from '@ant-design/icons';
import type { GetProp, MenuProps } from 'antd';
import styled from "@emotion/styled"; import {useRouter} from "next/router";

const SideBar = styled(Menu)`
    position: fixed;
    top: 50px;
    left: 0;
    height: 100vh;
    z-index: 999;
    width: 160px !important;
    padding: 6px;
    
    > .ant-menu-item-selected {
      color: #ff676e !important;
      background: rgba(255, 124, 131, 0.2);
    }
`
type MenuItem = GetProp<MenuProps, 'items'>[number];
const items: MenuItem[] = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: '마이페이지',
        },
        {
            key: '2',
            icon: <PicLeftOutlined />,
            label: '자유게시판',
        },
        {
            key: '3',
            icon: <MoneyCollectOutlined />,
            label: '중고마켓',
        },
];

export default function LayoutSidebar(): JSX.Element {
	const router = useRouter();
	const onNavigate = (e: { key: string }) => {
    // 예: 페이지 이동 처리
    switch (e.key) {
        case '1': return router.push('/boards')
        case '2': return router.push('/boards')
        case '3': return router.push('/boards')
    }
};
	
  return (
      <SideBar
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          items={items}
          onClick={onNavigate}
      />
  )
}
