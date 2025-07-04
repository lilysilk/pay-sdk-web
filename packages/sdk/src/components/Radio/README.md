# Radio Component

重构后的 Radio 组件，按照 Emotion 最佳实践实现，支持受控和非受控两种模式。

## 特性

- ✅ **Emotion 最佳实践**: CSS 对象语法，样式定义在组件外部
- ✅ **自定义样式**: 隐藏原生 input，使用伪元素实现圆形设计
- ✅ **受控/非受控模式**: 灵活的状态管理
- ✅ **事件优化**: 使用 useMemoizedFn 优化性能
- ✅ **无障碍支持**: 保持原生键盘导航和 focus 状态
- ✅ **TypeScript**: 完整的类型定义

## API

### Props

| 属性             | 类型                                                            | 必需 | 默认值      | 说明                                 |
| ---------------- | --------------------------------------------------------------- | ---- | ----------- | ------------------------------------ |
| `label`          | `string`                                                        | ❌   | `""`        | Radio 按钮标签文本                   |
| `value`          | `string`                                                        | ✅   | -           | Radio 按钮的值                       |
| `name`           | `string`                                                        | ✅   | -           | Radio 组的 name 属性（用于互斥选择） |
| `checked`        | `boolean`                                                       | ❌   | `undefined` | 受控模式下的选中状态                 |
| `defaultChecked` | `boolean`                                                       | ❌   | `false`     | 非受控模式下的默认选中状态           |
| `onChange`       | `(value: string, event: ChangeEvent<HTMLInputElement>) => void` | ❌   | `undefined` | 状态变化回调函数                     |
| `className`      | `string`                                                        | ❌   | `undefined` | 自定义 className                     |

## 使用示例

### 基础用法（非受控模式）

```tsx
import Radio from "./Radio";

function BasicExample() {
  const handleChange = (value: string) => {
    console.log("Selected:", value);
  };

  return (
    <div>
      <Radio
        name="payment"
        value="credit"
        label="信用卡支付"
        defaultChecked
        onChange={handleChange}
      />
      <Radio
        name="payment"
        value="alipay"
        label="支付宝"
        onChange={handleChange}
      />
      <Radio
        name="payment"
        value="wechat"
        label="微信支付"
        onChange={handleChange}
      />
    </div>
  );
}
```

### 受控模式（推荐用于表单管理）

```tsx
import { useState } from "react";
import Radio from "./Radio";

function ControlledExample() {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [shippingMethod, setShippingMethod] = useState("standard");

  return (
    <div>
      <fieldset>
        <legend>支付方式</legend>
        <Radio
          name="payment"
          value="credit"
          label="信用卡支付"
          checked={paymentMethod === "credit"}
          onChange={(value) => setPaymentMethod(value)}
        />
        <Radio
          name="payment"
          value="alipay"
          label="支付宝"
          checked={paymentMethod === "alipay"}
          onChange={(value) => setPaymentMethod(value)}
        />
        <Radio
          name="payment"
          value="wechat"
          label="微信支付"
          checked={paymentMethod === "wechat"}
          onChange={(value) => setPaymentMethod(value)}
        />
      </fieldset>

      <fieldset>
        <legend>配送方式</legend>
        <Radio
          name="shipping"
          value="standard"
          label="标准配送"
          checked={shippingMethod === "standard"}
          onChange={(value) => setShippingMethod(value)}
        />
        <Radio
          name="shipping"
          value="express"
          label="快速配送"
          checked={shippingMethod === "express"}
          onChange={(value) => setShippingMethod(value)}
        />
      </fieldset>
    </div>
  );
}
```

### RadioGroup 组件示例

```tsx
import { useState } from "react";
import Radio from "./Radio";

interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
}

function RadioGroup({
  name,
  value,
  defaultValue,
  onChange,
  children,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div role="radiogroup">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Radio) {
          return React.cloneElement(child, {
            name,
            checked: currentValue === child.props.value,
            onChange: handleChange,
          });
        }
        return child;
      })}
    </div>
  );
}

// 使用RadioGroup
function RadioGroupExample() {
  const [selectedPayment, setSelectedPayment] = useState("credit");

  return (
    <RadioGroup
      name="payment"
      value={selectedPayment}
      onChange={setSelectedPayment}
    >
      <Radio value="credit" label="信用卡支付" />
      <Radio value="alipay" label="支付宝" />
      <Radio value="wechat" label="微信支付" />
    </RadioGroup>
  );
}
```

## 样式自定义

组件使用 Emotion CSS-in-JS，可以通过 className 自定义样式：

```tsx
import { css } from "@emotion/react";
import Radio from "./Radio";

const customRadioStyles = css({
  marginBottom: "12px",

  // 自定义外圆环颜色
  "& .radio-custom::before": {
    borderColor: "#e91e63",
  },

  // 自定义选中状态颜色
  "&:focus .radio-custom::before, & .radio-custom::after": {
    borderColor: "#e91e63",
    backgroundColor: "#e91e63",
  },
});

<Radio
  name="custom"
  value="option1"
  label="自定义样式"
  className={customRadioStyles}
/>;
```

## 设计思路

### 1. 隐藏原生 input

```css
input[type="radio"] {
  opacity: 0; /* 隐藏但保持功能 */
  position: absolute; /* 不占用空间 */
  z-index: -1; /* 置于最底层 */
}
```

### 2. 自定义圆形外观

```css
.radio-custom::before {
  /* 外圆环 */
  border: 2px solid #b9c4c9;
  border-radius: 50%;
  width: 16px;
  height: 16px;
}

.radio-custom::after {
  /* 内圆点 */
  border-radius: 50%;
  transform: scale(0); /* 默认隐藏 */
  transition: transform 0.15s;
}
```

### 3. 状态响应

```css
input:checked + .radio-custom::after {
  transform: scale(1); /* 选中时显示 */
}

input:focus + .radio-custom::before {
  border-color: #0075ff;
  box-shadow: 0 0 0 2px rgba(0, 117, 255, 0.2);
}
```

## 从 Checkbox 迁移

如果你之前使用的是 Checkbox 组件，迁移到 Radio 很简单：

```tsx
// 之前的Checkbox用法
<Checkbox
  label="选项"
  checked={isChecked}
  onChange={(checked) => setIsChecked(checked)}
/>

// 新的Radio用法
<Radio
  name="options"
  value="option1"
  label="选项"
  checked={selectedValue === 'option1'}
  onChange={(value) => setSelectedValue(value)}
/>
```

主要差异：

1. **type**: `checkbox` → `radio`
2. **互斥**: Radio 需要`name`属性实现组内互斥
3. **值**: Radio 使用`value`而不是 boolean
4. **onChange**: 传递`value`而不是`checked`状态
5. **外观**: 圆形而不是方形，圆点而不是勾选
