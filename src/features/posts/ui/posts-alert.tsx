import React, {memo} from 'react';
import {Alert, Button, Flex} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
import {PostsAlertProps} from '@src/features/posts/ui/types';

function PostsAlert(props: PostsAlertProps) {
  return (
    <Flex justify="center" align="center" style={{ width: '100%', height: '100%' }}>
      <Alert
        message="Ошибка загрузки"
        description="Не удалось загрузить посты. Пожалуйста, попробуйте обновить страницу или повторите попытку позже."
        type="error"
        showIcon
        action={
          <Button icon={<ReloadOutlined />} onClick={props.refetch} size="small">
                        reload
          </Button>
        }
      />
    </Flex>
  );
}

export default memo(PostsAlert);