import styled from "@emotion/styled";
import type { DataSourceMetaData } from "../../hooks/Top10/types";

// Main Container Components
export const WidgetContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 10px auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Helvetica", "Arial", sans-serif;
`;

export const Header = styled.div`
  margin-bottom: 30px;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0;
  text-align: center;
  border-bottom: 4px solid #07c1f2;
`;

export const LoadingContainer = styled(WidgetContainer)`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoadingSpinner = styled.div`
  font-size: 18px;
  color: #999;
  padding: 40px;
`;

// Podium Styles
export const PodiumContainer = styled.div`
  position: relative;
  margin-bottom: 60px;
  padding: 40px 20px;
`;

export const Podium = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 30px;
  position: relative;
  z-index: 1;

  @media (max-width: 968px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const PodiumItem = styled.div<{ rank: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: ${(props) => (props.rank === 1 ? "0" : "50px")};

  @media (max-width: 968px) {
    width: 100%;
    max-width: 400px;
    top: ${(props) => (props.rank === 1 ? "0" : "20px")};
    order: ${(props) => props.rank};
  }
`;

export const PodiumCard = styled.div<{
  rank: number;
  metadata?: DataSourceMetaData;
}>`
  border-radius: 24px;
  padding: 40px 24px 24px 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  position: relative;
  width: 280px;
  transition: all 0.3s ease;

  ${(props) => {
    const { rank, metadata } = props;

    // Get background color from metadata or use defaults
    let backgroundColor: string;
    if (rank === 1) {
      backgroundColor =
        metadata?.championBackgroundColor ||
        "linear-gradient(135deg, #fff4e6 0%, #ffe5cc 100%)";
    } else if (rank === 2) {
      backgroundColor =
        metadata?.runnerUpBackgroundColor ||
        "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)";
    } else if (rank === 3) {
      backgroundColor =
        metadata?.thirdPlaceBackgroundColor ||
        "linear-gradient(135deg, #f0ede8 0%, #e5dfd6 100%)";
    } else {
      backgroundColor =
        metadata?.otherBackgroundColor ||
        "linear-gradient(135deg, #fff9f0 0%, #fef5eb 100%)";
    }

    // Check if it's a gradient or solid color
    const isGradient = backgroundColor.includes("gradient");
    const backgroundStyle = isGradient
      ? `background: ${backgroundColor};`
      : `background-color: ${backgroundColor};`;

    return `
      ${backgroundStyle}
      ${
        rank === 1
          ? `
        transform: scale(1.1);
        
        @media (max-width: 968px) {
          transform: scale(1.1);
        }
      `
          : ""
      }
    `;
  }}

  &:hover {
    transform: ${(props) => (props.rank === 1 ? "scale(1.1)" : "scale(1)")}
      translateY(-8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.16);

    @media (max-width: 968px) {
      transform: ${(props) => (props.rank === 1 ? "scale(1.1)" : "scale(1)")}
        translateY(-8px);
    }
  }
`;

export const PodiumAvatar = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const AvatarCircle = styled.div<{
  rank: number;
  metadata?: DataSourceMetaData;
}>`
  width: ${(props) => (props.rank === 1 ? "125px" : "100px")};
  height: ${(props) => (props.rank === 1 ? "125px" : "100px")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.rank === 1 ? "48px" : "36px")};
  font-weight: ${(props) => (props.rank === 1 ? "700" : "600")};
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  ${(props) => {
    const { rank, metadata } = props;

    // Get colors from metadata or use defaults
    let textColor: string;
    let backgroundColor: string;
    let borderWidth: string;

    if (rank === 1) {
      textColor = metadata?.championIndexColor || "#ffffff";
      backgroundColor =
        metadata?.championIndexBackgroundColor ||
        "linear-gradient(135deg, #f9a825 0%, #f57c00 100%)";
      borderWidth = "6px";
    } else if (rank === 2) {
      textColor = metadata?.runnerUpIndexColor || "#ffffff";
      backgroundColor =
        metadata?.runnerUpIndexBackgroundColor ||
        "linear-gradient(135deg, #bdbdbd 0%, #9e9e9e 100%)";
      borderWidth = "4px";
    } else if (rank === 3) {
      textColor = metadata?.thirdPlaceIndexColor || "#ffffff";
      backgroundColor =
        metadata?.thirdPlaceIndexBackgroundColor ||
        "linear-gradient(135deg, #c9a882 0%, #b5966e 100%)";
      borderWidth = "4px";
    } else {
      textColor = metadata?.otherIndexColor || "#ffffff";
      backgroundColor =
        metadata?.otherIndexBackgroundColor ||
        "linear-gradient(135deg, #7fc4c4 0%, #69b3b3 100%)";
      borderWidth = "4px";
    }

    // Check if it's a gradient or solid color
    const isGradient = backgroundColor.includes("gradient");
    const backgroundStyle = isGradient
      ? `background: ${backgroundColor};`
      : `background-color: ${backgroundColor};`;

    return `
      color: ${textColor};
      ${backgroundStyle}
      border: ${borderWidth} solid #fff;
    `;
  }}
`;

export const AvatarText = styled.span<{
  rank: number;
  metadata?: DataSourceMetaData;
}>`
  font-size: ${(props) => (props.rank === 1 ? "48px" : "36px")};
  font-weight: ${(props) => (props.rank === 1 ? "700" : "600")};
  color: ${(props) => {
    const { rank, metadata } = props;
    if (rank === 1) return metadata?.championIndexColor || "#ffffff";
    if (rank === 2) return metadata?.runnerUpIndexColor || "#ffffff";
    if (rank === 3) return metadata?.thirdPlaceIndexColor || "#ffffff";
    return metadata?.otherIndexColor || "#ffffff";
  }};
`;

export const PodiumInfo = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

export const PodiumName = styled.div<{ rank: number }>`
  font-size: ${(props) => (props.rank === 1 ? "24px" : "20px")};
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
`;

export const PodiumAmountSection = styled.div`
  text-align: center;
  margin: 20px 0;
`;

export const PodiumLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

export const PodiumAmount = styled.div<{
  rank: number;
  metadata?: DataSourceMetaData;
}>`
  font-size: ${(props) => (props.rank === 1 ? "32px" : "26px")};
  font-weight: 700;
  color: ${(props) => {
    const { rank, metadata } = props;
    if (rank === 1) return metadata?.championValueColor || "#f57c00";
    if (rank === 2) return metadata?.runnerUpValueColor || "#333";
    if (rank === 3) return metadata?.thirdPlaceValueColor || "#333";
    return metadata?.otherValueColor || "#333";
  }};
  background-color: ${(props) => {
    const { rank, metadata } = props;
    if (rank === 1)
      return metadata?.championValueBackgroundColor ?? "transparent";
    if (rank === 2)
      return metadata?.runnerUpValueBackgroundColor ?? "transparent";
    if (rank === 3)
      return metadata?.thirdPlaceValueBackgroundColor ?? "transparent";
    return metadata?.otherValueBackgroundColor ?? "transparent";
  }};
  padding: ${(props) => {
    const { rank, metadata } = props;
    const hasBackground =
      (rank === 1 && metadata?.championValueBackgroundColor) ||
      (rank === 2 && metadata?.runnerUpValueBackgroundColor) ||
      (rank === 3 && metadata?.thirdPlaceValueBackgroundColor) ||
      (rank > 3 && metadata?.otherValueBackgroundColor);
    return hasBackground ? "8px 16px" : "0";
  }};
  border-radius: ${(props) => {
    const { rank, metadata } = props;
    const hasBackground =
      (rank === 1 && metadata?.championValueBackgroundColor) ||
      (rank === 2 && metadata?.runnerUpValueBackgroundColor) ||
      (rank === 3 && metadata?.thirdPlaceValueBackgroundColor) ||
      (rank > 3 && metadata?.otherValueBackgroundColor);
    return hasBackground ? "8px" : "0";
  }};
`;

export const PodiumButtonSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Regular List Styles (4-10)
export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
`;

export const ListItem = styled.div<{ metadata?: DataSourceMetaData }>`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  background: ${(props) => props.metadata?.otherBackgroundColor || "#abf8ff"};
  border-radius: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => {
      const bgColor = props.metadata?.otherBackgroundColor || "#abf8ff";
      // Slightly darken on hover
      return bgColor === "#abf8ff" ? "#82f0ff" : bgColor;
    }};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const ItemRank = styled.div`
  min-width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
`;

export const RankNumber = styled.span<{ metadata?: DataSourceMetaData }>`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.metadata?.otherIndexBackgroundColor || "#214083"};
  color: ${(props) => props.metadata?.otherIndexColor || "white"};
  border-radius: 50%;
  font-size: 20px;
  font-weight: 700;
`;

export const ItemContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: 968px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ItemLabel = styled.div`
  font-size: 15px;
  color: #666;
  white-space: nowrap;
`;

export const ItemAmount = styled.div<{ metadata?: DataSourceMetaData }>`
  font-size: 22px;
  font-weight: 700;
  color: ${(props) => props.metadata?.otherValueColor || "#333"};
  background: ${(props) =>
    props.metadata?.otherValueBackgroundColor || "#07c1f2"};
  padding: 8px 16px;
  border-radius: 8px;
  min-width: 160px;
  text-align: center;
`;

export const ItemDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ItemName = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: 600;
`;

export const ItemAction = styled.div`
  margin-left: auto;
`;
