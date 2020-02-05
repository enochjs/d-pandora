```javascript
@start
@name extendTab
@prefix extendTab
@content
<Tab tabs={tabs} defaultActiveKey="basic" id={${value}} />
@end

@start
@name extendTab-tabs
@prefix extendTab-tabs
@content
const tabs = [
  { key: 'basic', label: '基本信息', hide: false },
  { key: 'order', label: '订单', hide: false },
  { key: 'workorder', label: '工单', hide: false },
  { key: 'account', label: '账户', hide: false },
  { key: 'violation', label: '违规事件', hide: false },
  { key: 'workRecord', label: '工作记录', hide: false },
  {
    key: 'more',
    label: '更多',
    children: [
      { key: 'grade', label: '等级信息', hide: false },
      { key: 'evaluate', label: '用户评价', hide: false },
      { key: 'store', label: '商城记录', hide: false },
      { key: 'inshop', label: '驻店记录', hide: false },
      { key: 'message', label: '消息记录', hide: false },
    ],
  },
]
@end

```