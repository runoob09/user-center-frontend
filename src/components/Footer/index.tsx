import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined />
              runoob09
            </>
          ),
          href: 'https://github.com/runoob09/user-center-frontend',
          blankTarget: true,
        }
      ]}
    />
  );
};

export default Footer;
