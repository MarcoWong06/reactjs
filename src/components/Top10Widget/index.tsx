import React, { useEffect } from "react";
import {
  WidgetContainer,
  Header,
  Title,
  LoadingContainer,
  LoadingSpinner,
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
import { Button } from "antd";
import type { Top10Item } from "../../hooks/Top10/types";

export interface Top10WidgetProps {
  data: Top10Item[];
  loading?: boolean;
  onButtonClick?: (item: Top10Item) => void;
  onItemSelect?: (item: Top10Item) => void;
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
  title = "Top 10",
  thousandSeparator = "",
  prefix = "",
  suffix = "",
  buttonText = "Action",
  buttonIcon,
  nameLabel,
  valueLabel,
}) => {
  useEffect(() => {
    console.log("Top10Widget mounted with data:", data);
  }, [data]);

  const formatAmount = (amount: number): string => {
    const isInteger = amount === Math.floor(amount);
    const formatted = isInteger ? amount.toString() : amount.toFixed(2);
    const parts = formatted.split(".");
    const integerPart = parts[0].replace(
      /\B(?=(\d{3})+(?!\d))/g,
      thousandSeparator
    );
    const decimalPart = parts[1];
    return decimalPart
      ? `${prefix}${integerPart}.${decimalPart}${suffix}`
      : `${prefix}${integerPart}${suffix}`;
  };

  const handleButtonClick = (item: Top10Item) => {
    if (onButtonClick) {
      onButtonClick(item);
    }
  };

  const handleItemSelect = (item: Top10Item) => {
    if (onItemSelect) {
      onItemSelect(item);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <Header>
          <Title>{title}</Title>
        </Header>
        <LoadingSpinner>Loading...</LoadingSpinner>
      </LoadingContainer>
    );
  }

  const topThree = data.slice(0, 3);
  const remaining = data.slice(3);
  const podiumOrder = [
    topThree[1], // 2nd place - left (or top on mobile)
    topThree[0], // 1st place - center (or middle on mobile)
    topThree[2], // 3rd place - right (or bottom on mobile)
  ].filter(Boolean); // Filter out undefined if less than 3 items

  const HandHeart = (props: any) => (
    <svg
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#000000"
        d="M20 17q.86 0 1.45.6t.58 1.4L14 22l-7-2v-9h1.95l7.27 2.69q.78.31.78 1.12q0 .47-.34.82t-.86.37H13l-1.75-.67l-.33.94L13 17zM16 3.23Q17.06 2 18.7 2q1.36 0 2.3 1t1 2.3q0 1.03-1 2.46t-1.97 2.39T16 13q-2.08-1.89-3.06-2.85t-1.97-2.39T10 5.3q0-1.36.97-2.3t2.34-1q1.6 0 2.69 1.23M.984 11H5v11H.984z"
      ></path>
    </svg>
  );

  return (
    <WidgetContainer>
      <Header>
        <Title>{title}</Title>
      </Header>

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
                  onClick={() => handleItemSelect(item)}
                >
                  <PodiumCard rank={item.rank}>
                    <PodiumAvatar>
                      <AvatarCircle rank={item.rank}>
                        <AvatarText rank={item.rank}>{item.rank}</AvatarText>
                      </AvatarCircle>
                    </PodiumAvatar>

                    <PodiumInfo>
                      {nameLabel && <PodiumLabel>{nameLabel}</PodiumLabel>}
                      <PodiumName rank={item.rank}>{item.name}</PodiumName>
                    </PodiumInfo>

                    <PodiumAmountSection>
                      <PodiumLabel>{valueLabel}</PodiumLabel>
                      <PodiumAmount rank={item.rank}>
                        {formatAmount(item.value)}
                      </PodiumAmount>
                    </PodiumAmountSection>

                    <PodiumButtonSection>
                      <Button
                        icon={
                          buttonIcon ? (
                            <span
                              dangerouslySetInnerHTML={{ __html: buttonIcon }}
                            />
                          ) : (
                            <HandHeart style={{ fontSize: "16px" }} />
                          )
                        }
                        onClick={() => handleButtonClick(item)}
                        loading={loading}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {buttonText}
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
              <ListItem key={item.id} onClick={() => handleItemSelect(item)}>
                <ItemRank>
                  <RankNumber>{item.rank}</RankNumber>
                </ItemRank>

                <ItemContent>
                  <ItemInfo>
                    <ItemLabel>{valueLabel}</ItemLabel>
                    <ItemAmount>{formatAmount(item.value)}</ItemAmount>
                  </ItemInfo>

                  <ItemDetails>
                    {nameLabel && <ItemLabel>{nameLabel}</ItemLabel>}
                    <ItemName>{item.name}</ItemName>
                  </ItemDetails>
                </ItemContent>

                <ItemAction>
                  <Button
                    icon={
                      buttonIcon ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: buttonIcon }}
                        />
                      ) : (
                        <HandHeart style={{ fontSize: "16px" }} />
                      )
                    }
                    onClick={() => handleButtonClick(item)}
                    loading={loading}
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    {buttonText}
                  </Button>
                </ItemAction>
              </ListItem>
            );
          })}
        </List>
      )}
    </WidgetContainer>
  );
};

export default Top10Widget;
