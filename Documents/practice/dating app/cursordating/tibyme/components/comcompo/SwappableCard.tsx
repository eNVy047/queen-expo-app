'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

interface User {
  username: string;
  fullName: string;
  age: number;
  gender: string;
  lookingFor: string;
  interests: string[];
  bio: string;
  cardAvatar: string,
  location: {
    type: string;
    coordinates: number[];
  };
}

interface CardProps {
  user: User;
}

interface AppState {
  cards: User[];
  outOfCards: boolean;
  loading: boolean;
}

class Card extends React.Component<CardProps> {
  render() {
    const { user } = this.props;
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}>{user.fullName}, {user.age}</Text>
          <Text style={styles.gender}>{user.gender} looking for {user.lookingFor}</Text>
        </View>
        <Image 
  style={styles.thumbnail} 
  source={{ uri: user.cardAvatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} 
/>

        <View style={styles.footer}>
          {user.interests.length > 0 && (
            <Text style={styles.interests}>
              Interests: {user.interests.join(', ')}
            </Text>
          )}
          <Text style={styles.bio}>{user.bio}</Text>
        </View>
      </View>
    );
  }
}

class NoMoreCards extends React.Component {
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    );
  }
}

export default class SwappableCard extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cards: [],
      outOfCards: false,
      loading: true,
    };

    this.handleYup = this.handleYup.bind(this);
    this.handleNope = this.handleNope.bind(this);
    this.cardRemoved = this.cardRemoved.bind(this);
  }

  componentDidMount() {
    // Simulate API call with your JSON data
    const mockApiResponse = {
      statusCode: 200,
      data: {
        users: [
          {
            username: "Jd88s9",
            fullName: "Usus Hhxjdk",
            age: 30,
            gender: "female",
            lookingFor: "male",
            interests: [],
            bio: "Fui gandooo ladki",
            cardAvatar: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Image.png",
            location: {
              type: "Point",
              coordinates: [0, 0]
            }
          },
          {
            username: "Mejskskak",
            fullName: "Jsksidk Hsksusns",
            age: 30,
            gender: "female",
            lookingFor: "male",
            interests: ["Tea", "Kebab", "History"],
            cardAvatar: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Image.png",
            bio: "Hslzkzjzozhzjixhxjxm hx xhs dis dus sis did djd dud",
            location: {
              type: "Point",
              coordinates: [0, 0]
            }
          }
        ],
        type: "card"
      },
      message: "Random user cards fetched successfully.",
      success: true
    };

    setTimeout(() => {
      this.setState({
        cards: mockApiResponse.data.users,
        loading: false
      });
    }, 1000);
  }

  handleYup(user: User) {
    console.log(`Liked ${user.username}`);
    // Add your like logic here
  }

  handleNope(user: User) {
    console.log(`Disliked ${user.username}`);
    // Add your dislike logic here
  }

  cardRemoved(index: number) {
    console.log(`Card at index ${index} removed`);
    
    if (this.state.cards.length - index <= 2 && !this.state.outOfCards) {
      this.setState({ outOfCards: true });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text>Loading cards...</Text>
        </View>
      );
    }

    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false}
        renderCard={(user: User) => <Card user={user} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved}
      />
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: '70%',
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  gender: {
    fontSize: 14,
    color: '#666',
  },
  thumbnail: {
  width: '100%',
  height: '60%',
  resizeMode: 'cover',
  backgroundColor: 'lightgray', // test visibility
  borderWidth: 1,
  borderColor: 'black',
}
,
  footer: {
    padding: 15,
  },
  interests: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  bio: {
    fontSize: 14,
    color: '#666',
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});