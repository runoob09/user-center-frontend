import {removeRule, searchUser} from '@/services/ant-design-pro/api';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {FooterToolbar, PageContainer, ProTable,} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Image, message} from 'antd';
import React, {useRef, useState} from 'react';

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.CurrentUser[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
        await removeRule({
            key: selectedRows.map((row) => row.id),
        });
        hide();
        message.success('Deleted successfully and will refresh soon');
        return true;
    } catch (error) {
        hide();
        message.error('Delete failed, please try again');
        return false;
    }
};
const TableList: React.FC = () => {
    /**
     * @en-US The pop-up window of the distribution update window
     * @zh-CN 分布更新窗口的弹窗
     * */
    const [, handleUpdateModalOpen] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [, setCurrentRow] = useState<API.CurrentUser>();
    const [selectedRowsState, setSelectedRows] = useState<API.CurrentUser[]>([]);

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */

    const columns: ProColumns<API.CurrentUser>[] = [
        {
            title: '用户id',
            dataIndex: 'id'
        },
        {
            title: '用户账户',
            dataIndex: 'userAccount'
        },
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '用户头像',
            search: false,
            render: (dom, row) => {
                return (<Image src={row.avatarUrl} width={50} height={50}></Image>)
            }
        },
        {
            title: '用户角色',
            dataIndex: 'userRole',
            valueEnum: {
                0: {text: '普通用户'},
                1: {text: '管理员'},
            },
        },
        {
            title: "用户状态",
            dataIndex: 'userStatus',
            valueEnum: {
                0: {text: '正常', status: 'success'},
                1: {text: '封禁', status: 'error'},
            },
        },
        {
            title: "用户性别",
            dataIndex: 'gender',
            valueEnum: {
                0: {text: '男'},
                1: {text: '女'},
                2: {text: '未知'},
            },
        }, {
            title: "用户电话",
            dataIndex: 'phoneNumber',
        }
        ,
        {
            title: '创建时间',
            sorter: true,
            dataIndex: 'createTime',
            valueType: 'dateTime',
            search: false
        },
        {
            title: '更新时间',
            sorter: true,
            dataIndex: 'updateTime',
            valueType: 'dateTime',
            search: false,
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    key={record.id}
                    onClick={() => {
                        handleUpdateModalOpen(true);
                        setCurrentRow(record);
                    }}
                >
                    编辑
                </a>,
                <a key={record.id} href="https://procomponents.ant.design/">
                    删除
                </a>,
            ],
        },
    ];
    return (
        <PageContainer>
            <ProTable<API.CurrentUser, API.PageParams>
                headerTitle={'查询表格'}
                actionRef={actionRef}
                rowKey="id"
                search={{
                    labelWidth: 120,
                }}
                request={async (params) => {
                    const userList = await searchUser(params);
                    if (userList === null) {
                        return {
                            data: []
                        }
                    }
                    return {
                        data: userList.data
                    }
                }}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows);
                    },
                }}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            已选择{' '}
                            <a
                                style={{
                                    fontWeight: 600,
                                }}
                            >
                                {selectedRowsState.length}
                            </a>{' '}
                            项 &nbsp;&nbsp;
                        </div>
                    }
                >
                    <Button
                        onClick={async () => {
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        批量删除
                    </Button>
                    <Button type="primary">批量审批</Button>
                </FooterToolbar>
            )}
        </PageContainer>
    );
};
export default TableList;
