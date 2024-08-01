import type { FormProps } from 'antd';
import {type FieldType} from "@/src/components/units/ auth/signIn/siginIn.types";
import SignInUI from "@/src/components/units/ auth/signIn/siginIn.presenter";

export default function SignIn() :JSX.Element {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
      console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return (
        <SignInUI
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        />
    )
}
