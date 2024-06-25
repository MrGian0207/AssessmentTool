import ReactSpeedometer from "react-d3-speedometer";
import { CustomSegmentLabelPosition } from "react-d3-speedometer";
import { Transition } from "react-d3-speedometer";
import { Typography } from "@mui/joy";

interface CustomGaugeChartType {
  score: number;
}

const CustomGaugeChart = ({score} : CustomGaugeChartType) => {
  const currentValue: number = score; // Giá trị hiện tại của kim chỉ
  const segments: number = 5; // Số lượng phân đoạn
  const maxValue: number = 10; // Giá trị lớn nhất

  // Tính toán màu sắc của các phân đoạn dựa trên giá trị hiện tại
  const segmentColors = Array(segments).fill("rgba(255, 255, 255, 0.8)"); // Màu nâu cho tất cả phân đoạn
  const activeSegmentIndex = Math.floor((currentValue / maxValue) * segments);
  for (let i = 0; i <= activeSegmentIndex; i++) {
    segmentColors[i] = "#ffbf00"; // Màu vàng cho các phân đoạn mà kim chỉ vào
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "fit-content",
        position: "relative",
      }}
    >
      <ReactSpeedometer
        textColor="#ffffff"
        value={currentValue} // Giá trị hiện tại của kim chỉ
        minValue={0} // Giá trị nhỏ nhất
        maxValue={maxValue} // Giá trị lớn nhất
        segments={segments} // Số lượng phân đoạn
        needleColor="#ffbf00" // Màu của kim chỉ
        needleHeightRatio={0.5} // Chiều cao của kim chỉ
        segmentColors={segmentColors} // Màu sắc của các phân đoạn
        customSegmentLabels={[
          {
            text: "Sơ khai",
            position: "OUTSIDE" as CustomSegmentLabelPosition,
            color: "rgba(255,255,255,0.9)",
            fontSize: "12px",
          },
          {
            text: "Thành lập",
            position: "OUTSIDE" as CustomSegmentLabelPosition,
            color: "rgba(255,255,255,0.9)",
            fontSize: "12px",
          },
          {
            text: "Vận hành",
            position: "OUTSIDE" as CustomSegmentLabelPosition,
            color: "rgba(255,255,255,0.9)",
            fontSize: "12px",
          },
          {
            text: "Tối ưu",
            position: "OUTSIDE" as CustomSegmentLabelPosition,
            color: "rgba(255,255,255,0.9)",
            fontSize: "12px",
          },
          {
            text: "Thấm nhuần",
            position: "OUTSIDE" as CustomSegmentLabelPosition,
            color: "rgba(255,255,255,0.9)",
            fontSize: "12px",
          },
        ]}
        ringWidth={15} // Độ rộng của vòng bên ngoài
        width={300} // Chiều rộng của biểu đồ
        height={220} // Chiều cao của biểu đồ
        valueTextFontSize={"30px"}
        paddingVertical={10}
        needleTransition={Transition.easeElastic}
        needleTransitionDuration={2000} // Thời gian chuyển động của kim
        customSegmentStops={[0, 2, 4, 6, 8, 10]} // Điểm dừng tùy chỉnh cho các phân đoạn
      />
      <Typography
        level="body-md"
        sx={{
          position: "absolute",
          bottom: "20px",
          right: "0",
          left: "0",
          color: "common.white",
          textAlign: "center",
          opacity: "0.9",
        }}
      >
        Score
      </Typography>
    </div>
  );
};

export default CustomGaugeChart;
