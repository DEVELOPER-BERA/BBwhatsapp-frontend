// src/screens/main/ChatScreen.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/api';
import MessageBubble from '../../components/chat/MessageBubble';
import { colors } from '../../constants/colors';

const ChatScreen = ({ route }) => {
  const { userId } = route.params;
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [friend, setFriend] = useState(null);
  const flatListRef = useRef();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/messages/conversation/${userId}`);
        setMessages(response.data);
        
        // Mark messages as read
        const unreadMessages = response.data.filter(
          msg => msg.receiver._id === user.id && msg.status !== 'read'
        );
        
        if (unreadMessages.length > 0) {
          await Promise.all(
            unreadMessages.map(msg => 
              api.put(`/messages/${msg._id}/status`, { status: 'read' })
            )
          );
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    const fetchFriendInfo = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        setFriend(response.data);
      } catch (error) {
        console.error('Failed to fetch friend info:', error);
      }
    };

    fetchMessages();
    fetchFriendInfo();
  }, [userId]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const newMessage = {
        content: message,
        sender: user.id,
        receiver: userId,
        status: 'sent'
      };

      // Optimistic update
      setMessages(prev => [...prev, {
        ...newMessage,
        _id: Date.now().toString(),
        sender: { _id: user.id, username: user.username },
        receiver: friend,
        timestamp: new Date().toISOString()
      }]);

      setMessage('');

      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);

      // Send to server
      const response = await api.post(`/messages/${userId}`, { content: message });
      
      // Replace optimistic message with server response
      setMessages(prev => prev.map(msg => 
        msg._id === Date.now().toString() ? response.data : msg
      ));
    } catch (error) {
      console.error('Failed to send message:', error);
      // Remove optimistic message if failed
      setMessages(prev => prev.filter(msg => msg._id !== Date.now().toString()));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={80}
    >
      <View style={styles.messagesContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <MessageBubble 
              message={item} 
              isMe={item.sender._id === user.id} 
            />
          )}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.mediaButton}>
          <Ionicons name="image-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          multiline
        />
        
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={sendMessage}
          disabled={!message.trim()}
        >
          <Ionicons 
            name="send" 
            size={24} 
            color={message.trim() ? colors.primary : '#ccc'} 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginHorizontal: 10,
    fontSize: 16,
  },
  mediaButton: {
    padding: 8,
  },
  sendButton: {
    padding: 8,
  },
});

export default ChatScreen;
