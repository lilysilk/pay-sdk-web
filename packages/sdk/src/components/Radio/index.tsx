/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, ChangeEvent } from "react";
import useMemoizedFn from "@/hooks/useMemoizedFn";

interface RadioProps {
  /**
   * Radio按钮的值
   */
  value?: string;
  /**
   * 受控模式下的选中值
   */
  checked?: boolean;
  /**
   * 非受控模式下的默认选中状态
   */
  defaultChecked?: boolean;
  /**
   * 状态变化回调函数
   */
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Radio组的name属性（用于互斥选择）
   */
  name?: string;
  /**
   * 样式类名
   */
  className?: string;
}

const customRadioStyles = css({
  position: "relative",

  // 外圆环
  "&::before": {
    content: '""',
    display: "block",
    width: "20px",
    height: "20px",
    border: "1px solid #E0DED3",
    borderRadius: "50%",
    backgroundColor: "transparent",
    transition: "border-color 0.15s ease-out, box-shadow 0.1s ease-out",
  },

  // 内圆点（选中状态）
  "&::after": {
    content: '""',
    position: "absolute",
    top: "4px",
    left: "4px",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#545C37",
    transform: "scale(0)",
    transition: "transform 0.15s ease-out",
  },
});

// 按照最佳实践，在组件外部定义样式
const labelStyles = css({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  position: "relative",
  userSelect: "none",
  marginRight: "16px",

  // 鼠标悬停时的样式 - 直接选择span元素
  "&:hover > span::before": {
    borderColor: "#3b4021",
  },
});

const inputStyles = css({
  // 隐藏原生input但保持功能性
  opacity: 0.001,
  position: "absolute",
  zIndex: -1,
  width: "100%",
  height: "100%",
  margin: 0,

  // checked状态样式 - 使用相邻兄弟选择器
  "&:checked + span::before": {
    borderColor: "#3b4021",
  },

  "&:checked + span::after": {
    transform: "scale(1)",
  },
});

const Radio = ({
  value,
  checked,
  defaultChecked = false,
  onChange,
  name,
  className,
}: RadioProps) => {
  // 判断是否为受控模式
  const isControlled = checked !== undefined;

  // 非受控模式的内部状态
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  // 获取当前的checked状态
  const currentChecked = isControlled ? checked : internalChecked;

  const handleChange = useMemoizedFn((event: ChangeEvent<HTMLInputElement>) => {
    // 非受控模式下更新内部状态
    if (!isControlled) {
      setInternalChecked(true);
    }

    // 调用外部的onChange回调
    onChange?.(event.target.value, event);
  });

  return (
    <label css={labelStyles} className={className}>
      <input
        type="radio"
        value={value}
        name={name}
        checked={currentChecked}
        onChange={handleChange}
        css={inputStyles}
      />
      <span css={customRadioStyles} />
    </label>
  );
};

export default Radio;
