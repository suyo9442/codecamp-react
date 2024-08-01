import {Wrap} from "@/src/components/units/board/list/BoardList.styles";
import {Container,Title} from "@/src/components/units/ auth/signIn/siginIn.styles";
import {Button, Checkbox, Form,Input} from "antd";
import React from "react";
import {type FieldType} from "@/src/components/units/ auth/signIn/siginIn.types";
import {type ValidateErrorEntity} from "rc-field-form/lib/interface";

interface ISignInUIProps {
  onFinish: (values: FieldType) => void;
  onFinishFailed: (errorInfo: ValidateErrorEntity<FieldType>) => void;
}

export default function SignInUI(props: ISignInUIProps): JSX.Element {
    return (
        <Wrap>
            <Container>
                <Title>로그인</Title>

                <Form
                    name="basic"
                    style={{ width: 300 }}
                    initialValues={{ remember: true }}
                    onFinish={props.onFinish}
                    onFinishFailed={props.onFinishFailed}
                    autoComplete="off"
                >
                <Form.Item<FieldType>
                  label=""
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input placeholder="ID" />
                </Form.Item>

                <Form.Item<FieldType>
                  label=""
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item<FieldType>
                  name="remember"
                  valuePropName="checked"
                  style={{marginTop: "-16px"}}
                >
                  <Checkbox >Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{width: "100%", height: "38px", background: "var(--main)"}}>
                    로그인
                  </Button>
                </Form.Item>
                </Form>
            </Container>
        </Wrap>
    )
}
