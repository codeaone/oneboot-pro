import React, { useEffect, useState } from 'react';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { isBrowser } from '@ant-design/pro-utils';

const FullScreenIcon = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  useEffect(() => {
    if (!isBrowser()) {
      return;
    }
    document.onfullscreenchange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
  }, []);
  return fullscreen ? (
    <Tooltip title="全屏">
      <FullscreenExitOutlined />
    </Tooltip>
  ) : (
    <Tooltip title="全屏">
      <FullscreenOutlined />
    </Tooltip>
  );
};

export default FullScreenIcon;
