"use client";

import React, { ReactElement } from "react";
import { css } from "@emotion/react";

// 颜色常量
const colors = {
  lilyWhite: "#FCFBF0",
  lilyGreen: "#3B4021", // 这里使用 green4 作为主要绿色
  green1: "#181C10",
  green2: "#292E18",
  green3: "#545C37",
  green4: "#868F61",
  grey1: "#8F8D83",
  grey2: "#E0DED3",
  grey3: "#EDEBDF",
  grey4: "#F6F4E7",
  red1: "#521A1A",
  red2: "#662121",
  red3: "#8F2E2E",
  transparentRed: "rgba(143, 46, 46, 0.05)",
  transparentWhite: "rgba(252, 251, 240, 0.70)",
  transparent: "transparent",
};

export interface FullBtnProps {
  onClick?: () => void;
  loading?: boolean;
  disable?: boolean;
  text: ReactElement | string;
  className?: string;
  htmlType?: "submit" | "reset" | "button" | undefined;
  type?: "primary" | "default";
  size?: "small" | "middle" | "large";
  icon?: React.ReactNode;
  block?: boolean;
}

export default function FullBtn({
  onClick,
  loading = false,
  disable = false,
  text,
  className,
  htmlType = "button",
  type = "primary",
  size = "large",
  icon,
  block = true,
}: FullBtnProps) {
  const getIcon = () => {
    if (loading) {
      return (
        <div
          css={css({
            height: "18px",
            width: "18px",
            borderRadius: "50%",
            border: "2px solid",
            borderRightColor: "transparent",
            animation: "spin 1s linear infinite",
            "@keyframes spin": {
              from: {
                transform: "rotate(0deg)",
              },
              to: {
                transform: "rotate(360deg)",
              },
            },
          })}
        />
      );
    }
    return icon;
  };

  // 基础样式
  const baseStyles = css({
    display: "flex",
    minWidth: "200px",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "'fd', sans-serif",
    transition: "all 0.3s ease",
    border: "none",
    ...(block && { width: "100%" }),
    ...(loading && { pointerEvents: "none" }),
  });

  // 类型样式
  const getTypeStyles = () => {
    if (type === "primary") {
      return css({
        color: colors.lilyWhite,
        backgroundColor: disable ? colors.grey2 : colors.lilyGreen,
        ...(!disable && {
          "&:hover": {
            backgroundColor: colors.green2,
          },
        }),
      });
    } else {
      return css({
        border: `1px solid ${disable ? colors.grey2 : colors.lilyGreen}`,
        color: disable ? colors.grey2 : colors.lilyGreen,
        backgroundColor: "transparent",
        ...(!disable && {
          "&:hover": {
            borderColor: colors.green2,
            backgroundColor: colors.green2,
            color: colors.lilyWhite,
          },
        }),
      });
    }
  };

  // 尺寸样式
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return css({
          height: "36px",
          minWidth: "96px",
          padding: "0 16px",
          fontFamily: "'fm', sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
        });
      case "middle":
        return css({
          height: "48px",
          padding: "0 24px",
          fontSize: "12px",
          lineHeight: "16px",
          letterSpacing: "0.96px",
        });
      case "large":
      default:
        return css({
          height: "56px",
          padding: "0 32px",
          fontSize: "14px",
          lineHeight: "18px",
          letterSpacing: "1.12px",
        });
    }
  };

  return (
    <button
      disabled={disable}
      type={htmlType}
      onClick={() => {
        if (!loading) {
          onClick?.();
        }
      }}
      css={[baseStyles, getTypeStyles(), getSizeStyles()]}
      className={className}
    >
      <span>{text}</span>
      {getIcon()}
    </button>
  );
}
