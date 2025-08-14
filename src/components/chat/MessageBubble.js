// src/components/chat/MessageBubble.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

const MessageBubble = ({ message, isMe }) => {
  return (
    <View style={[
      styles.messageContainer,
      isMe ? styles.myMessage : styles.theirMessage
    ]}>
      <View style={[
        styles.messageBubble,
        isMe ? styles.myBubble : styles.theirBubble
      ]}>
        {message.content ? (
          <Text style={isMe ? styles.myText : styles.theirText}>
            {message.content}
          </Text>
        ) : null}
        
        <View style={styles.timeContainer}>
          <Text style={[
            styles.timeText,
            isMe ? styles.myTimeText : styles.theirTimeText
          ]}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          {isMe && (
            <Ionicons 
              name={message.status === 'read' ? 'checkmark-done' : 'checkmark'} 
              size={14} 
              color={message.status === 'read' ? colors.primary : '#999'} 
              style={styles.statusIcon} 
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  myMessage: {
    justifyContent: 'flex-end',
  },
  theirMessage: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
  },
  myBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 2,
  },
  theirBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 2,
  },
  myText: {
    color: '#fff',
    fontSize: 16,
  },
  theirText: {
    color: '#000',
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 5,
  },
  timeText: {
    fontSize: 12,
  },
  myTimeText: {
    color: '#e5e5e5',
  },
  theirTimeText: {
    color: '#666',
  },
  statusIcon: {
    marginLeft: 5,
  },
});

export default MessageBubble;
