import React from 'react';
import { Table } from 'antd';
import { useAntdResizableHeader } from '@minko-fe/use-antd-resizable-header';
import '@minko-fe/use-antd-resizable-header/dist/style.css';
import ReactDragListView from 'react-drag-listview';

import './App.css';

const initColumns: any[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left',
    filters: [
      {
        text: 'Joe',
        value: 'Joe'
      },
      {
        text: 'John',
        value: 'John'
      }
    ],
    onFilter: (value, record) => record.name.indexOf(value) === 0
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 150,
        sorter: (a, b) => a.age - b.age
      },
      {
        title: 'Address',
        children: [
          {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            width: 150
          },
          {
            title: 'Block',
            children: [
              {
                title: 'Building',
                dataIndex: 'building',
                key: 'building',
                width: 100
              },
              {
                title: 'Door No.',
                dataIndex: 'number',
                key: 'number',
                width: 100
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Company',
    children: [
      {
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        width: 200
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName'
      }
    ]
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: 80,
    fixed: 'right'
  }
];

const data: any[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M'
  });
}

export default function App() {
  const [columns, setColumns] = React.useState<any[]>(initColumns);
  const { components, resizableColumns, tableWidth } = useAntdResizableHeader({
    columns
  });
  const dragProps = {
    onDragEnd(fromIndex: number, toIndex: number) {
      const newCols = [...columns];
      const item = newCols.splice(fromIndex, 1)[0];
      newCols.splice(toIndex, 0, item);
      setColumns(newCols);
    },
    nodeSelector: 'th'
  };
  return (
    <div>
      <h1>Hello!</h1>
      <ReactDragListView.DragColumn {...dragProps}>
        <Table
          columns={resizableColumns}
          components={components}
          dataSource={data}
          scroll={{ x: tableWidth }}
        />
      </ReactDragListView.DragColumn>
    </div>
  );
}
