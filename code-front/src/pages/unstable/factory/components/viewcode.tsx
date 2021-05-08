import React, { useState, useEffect } from 'react';
import { Card, Tabs, Form, Alert, Button } from 'antd';
import { EditForm, FormSearch } from '@/components';
import FormItem from '@/components/from/FormItem';
import FormModal from '@/components/from/FormModal';
import EditableTable from './editable';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import '../index.less';

interface ViewCodeProps {
  language?: string;
  codeString: string;
}

const ViewCode: React.FC<ViewCodeProps> = props => {
  const { language = 'javascript', codeString = '(num) => num + 1' } = props;
  return (
    <div>
      <SyntaxHighlighter language={language} style={docco}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default ViewCode;
