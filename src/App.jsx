import { useState, useEffect } from 'react'

import { Card, Button, Flex, Drawer, TimePicker, Typography, Row, Col, Divider, InputNumber, Radio, Space, Input, DatePicker, Switch } from 'antd'
import dayjs from 'dayjs'

import "./App.css";

const { Text } = Typography

function App({ dark, setDark }) {

  const [open, setOpen] = useState(false);

  const [time, setTime] = useState(dayjs().hour(15).minute(50).second(0))
  const [title1, setTitle1] = useState("距离放学还有")
  const [content, setContent] = useState()
  const [title2, setTitle2] = useState("秒")
  const [displayType, setDisplayType] = useState(1)
  const [digit, setDigit] = useState(1)
  const [font1Size, setFont1Size] = useState(48);
  const [font2Size, setFont2Size] = useState(128);
  const [font3Size, setFont3Size] = useState(48);
  const [refreshFreq, setRefreshFreq] = useState(30);
  const [offset, setOffset] = useState(108);
  const [displayMethod, setDisplayMethod] = useState(0);
  const [displayMS, setDisplayMS] = useState(true);
  const [displayTitle2, setDisplayTitle2] = useState(false);


  function openDrawer(){
    setOpen(true)
  }
  function closeDrawer(){
    setOpen(false)
  }
  function handleTimeChange(value) {
    setTime(value)
  }

  function formatMilliseconds(ms) { // AI generated function 
    const units = [
      { name: '世纪', ms: 36500 * 86400000 },
      { name: '年', ms: 365 * 86400000 },
      { name: '月', ms: 30 * 86400000 },
      { name: '日', ms: 86400000 },
      { name: '小时', ms: 3600000 },
      { name: '分钟', ms: 60000 },
      { name: '秒', ms: 1000 },
      { name: '毫秒', ms: 1 }
    ];

    if (ms === 0) return '';

    let remaining = Math.abs(ms);

    const parts = [];

    if (ms < 0) {
      parts.push("-")
    }

    for (const unit of units) {

      if (unit.name === '毫秒' && displayMS === false) {
        continue
      }

      const count = Math.floor(remaining / unit.ms);
      if (count > 0) {
        let formattedCount;
        if (unit.name === '秒') {
          formattedCount = count.toString().padStart(2, '0');
        } else if (unit.name === '毫秒') {
          formattedCount = count.toString().padStart(3, '0');
        } else {
          formattedCount = count.toString();
        }
        parts.push(formattedCount + " " + unit.name);
        remaining %= unit.ms;
      }
    }

    const result = parts.join(' ');
    
    return result;
  }

  function TypeDisplay(type, delta) {
    if (type === 0){
      return (delta / 1).toFixed(digit)
    }
    if (type === 1){
      return (delta / 1000).toFixed(digit)
    }
    if (type === 2){
      return (delta / 1000 / 60).toFixed(digit)
    }
    if (type === 3){
      return (delta / 1000 / 60 / 60).toFixed(digit)
    }
    if (type === 4){
      const factor = 1000 * 60 * 60 * 24
      return (delta / factor).toFixed(digit)
    }
    if (type === 5){
      const factor = 1000 * 60 * 60 * 24 * 7
      return (delta / factor).toFixed(digit)
    }
    if (type === 6){
      const factor = 1000 * 60 * 60 * 24 * 30
      return (delta / factor).toFixed(digit)
    }
    if (type === 7){
      const factor = 1000 * 60 * 60 * 24 * 90
      return (delta / factor).toFixed(digit)
    }
    if (type === 8){
      const factor = 1000 * 60 * 60 * 24 * 365
      return (delta / factor).toFixed(digit)
    }
    if (type === 9){
      const factor = 1000 * 60 * 60 * 24 * 365 * 100
      return (delta / factor).toFixed(digit)
    }
    if (type === 10){
      return formatMilliseconds(delta)
    }
  }

  function mainCountdown(){
    const interval = setInterval(() => {

      const now = dayjs();
      const target = time;
      const delta = target.diff(now, "millisecond")

      
      const r = TypeDisplay(displayType, delta)
      setContent(r)
    }, (1000 / refreshFreq))


    return () => clearInterval(interval)
  }
  useEffect(mainCountdown, [time, displayType, digit, refreshFreq, displayMS])

  return (
    <>
      <Drawer title="设置" onClose={closeDrawer} open={open} size={"large"}>

        <Divider>时间设置</Divider>

        <Row align="middle" gutter={[16, 8]}>
          <Col span={12}>
            <Text>目标时间</Text>
          </Col>  
          <Col span={12}>
            <DatePicker showTime value={time} onChange={(value) => {setTime(value)}}></DatePicker>
          </Col>
        </Row>
        
        <Divider>文本设置</Divider>

        <Row align="middle" gutter={[16, 8]}>
          <Col span={12}>
            <Text>标题 1</Text>
          </Col>
          <Col span={12}>
            <Input value={title1} onChange={(value) => (setTitle1(value.target.value))}></Input>
          </Col>

          <Col span={12}>
            <Text>标题 2</Text>
          </Col>
          <Col span={12}>
            <Input value={title2} onChange={(value) => (setTitle2(value.target.value))}></Input>
          </Col>
        </Row>

        <Divider>字体设置</Divider>

        <Row align="middle" gutter={[16, 8]}>
          <Col span={12}>
            <Text>标题 1</Text>
          </Col>
          <Col span={12}>
            <InputNumber min={1} max={768} step={2} value={font1Size} onChange={(value) => {setFont1Size(value)}} changeOnWheel></InputNumber>
          </Col>

          <Col span={12}>
            <Text>时间</Text>
          </Col>
          <Col span={12}>
            <InputNumber min={1} max={768} step={2} value={font2Size} onChange={(value) => {setFont2Size(value)}} changeOnWheel></InputNumber>
          </Col>

          <Col span={12}>
            <Text>标题 2</Text>
          </Col>
          <Col span={12}>
            <InputNumber min={1} max={768} step={2} value={font3Size} onChange={(value) => {setFont3Size(value)}} changeOnWheel></InputNumber>
          </Col>
        </Row>

        <Divider>数值设置</Divider>

        <Row align="middle" gutter={[16, 8]}>
          <Col span={12}>
            <Text>显示单位</Text>
          </Col>
          <Col span={12}>
            <Radio.Group value={displayType} onChange={(value) => {setDisplayType(value.target.value)}}>
              <Radio.Button value={10}>自动</Radio.Button>
              <Radio.Button value={0}>毫秒</Radio.Button>
              <Radio.Button value={1}>秒</Radio.Button>
              <Radio.Button value={2}>分</Radio.Button>
              <Radio.Button value={3}>时</Radio.Button>
              <Radio.Button value={4}>天</Radio.Button>
              <Radio.Button value={5}>周</Radio.Button>
              <Radio.Button value={6}>月</Radio.Button>
              <Radio.Button value={7}>季</Radio.Button>
              <Radio.Button value={8}>年</Radio.Button>
              <Radio.Button value={9}>世纪</Radio.Button>
            </Radio.Group>
          </Col>

          {(() => {
            if (displayType === 10) {
              return (
                <>
                  <Col span={12}>
                    <Text>显示毫秒</Text>
                  </Col>
                  <Col span={12}>
                    <Switch checkedChildren="I" unCheckedChildren="O" value={displayMS} onChange={(value) => {setDisplayMS(value)}}></Switch>
                  </Col>
                  <Col span={12}>
                    <Text>显示标题 2</Text>
                  </Col>
                  <Col span={12}>
                    <Switch checkedChildren="I" unCheckedChildren="O" value={displayTitle2} onChange={(value) => {setDisplayTitle2(value)}}></Switch>
                  </Col>
                </>
              )
            }
          })()}

          <Col span={12}>
            <Text>小数位数</Text>
          </Col>
          <Col span={12}>
            <InputNumber min={0} max={12} value={digit} onChange={(value) => {setDigit(value)}} changeOnWheel></InputNumber>
          </Col>
        </Row>

        <Divider>显示设置</Divider>

        <Row align="middle" gutter={[16, 8]}>

          <Col span={12}>
            <Text>切换主题</Text>
          </Col>
          <Col span={12}>
            <Button onClick={() => (setDark(!dark))}>{dark ? <Text>暗色主题</Text> : <Text>浅色模式</Text>}</Button>
          </Col>

          
          <Col span={12}>
            <Text>刷新频率</Text>
          </Col>
          <Col span={12}>
            <Space>
              <InputNumber min={0} max={64} defaultValue={30} onChange={(value) => {setRefreshFreq(value)}} changeOnWheel></InputNumber>
              <Text>Hz</Text>
            </Space>
          </Col>

          <Col span={12}>
            <Text>显示方式</Text>
          </Col>
          <Col span={12}>
            <Radio.Group value={displayMethod} onChange={(value) => {setDisplayMethod(value.target.value)}}>
              <Radio.Button value={0}>两端</Radio.Button>
              <Radio.Button value={1}>平均</Radio.Button>
              <Radio.Button value={2}>居中</Radio.Button>
              <Radio.Button value={3}>合并</Radio.Button>
            </Radio.Group>
          </Col>

          <Col span={12}>
            offset
          </Col>
          <Col span={12}>
            <InputNumber min={-1024} max={1024} value={offset} onChange={(value) => {setOffset(value)}} changeOnWheel></InputNumber>
          </Col>
        </Row>

      </Drawer>

      <Card title={
        <>
          <Flex align='center' justify='space-between'>
            <Space>
              下课放学倒计时
              <Text type="secondary">v2</Text>
            </Space>
            <Space>
              <Button onClick={openDrawer}>设置</Button>
            </Space>
          </Flex>
        </>
      } style={{height: "100vh", width: "100vw", borderRadius: 0}}
      >
        <div style={{height: `calc(100vh - ${offset}px)`}}>

          {(() => {
            if (displayMethod === 0){
              return (
                <Flex vertical justify='space-between' align='center' style={{height: "100%"}}>
                  <Text type="secondary" style={{fontSize: font1Size}}>{title1}</Text>
                  <Text strong style={{fontSize: font2Size}}>{content}</Text>
                  {displayTitle2 ? <></> : <Text type="secondary" style={{fontSize: font3Size}}>{title2}</Text>}
                </Flex>
              )
            } 
            if (displayMethod === 1) {
              return (
                <Flex vertical justify='space-evenly' align='center' style={{height: "100%"}}>
                  <Text type="secondary" style={{fontSize: font1Size}}>{title1}</Text>
                  <Text strong style={{fontSize: font2Size}}>{content}</Text>
                  {displayTitle2 ? <></> : <Text type="secondary" style={{fontSize: font3Size}}>{title2}</Text>}
                </Flex>
              )
            }
            if (displayMethod === 2) {
              return (
                <Flex vertical justify='center' align='center' style={{height: "100%"}}>
                  <Text type="secondary" style={{fontSize: font1Size}}>{title1}</Text>
                  <Text strong style={{fontSize: font2Size}}>{content}</Text>
                  {displayTitle2 ? <></> : <Text type="secondary" style={{fontSize: font3Size}}>{title2}</Text>}
                </Flex>
              )
            }
            if (displayMethod === 3) {
              return (
                <Flex vertical justify='center' align='center' style={{height: "100%"}}>
                  <Text type="secondary" style={{fontSize: font1Size}}>{title1}</Text>
                  <Space>
                    <Text strong style={{fontSize: font2Size}}>{content}</Text>
                    <Text style={{fontSize: font3Size}}>{title2}</Text>
                  </Space>
                </Flex>
              )
            }
          })()}


        </div>
      </Card>
    </>
  )
}

export default App
