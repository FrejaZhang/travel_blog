interface WaveDividerProps {
  topColor?: string;
  bottomColor?: string;
  flip?: boolean;
}

export default function WaveDivider({ topColor = '#FFF7F0', bottomColor = '#FFFFFF', flip = false }: WaveDividerProps) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} style={{ background: topColor }}>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}
