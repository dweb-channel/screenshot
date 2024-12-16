import React from 'react';

interface IPhoneFrameProps {
  width: number;
  height: number;
  text?: string;
  imageUrl?: string;
  imageStyle?: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
}

/**
 * iPhone 边框组件
 * @param width - 目标宽度
 * @param height - 目标高度
 * @param text - 显示的文本
 * @param imageUrl - 图片URL
 * @param imageStyle - 图片样式配置
 */
export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({
  width,
  height,
  imageUrl,
  imageStyle,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* iPhone 边框部分 */}
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: '45px',
          border: '12px solid black',
          overflow: 'hidden',
          boxShadow:
            '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        }}
      >
        {/* iPhone 顶部黑条 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            width: '40%',
            height: '30px',
            backgroundColor: 'black',
            left: '30%',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
          }}
        />

        {/* iPhone 听筒 */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '8px',
            backgroundColor: '#1a1a1a',
            borderRadius: '4px',
          }}
        />

        {/* 内容区域 */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            position: 'relative',
          }}
        >
          <div
            style={{
              flex: 1,
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              backgroundColor: 'white',
              borderRadius: '30px', // 添加圆角
            }}
          >
            {imageUrl && imageStyle && (
              <img
                src={imageUrl}
                style={{
                  position: 'absolute',
                  width: `${imageStyle.width}px`,
                  height: `${imageStyle.height}px`,
                  left: `${imageStyle.x}px`,
                  top: `${imageStyle.y}px`,
                  objectFit: 'cover',
                }}
                alt="preview"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
