import {Footer} from '@/components';
import {login} from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,

} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
// @ts-ignore
import {Helmet, history, useModel} from '@umijs/max';
import {message, Tabs} from 'antd';
import {createStyles} from 'antd-style';
import React, {useState} from 'react';
import {flushSync} from 'react-dom';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(({token}) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});
const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const {styles} = useStyles();
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s: any) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    // try {
    //   // 登录
    //   const msg = await login({
    //     ...values,
    //     type,
    //   });
    //   if (msg.status === 'ok') {
    //     const defaultLoginSuccessMessage = '登录成功！';
    //     message.success(defaultLoginSuccessMessage);
    //     await fetchUserInfo();
    //     const urlParams = new URL(window.location.href).searchParams;
    //     history.push(urlParams.get('redirect') || '/');
    //     return;
    //   }
    //   console.log(msg);
    //   // 如果失败去设置用户错误信息
    //   setUserLoginState(msg);
    // } catch (error) {
    //   const defaultLoginFailureMessage = '登录失败，请重试！';
    //   console.log(error);
    //   message.error(defaultLoginFailureMessage);
    // }
    try {
      //登录
      const msg = await login({
        ...values,
        type,
      });
      if (msg !== null) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      console.log(msg);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.error(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg"/>}
          title="用户中心"
          subTitle={'最好用的用户管理平台'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              }
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={"请输入用户账户"}
                rules={[
                  {
                    required: true,
                    message: '用户账户是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <a
              style={{
                float: 'left',
              }}
            >
              忘记密码
            </a>
            <a
              style={{
                float: 'right',
              }}
              onClick={() => history.push('/user/register')}
            >
              没有账号？去注册
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Login;
