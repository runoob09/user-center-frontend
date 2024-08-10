import {Footer} from '@/components';
import {login, register} from '@/services/ant-design-pro/api';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormCheckbox, ProFormText,} from '@ant-design/pro-components';
import type {ProFormInstance} from '@ant-design/pro-components';
// @ts-ignore
import {Helmet, history} from '@umijs/max';
import {message, Tabs} from 'antd';
import {createStyles} from 'antd-style';
import React, {useRef} from 'react';
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
const Register: React.FC = () => {
    const {styles} = useStyles();
    const formRef = useRef<ProFormInstance>()
    const handleSubmit = async (values: API.RegisterParams) => {
      try {
        //登录
        const msg = await register({
          ...values,
        });
        if (msg !== null) {
          // 回到登录页
          history.push("/user/login")
        }
      } catch (e) {
        // 提示注册失败
        message.error('注册失败，请重试！');
      }
    }
    return (
      <div className={styles.container}>
        <Helmet>
          <title>
            {'注册'}- {Settings.title}
          </title>
        </Helmet>
        <div
          style={{
            flex: '1',
            padding: '32px 0',
          }}
        >
          <LoginForm formRef={formRef}
                     contentStyle={{
                       minWidth: 280,
                       maxWidth: '75vw',
                     }}
                     logo={<img alt="logo" src="/logo.svg"/>}
                     title="用户中心注册"
                     subTitle={'最好用的用户管理平台'}
                     initialValues={{
                       autoLogin: true,
                     }}
                     onFinish={async (values) => {
                       await handleSubmit(values as API.LoginParams);
                     }}
                     submitter={{
                       searchConfig:{
                         submitText: '注册'
                       },
                     }}
          >
            <Tabs
              activeKey={"register"}
              centered
              items={[
                {
                  key: 'register',
                  label: '新用户注册',
                }
              ]}
            />
            <ProFormText
              name="userAccount"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined/>,
              }}
              placeholder={"请输入用户账户名"}
              rules={[
                {
                  required: true,
                  message: '用户账户名是必填项！',
                },
                {
                  pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{4,}$/,
                  message: '账户名必须包含至少一个字母和一个数字，且长度不小于4位',
                }
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
                {
                  pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/,
                  message: '密码必须包含至少一个小写字母、一个大写字母和一个数字，且长度不小于8位',
                }
              ]}
            />
            <ProFormText.Password
              name="checkPassword"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined/>,
              }}
              placeholder={'请再次输入密码'}
              rules={[
                {
                  required: true,
                  message: '密码是必填项！',
                }, {
                  validator: (_, value) => {
                    const userPassword = formRef?.current?.getFieldValue('userPassword');
                    console.log(userPassword)
                    if (!value || value !== userPassword) {
                      return Promise.reject(new Error('两次输入的密码不匹配!'));
                    }
                    return Promise.resolve();
                  }
                }
              ]}
            />
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <a
                style={{
                  float: 'right',
                }}
                onClick={() => history.push('/user/login')}
              >
                已有账号？去登录
              </a>
            </div>
          </LoginForm>
        </div>
        <Footer/>
      </div>
    );
  }
;
export default Register;
