import React, { useEffect, useState } from "react";
import {
  WidgetContainer,
  Header,
  Title,
  PodiumContainer,
  Podium,
  PodiumItem,
  PodiumCard,
  PodiumAvatar,
  PodiumButtonSection,
  AvatarCircle,
  AvatarText,
  PodiumInfo,
  PodiumName,
  PodiumAmountSection,
  PodiumLabel,
  PodiumAmount,
  List,
  ListItem,
  ItemRank,
  RankNumber,
  ItemContent,
  ItemInfo,
  ItemLabel,
  ItemAmount,
  ItemDetails,
  ItemName,
  ItemAction,
} from "./styles";
import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import type { Top10Item, DataSourceMetaData } from "../../hooks/Top10/types";

export interface Top10WidgetProps {
  data: Top10Item[];
  loading?: boolean;
  onButtonClick?: (item: Top10Item) => void;
  onItemSelect?: (item: Top10Item) => void;
  metadata?: DataSourceMetaData;
  // Legacy props for backward compatibility
  title?: string;
  thousandSeparator?: string;
  prefix?: string;
  suffix?: string;
  buttonText?: string;
  buttonIcon?: string;
  nameLabel?: string;
  valueLabel?: string;
}

export const Top10Widget: React.FC<Top10WidgetProps> = ({
  data,
  loading = false,
  onButtonClick,
  onItemSelect,
  metadata,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const displayTitle = metadata?.chartTitle;
  const displayThousandSeparator = metadata?.thousandSeparator ?? "";
  const displayPrefix = metadata?.prefix ?? "";
  const displaySuffix = metadata?.suffix ?? "";
  const displayButtonText = metadata?.buttonText ?? "Action";
  const displayButtonIcon = metadata?.buttonIcon ?? "";
  const displayNameLabel = metadata?.nameLabel;
  const displayValueLabel = metadata?.valueLabel;

  useEffect(() => {
    console.log("Top10Widget mounted with data:", data);
  }, [data]);

  const formatAmount = (amount: number): string => {
    const isInteger = amount === Math.floor(amount);
    const formatted = isInteger ? amount.toString() : amount.toFixed(2);
    const parts = formatted.split(".");
    const integerPart = parts[0].replace(
      /\B(?=(\d{3})+(?!\d))/g,
      displayThousandSeparator
    );
    const decimalPart = parts[1];
    return decimalPart
      ? `${displayPrefix}${integerPart}.${decimalPart}${displaySuffix}`
      : `${displayPrefix}${integerPart}${displaySuffix}`;
  };

  const handleButtonClick = (item: Top10Item) => {
    if (onButtonClick) {
      onButtonClick(item);
    }
  };

  const handleItemSelect = (item: Top10Item) => {
    // Toggle selection: if already selected, deselect it
    setSelectedId((prevId) => (prevId === item.id ? null : item.id));
    if (onItemSelect) {
      onItemSelect(item);
    }
  };

  const topThree = data.slice(0, 3);
  const remaining = data.slice(3);
  const podiumOrder = [
    topThree[1], // 2nd place - left (or top on mobile)
    topThree[0], // 1st place - center (or middle on mobile)
    topThree[2], // 3rd place - right (or bottom on mobile)
  ].filter(Boolean); // Filter out undefined if less than 3 items

  return (
    <WidgetContainer>
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined spin />}
        tip="Loading..."
      >
        {displayTitle && (
          <Header>
            <Title metadata={metadata}>{displayTitle}</Title>
          </Header>
        )}
        {/* Podium for Top 3 */}
        {topThree.length > 0 && (
          <PodiumContainer>
            <Podium>
              {podiumOrder.map((item) => {
                if (!item) return null;

                return (
                  <PodiumItem
                    key={item.id}
                    rank={item.rank}
                    isSelected={selectedId === item.id}
                    onClick={() => handleItemSelect(item)}
                  >
                    <PodiumCard
                      rank={item.rank}
                      metadata={metadata}
                      isSelected={selectedId === item.id}
                    >
                      <PodiumAvatar>
                        <AvatarCircle rank={item.rank} metadata={metadata}>
                          <AvatarText rank={item.rank} metadata={metadata}>
                            {item.rank}
                          </AvatarText>
                        </AvatarCircle>
                      </PodiumAvatar>

                      <PodiumInfo>
                        {displayNameLabel && (
                          <PodiumLabel>{displayNameLabel}</PodiumLabel>
                        )}
                        <PodiumName rank={item.rank}>{item.name}</PodiumName>
                      </PodiumInfo>

                      <PodiumAmountSection>
                        <PodiumLabel>{displayValueLabel}</PodiumLabel>
                        <PodiumAmount rank={item.rank} metadata={metadata}>
                          {formatAmount(item.value)}
                        </PodiumAmount>
                      </PodiumAmountSection>

                      <PodiumButtonSection>
                        <Button
                          icon={
                            displayButtonIcon && (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: displayButtonIcon,
                                }}
                              />
                            )
                          }
                          onClick={() => handleButtonClick(item)}
                          loading={loading}
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {displayButtonText}
                        </Button>
                      </PodiumButtonSection>
                    </PodiumCard>
                  </PodiumItem>
                );
              })}
            </Podium>
          </PodiumContainer>
        )}

        {/* Regular list for positions 4-10 */}
        {remaining.length > 0 && (
          <List>
            {remaining.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  onClick={() => handleItemSelect(item)}
                  metadata={metadata}
                  isSelected={selectedId === item.id}
                >
                  <ItemRank>
                    <RankNumber metadata={metadata}>{item.rank}</RankNumber>
                  </ItemRank>

                  <ItemContent>
                    <ItemInfo>
                      <ItemLabel>{displayValueLabel}</ItemLabel>
                      <ItemAmount metadata={metadata}>
                        {formatAmount(item.value)}
                      </ItemAmount>
                    </ItemInfo>

                    <ItemDetails>
                      {displayNameLabel && (
                        <ItemLabel>{displayNameLabel}</ItemLabel>
                      )}
                      <ItemName>{item.name}</ItemName>
                    </ItemDetails>
                  </ItemContent>

                  <ItemAction>
                    <Button
                      icon={
                        displayButtonIcon && (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: displayButtonIcon,
                            }}
                          />
                        )
                      }
                      onClick={() => handleButtonClick(item)}
                      loading={loading}
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      {displayButtonText}
                    </Button>
                  </ItemAction>
                </ListItem>
              );
            })}
          </List>
        )}
      </Spin>
    </WidgetContainer>
  );
};

export default Top10Widget;
