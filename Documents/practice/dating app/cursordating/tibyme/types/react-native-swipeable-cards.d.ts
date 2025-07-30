declare module 'react-native-swipeable-cards' {
  import { Component, Ref } from 'react';
  import { StyleProp, ViewStyle } from 'react-native';

  export interface SwipeCardsProps<T> {
    cards: T[];
    renderCard: (cardData: T) => React.ReactNode;
    renderNoMoreCards: () => React.ReactNode;
    showRightOverlay?: boolean;
    showLeftOverlay?: boolean;
    stackDepth?: number;
    stack?: boolean;
    loop?: boolean;
    keyExtractor?: (cardData: T) => string;
    onSwipeRight?: (cardData: T) => void;
    onSwipeLeft?: (cardData: T) => void;
    cardRemoved?: (index: number) => void;
    containerStyle?: StyleProp<ViewStyle>;
    swipeRightThreshold?: number;
    swipeLeftThreshold?: number;
    ref?: Ref<SwipeCards<T>>;
  }

  export default class SwipeCards<T> extends Component<SwipeCardsProps<T>> {
    _forceNextCard: () => void;
    _goBack: () => void;
  }
}